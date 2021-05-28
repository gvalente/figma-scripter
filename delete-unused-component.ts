// https://eng.lyft.com/building-a-design-systems-library-with-figma-scripter-c046df0a895c
// https://gist.github.com/alexjlockwood/206f52901d089db14bd4dc7f66292dd1#file-delete-unused-component-ts

if (figma.currentPage.selection.length !== 1) {
  figma.notify("🚫 Select a component");
  return;
}

const [componentNode] = figma.currentPage.selection;
if (componentNode.type !== "COMPONENT") {
  figma.notify("🚫 Select a component");
  return;
}

if (componentNode.key !== '') {
  // If the key is non-empty, then that means the component has
  // been published as part of the team library. Deleting published
  // components isn't safe because they may be used outside of the file.
  figma.notify("🚫 Selected component has been published");
  return;
}

// Create a list of all instances of the selected component node.
const instanceNodes = figma.root.children.flatMap(pageNode => {
  return pageNode.findAll(node => {
    if (node.type !== 'INSTANCE') {
      // Ignore non-instance nodes.
      return false;
    }
    // The node is an instance of the selected component node
    // if its master component ID matches the component node's ID.
    return node.masterComponent.id === componentNode.id;
  });
}) as readonly InstanceNode[];

if (instanceNodes.length === 0) {
  // The component is unused, so delete it.
  componentNode.remove();
  figma.notify(`🗑️ Deleted unused component`);
} else {
  // The component is still in use, so don't delete it.
  figma.notify(`✅ Found ${instanceNodes.length} instance(s) of the selected component`);
}