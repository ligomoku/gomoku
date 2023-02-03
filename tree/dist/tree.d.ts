/// <reference types="lichess" />
export type MaybeNode = Tree.Node | undefined;
export interface TreeWrapper {
    root: Tree.Node;
    lastPly(): number;
    nodeAtPath(path: Tree.Path): Tree.Node;
    getNodeList(path: Tree.Path): Tree.Node[];
    longestValidPath(path: string): Tree.Path;
    updateAt(path: Tree.Path, update: (node: Tree.Node) => void): MaybeNode;
    addNode(node: Tree.Node, path: Tree.Path): Tree.Path | undefined;
    addNodes(nodes: Tree.Node[], path: Tree.Path): Tree.Path | undefined;
    addDests(dests: string, path: Tree.Path): MaybeNode;
    setShapes(shapes: Tree.Shape[], path: Tree.Path): MaybeNode;
    setCommentAt(comment: Tree.Comment, path: Tree.Path): MaybeNode;
    deleteCommentAt(id: string, path: Tree.Path): MaybeNode;
    setGlyphsAt(glyphs: Tree.Glyph[], path: Tree.Path): MaybeNode;
    setClockAt(clock: Tree.Clock | undefined, path: Tree.Path): MaybeNode;
    pathIsMainline(path: Tree.Path): boolean;
    pathIsForcedVariation(path: Tree.Path): boolean;
    lastMainlineNode(path: Tree.Path): Tree.Node;
    pathExists(path: Tree.Path): boolean;
    deleteNodeAt(path: Tree.Path): void;
    promoteAt(path: Tree.Path, toMainline: boolean): void;
    forceVariationAt(path: Tree.Path, force: boolean): MaybeNode;
    getCurrentNodesAfterPly(nodeList: Tree.Node[], mainline: Tree.Node[], ply: number): Tree.Node[];
    merge(tree: Tree.Node): void;
    removeCeval(): void;
    removeComputerVariations(): void;
    parentNode(path: Tree.Path): Tree.Node;
    getParentClock(node: Tree.Node, path: Tree.Path): Tree.Clock | undefined;
}
export declare function build(root: Tree.Node): TreeWrapper;
