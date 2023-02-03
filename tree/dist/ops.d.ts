/// <reference types="lichess" />
/// <reference types="web" />
export declare function withMainlineChild<T>(node: Tree.Node, f: (node: Tree.Node) => T): T | undefined;
export declare function findInMainline(fromNode: Tree.Node, predicate: (node: Tree.Node) => boolean): Tree.Node | undefined;
export declare function collect(from: Tree.Node, pickChild: (node: Tree.Node) => Tree.Node | undefined): Tree.Node[];
export declare const childById: (node: Tree.Node, id: string) => Tree.Node | undefined;
export declare const last: (nodeList: Tree.Node[]) => Tree.Node | undefined;
export declare const nodeAtPly: (nodeList: Tree.Node[], ply: number) => Tree.Node | undefined;
export declare function takePathWhile(nodeList: Tree.Node[], predicate: (node: Tree.Node) => boolean): Tree.Path;
export declare function removeChild(parent: Tree.Node, id: string): void;
export declare function countChildrenAndComments(node: Tree.Node): {
    nodes: number;
    comments: number;
};
export declare function merge(n1: Tree.Node, n2: Tree.Node): void;
export declare const hasBranching: (node: Tree.Node, maxDepth: number) => boolean;
export declare const mainlineNodeList: (from: Tree.Node) => Tree.Node[];
export declare function updateAll(root: Tree.Node, f: (node: Tree.Node) => void): void;
