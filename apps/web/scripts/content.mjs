import { promises as fs } from "fs";
import grayMatter from "gray-matter";
import path from "path";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { DocsRouting } from "../dist/scripts/settings/DocsRouting.mjs";
const docsDir = path.join(process.cwd(), "apps/www/contents/docs");
const outputDir = path.join(process.cwd(),"apps/www/" , "public", "search-data");
function isMdxJsxFlowElement(node) {
    return node.type === "mdxJsxFlowElement" && "name" in node;
}
function isRoute(node) {
    return "href" in node && "title" in node;
}
function createSlug(filePath) {
    const relativePath = path.relative(docsDir, filePath);
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
    return {
        slug,
        title: frontmatter.title ||
            (matchedDoc && isRoute(matchedDoc) ? matchedDoc.title : "Untitled"),
        description: frontmatter.description || "",
        content: String(plainContent.value),
    };
}
async function getMdxFiles(dir) {
    let files = [];
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
    return files;
}
async function convertMdxToJson() {
    try {
        await ensureDirectoryExists(outputDir);
        const mdxFiles = await getMdxFiles(docsDir);
        const combinedData = [];
        for (const file of mdxFiles) {
            const jsonData = await processMdxFile(file);
            combinedData.push(jsonData);
        }
        const combinedOutputPath = path.join(outputDir, "documents.json");
        await fs.writeFile(combinedOutputPath, JSON.stringify(combinedData, null, 2));
    }
    catch (err) {
        console.error("Error processing MDX files:", err);
    }
}
convertMdxToJson();
