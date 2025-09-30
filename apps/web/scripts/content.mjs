import { promises as fs } from "fs";
import { DocsRouting } from "./settings/DocsRouting.mjs";
import grayMatter from "gray-matter";
import path from "path";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
const docsRoots = [
    path.join(process.cwd(), "apps", "web", "contents", "en", "docs"),
    path.join(process.cwd(), "apps", "web", "contents", "ar", "docs"),
    path.join(process.cwd(), "apps", "web", "contents", "docs"),
];
const outputDir = path.join(process.cwd(), "apps/web", "public", "search-data");
const markdownOutDir = path.join(outputDir, "markdown");
function isMdxJsxFlowElement(node) {
    return node.type === "mdxJsxFlowElement" && "name" in node;
}
function isRoute(node) {
    return "href" in node && "title" in node;
}
function findDocsRootFor(filePath) {
    const normalized = path.normalize(filePath);
    for (const root of docsRoots) {
        if (normalized.startsWith(path.normalize(root + path.sep))) return root;
    }
    return path.dirname(path.dirname(normalized));
}

function createSlug(filePath) {
    const base = findDocsRootFor(filePath);
    const relativePath = path.relative(base, filePath);
    const parsed = path.parse(relativePath);
    let slugPath = parsed.dir ? `${parsed.dir}/${parsed.name}` : parsed.name;
    slugPath = slugPath.replace(/\\/g, "/");
    const dirParts = parsed.dir.split(path.sep).map(p => p.toLowerCase());
    if (dirParts.length > 0 && dirParts[dirParts.length - 1] === parsed.name.toLowerCase()) {
        slugPath = parsed.dir.replace(/\\/g, "/");
    }
    return parsed.name === "index" ? `/${parsed.dir.replace(/\\/g, "/")}` || "/" : `/${slugPath}`;
}

function findDocumentBySlug(slug) {
    function searchDocs(docs, currentPath = "") {
        for (const doc of docs) {
            if (isRoute(doc)) {
                const fullPath = currentPath + doc.href;
                if (fullPath === slug)
                    return doc;
                if (doc.items) {
                    const found = searchDocs(doc.items, fullPath);
                    if (found)
                        return found;
                }
            }
        }
        return null;
    }
    return searchDocs(DocsRouting);
}
async function ensureDirectoryExists(dir) {
    try {
        await fs.access(dir);
    }
    catch {
        await fs.mkdir(dir, { recursive: true });
    }
}
function removeCustomComponents() {
    const customComponentNames = [
        "Tabs",
        "TabsList",
        "TabsTrigger",
        "pre",
        "Mermaid",
    ];
    return (tree) => {
        visit(tree, "mdxJsxFlowElement", (node, index, parent) => {
            if (isMdxJsxFlowElement(node) &&
                parent &&
                Array.isArray(parent.children) &&
                customComponentNames.includes(node.name)) {
                parent.children.splice(index, 1);
            }
        });
    };
}
async function processMdxFile(filePath) {
    const rawMdx = await fs.readFile(filePath, "utf-8");
    const { content, data: frontmatter } = grayMatter(rawMdx);
    const plainContent = await unified()
        .use(remarkParse)
        .use(remarkMdx)
        .use(removeCustomComponents)
        .use(remarkStringify)
        .process(content);
    const slug = createSlug(filePath);
    const matchedDoc = findDocumentBySlug(slug);
    const markdownPath = path.join(markdownOutDir, `${slug}.md`);
    await ensureDirectoryExists(path.dirname(markdownPath));
    await fs.writeFile(markdownPath, String(plainContent.value), "utf-8");
    return {
        slug,
        title: frontmatter.title ||
            (matchedDoc && isRoute(matchedDoc) ? matchedDoc.title : "Untitled"),
        description: frontmatter.description || "",
        content: String(plainContent.value),
        raw: rawMdx,
    };
}
async function getMdxFiles(dir) {
    let files = [];
    try {
        const items = await fs.readdir(dir, { withFileTypes: true });
        for (const item of items) {
            const fullPath = path.join(dir, item.name);
            if (item.isDirectory()) {
                const subFiles = await getMdxFiles(fullPath);
                files = files.concat(subFiles);
            }
            else if (item.name.endsWith(".mdx")) {
                files.push(fullPath);
            }
        }
    } catch {
        return [];
    }
    return files;
}
async function convertMdxToJson() {
    try {
        await ensureDirectoryExists(outputDir);
        await ensureDirectoryExists(markdownOutDir);
        const mdxFilesLists = await Promise.all(docsRoots.map(getMdxFiles));
        const mdxFiles = mdxFilesLists.flat();
        const combinedData = [];
        for (const file of mdxFiles) {
            const jsonData = await processMdxFile(file);
            if (jsonData) combinedData.push(jsonData);
        }
        const combinedOutputPath = path.join(outputDir, "documents.json");
        await fs.writeFile(combinedOutputPath, JSON.stringify(combinedData, null, 2));
    }
    catch (err) {
        console.error("Error processing MDX files:", err);
    }
}
convertMdxToJson();
