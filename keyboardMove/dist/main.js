import * as xhr from 'common/xhr';
import { h } from 'snabbdom';
import { onInsert } from 'common/snabbdom';
import { promote } from 'chess/promotion';
import { snabModal } from 'common/modal';
import { spinnerVdom as spinner } from 'common/spinner';
import { propWithEffect } from 'common';
const sanToRole = {
    P: 'pawn',
    N: 'knight',
    B: 'bishop',
    R: 'rook',
    Q: 'queen',
    K: 'king',
};
export function ctrl(root, step) {
    const isFocused = propWithEffect(false, root.redraw);
    const helpModalOpen = propWithEffect(false, root.redraw);
    let handler;
    let preHandlerBuffer = step.fen;
    let lastSelect = performance.now();
    const cgState = root.chessground.state;
    const select = (key) => {
        if (cgState.selected === key)
            root.chessground.cancelMove();
        else {
            root.chessground.selectSquare(key, true);
            lastSelect = performance.now();
        }
    };
    let usedSan = false;
    return {
        drop(key, piece) {
            const role = sanToRole[piece];
            const crazyData = root.data.crazyhouse;
            const color = root.data.player.color;
            // Crazyhouse not set up properly
            if (!root.crazyValid || !root.sendNewPiece)
                return;
            // Square occupied
            if (!role || !crazyData || cgState.pieces.has(key))
                return;
            // Piece not in Pocket
            if (!crazyData.pockets[color === 'white' ? 0 : 1][role])
                return;
            if (!root.crazyValid(role, key))
                return;
            root.chessground.cancelMove();
            root.chessground.newPiece({ role, color }, key);
            root.sendNewPiece(role, key, false);
        },
        promote(orig, dest, piece) {
            const role = sanToRole[piece];
            const variant = root.data.game.variant.key;
            if (!role || role == 'pawn' || (role == 'king' && variant !== 'antichess'))
                return;
            root.chessground.cancelMove();
            promote(root.chessground, dest, role);
            root.sendMove(orig, dest, role, { premove: false });
        },
        update(step, yourMove = false) {
            if (handler)
                handler(step.fen, cgState.movable.dests, yourMove);
            else
                preHandlerBuffer = step.fen;
        },
        registerHandler(h) {
            handler = h;
            if (preHandlerBuffer)
                handler(preHandlerBuffer, cgState.movable.dests);
        },
        san(orig, dest) {
            usedSan = true;
            root.chessground.cancelMove();
            select(orig);
            select(dest);
            // ensure chessground does not leave the destination square selected
            root.chessground.cancelMove();
        },
        select,
        hasSelected: () => cgState.selected,
        confirmMove: () => (root.submitMove ? root.submitMove(true) : null),
        usedSan,
        jump(plyDelta) {
            root.userJumpPlyDelta && root.userJumpPlyDelta(plyDelta);
            root.redraw();
        },
        justSelected: () => performance.now() - lastSelect < 500,
        clock: () => root.clock,
        draw: () => (root.offerDraw ? root.offerDraw(true, true) : null),
        resign: (v, immediately) => (root.resign ? root.resign(v, immediately) : null),
        next: () => { var _a; return (_a = root.next) === null || _a === void 0 ? void 0 : _a.call(root); },
        vote: (v) => { var _a; return (_a = root.vote) === null || _a === void 0 ? void 0 : _a.call(root, v); },
        helpModalOpen,
        isFocused,
    };
}
export function render(ctrl) {
    return h('div.keyboard-move', [
        h('input', {
            attrs: {
                spellcheck: 'false',
                autocomplete: 'off',
            },
            hook: onInsert(input => lichess
                .loadIife('keyboardMove', 'LichessKeyboardMove')
                .then(keyboardMove => ctrl.registerHandler(keyboardMove({ input, ctrl })))),
        }),
        ctrl.isFocused()
            ? h('em', 'Enter SAN (Nc3), ICCF (2133) or UCI (b1c3) moves, type ? to learn more')
            : h('strong', 'Press <enter> to focus'),
        ctrl.helpModalOpen()
            ? snabModal({
                class: 'keyboard-move-help',
                content: [h('div.scrollable', spinner())],
                onClose: () => ctrl.helpModalOpen(false),
                onInsert: async ($wrap) => {
                    const [, html] = await Promise.all([
                        lichess.loadCssPath('keyboardMove.help'),
                        xhr.text(xhr.url('/help/keyboard-move', {})),
                    ]);
                    $wrap.find('.scrollable').html(html);
                },
            })
            : null,
    ]);
}
