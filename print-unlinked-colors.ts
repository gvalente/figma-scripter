// https://eng.lyft.com/building-a-design-systems-library-with-figma-scripter-c046df0a895c
// https://gist.github.com/alexjlockwood/f6ca43a552bbb58fa129cc298f807859

figma.root.children
  .flatMap(pageNode => pageNode.findAll(n => true))
  .forEach(node => {
    if ('fills' in node && 'fillStyleId' in node) {
      if (node.fills !== figma.mixed && node.fills.length > 0 && node.fillStyleId !== '') {
        print(`${node.name}'s fill color is not linked to a style`);
      }
    }
    if ('strokes' in node && 'strokeStyleId' in node) {
      if (node.strokes.length > 0 && node.strokeStyleId !== '') {
        print(`${node.name}'s stroke color is not linked to a style`);
      }
    }
  });
