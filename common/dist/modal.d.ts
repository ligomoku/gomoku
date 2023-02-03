/// <reference types="lichess" />
/// <reference types="cash" />
/// <reference types="web" />
import { VNode } from 'snabbdom';
import { MaybeVNodes } from './snabbdom';
interface BaseModal {
    class?: string;
    onInsert?: ($wrap: Cash) => void;
    onClose?(): void;
    noClickAway?: boolean;
}
interface Modal extends BaseModal {
    content: Cash;
}
interface SnabModal extends BaseModal {
    content: MaybeVNodes;
    onClose(): void;
}
declare function modal(opts: Modal): Cash;
declare namespace modal {
    var close: () => void;
    var onClose: (() => void) | undefined;
}
export default modal;
export declare function snabModal(opts: SnabModal): VNode;
export declare function trapFocus(event: FocusEvent): void;
export declare const focusFirstChild: (parent: Cash) => void;
