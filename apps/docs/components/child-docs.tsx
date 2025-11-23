import { Card, Cards } from "fumadocs-ui/components/card";
import { source } from "@/lib/source";

export function ChildDocs({ folder }: { folder: string }) {
  const folderId = `root:${folder}`;
  const docs = source.pageTree.children.find((doc) => doc.$id === folderId);

  if (docs?.type !== "folder") {
    return;
  }

  const pages = docs.children
    .filter((doc) => doc.type === "page")
    .filter((page) => page.$id !== `${folderId}/index.mdx`);

  const folders = docs.children
    .filter((doc) => doc.type === "folder")
    .map((childfolder) => childfolder.index)
    .filter((childfolder) => childfolder !== undefined);

  const items = folders.concat(pages).sort((a, b) => {
    const nameA = a.name?.toString() ?? "";
    const nameB = b.name?.toString() ?? "";
    return nameA.localeCompare(nameB);
  });

  return (
    <Cards>
      {items.map((item) => (
        <Card href={item.url} key={item.url} title={item.name}>
          {item.description}
        </Card>
      ))}
    </Cards>
  );
}
