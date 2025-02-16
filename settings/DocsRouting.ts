import type { Paths } from "@/lib/pageRoutes"

export const DocsRouting: Paths[] = [
  {
    heading: "Getting started",
    title: "Introduction",
    href: "/introduction",
    items: [
      {
        title: "Installation",
        href: "/installation",
      },
    ],
  },
  {
    spacer: true,
  },
  {
    href: "/components",
    title: "Components",
    items: [
      {
        title: "Diagrams",
        href: "/diagrams",
      },
      {
        title: "Product Card",
        href: "/product-card",
      },
      {
        title: "Folder structure",
        href: "/folder-structure",
      },
      {
        title: "Notes",
        href: "/notes",
      },
      {
        title: "Steps",
        href: "/steps",
      },
    ],
  },
];

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}
export const page_routes = DocsRouting.map((it) => getRecurrsiveAllLinks(it)).flat();