import { DocsRouting } from "../settings/DocsRouting.mjs";
export const Routes = [...DocsRouting];
function isRoute(node) {
    return "title" in node && "href" in node;
}
function getAllLinks(node) {
    const pages = [];
    if (isRoute(node) && !node.noLink) {
        pages.push({ title: node.title, href: node.href });
    }
    if (isRoute(node) && node.items) {
        node.items.forEach((subNode) => {
            if (isRoute(subNode)) {
                const temp = { ...subNode, href: `${node.href}${subNode.href}` };
                pages.push(...getAllLinks(temp));
            }
        });
    }
    return pages;
}
export const PageRoutes = Routes.map((it) => getAllLinks(it)).flat();
