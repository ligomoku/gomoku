/// <reference types="lichess" />
export declare const root: Tree.Path;
export declare const size: (path: Tree.Path) => number;
export declare const head: (path: Tree.Path) => Tree.Path;
export declare const tail: (path: Tree.Path) => string;
export declare const init: (path: Tree.Path) => Tree.Path;
export declare const last: (path: Tree.Path) => string;
export declare const contains: (p1: Tree.Path, p2: Tree.Path) => boolean;
export declare function fromNodeList(nodes: Tree.Node[]): Tree.Path;
export declare const isChildOf: (child: Tree.Path, parent: Tree.Path) => boolean;
