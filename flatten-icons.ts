// https://eng.lyft.com/building-a-design-systems-library-with-figma-scripter-c046df0a895c
// https://gist.github.com/alexjlockwood/e87b65e0de0ff0d51324402b02b6e271#file-flatten-icons-ts

// Create a list of all component nodes in the Figma file.
const componentNodes = figma.root.children.flatMap(pageNode => {
  return pageNode.findAll(node => node.type === 'COMPONENT');
}) as readonly ComponentNode[];

// Create a list of component nodes that have more than one child node.
const unflattenedComponentNodes = componentNodes.filter(componentNode => {
  const childrenNodes = componentNode.findAll(() => true);
  return childrenNodes.length > 1;
});

// Flatten each component node's children into a single node.
unflattenedComponentNodes.forEach(node => figma.flatten(node.children, node));

figma.notify(`✅ Flattened ${unflattenedComponentNodes.length} icon(s)`);