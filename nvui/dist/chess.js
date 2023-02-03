import { h } from 'snabbdom';
import { files } from 'chessground/types';
import { invRanks, allKeys } from 'chessground/util';
import { makeSetting } from './setting';
import { parseFen } from 'chessops/fen';
import { chessgroundDests } from 'chessops/compat';
import { RULES } from 'chessops/types';
import { setupPosition } from 'chessops/variant';
import { parseUci } from 'chessops/util';
import { sanWriter } from 'chess';
const nato = {
    a: 'alpha',
    b: 'bravo',
    c: 'charlie',
    d: 'delta',
    e: 'echo',
    f: 'foxtrot',
    g: 'golf',
    h: 'hotel',
};
const anna = {
    a: 'anna',
    b: 'bella',
    c: 'cesar',
    d: 'david',
    e: 'eva',
    f: 'felix',
    g: 'gustav',
    h: 'hector',
};
const roles = { P: 'pawn', R: 'rook', N: 'knight', B: 'bishop', Q: 'queen', K: 'king' };
const letters = { pawn: 'p', rook: 'r', knight: 'n', bishop: 'b', queen: 'q', king: 'k' };
const letterPiece = {
    p: 'p',
    r: 'r',
    n: 'n',
    b: 'b',
    q: 'q',
    k: 'k',
    P: 'p',
    R: 'r',
    N: 'n',
    B: 'b',
    Q: 'q',
    K: 'k',
};
const whiteUpperLetterPiece = {
    p: 'p',
    r: 'r',
    n: 'n',
    b: 'b',
    q: 'q',
    k: 'k',
    P: 'P',
    R: 'R',
    N: 'N',
    B: 'B',
    Q: 'Q',
    K: 'K',
};
export const namePiece = {
    p: 'pawn',
    r: 'rook',
    n: 'knight',
    b: 'bishop',
    q: 'queen',
    k: 'king',
    P: 'pawn',
    R: 'rook',
    N: 'knight',
    B: 'bishop',
    Q: 'queen',
    K: 'king',
};
const whiteUpperNamePiece = {
    p: 'pawn',
    r: 'rook',
    n: 'knight',
    b: 'bishop',
    q: 'queen',
    k: 'king',
    P: 'Pawn',
    R: 'Rook',
    N: 'Knight',
    B: 'Bishop',
    Q: 'Queen',
    K: 'King',
};
const skipToFile = {
    '!': 'a',
    '@': 'b',
    '#': 'c',
    $: 'd',
    '%': 'e',
    '^': 'f',
    '&': 'g',
    '*': 'h',
};
export function symbolToFile(char) {
    var _a;
    return (_a = skipToFile[char]) !== null && _a !== void 0 ? _a : '';
}
export function supportedVariant(key) {
    return ['standard', 'chess960', 'kingOfTheHill', 'threeCheck', 'fromPosition', 'atomic', 'horde'].includes(key);
}
export function boardSetting() {
    return makeSetting({
        choices: [
            ['plain', 'plain: layout with no semantic rows or columns'],
            ['table', 'table: layout using a table with rank and file columns and row headers'],
        ],
        default: 'plain',
        storage: lichess.storage.make('nvui.boardLayout'),
    });
}
export function styleSetting() {
    return makeSetting({
        choices: [
            ['san', 'SAN: Nxf3'],
            ['uci', 'UCI: g1f3'],
            ['literate', 'Literate: knight takes f 3'],
            ['anna', 'Anna: knight takes felix 3'],
            ['nato', 'Nato: knight takes foxtrot 3'],
        ],
        default: 'anna',
        storage: lichess.storage.make('nvui.moveNotation'),
    });
}
export function pieceSetting() {
    return makeSetting({
        choices: [
            ['letter', 'Letter: p, p'],
            ['white uppercase letter', 'White uppecase letter: P, p'],
            ['name', 'Name: pawn, pawn'],
            ['white uppercase name', 'White uppercase name: Pawn, pawn'],
        ],
        default: 'letter',
        storage: lichess.storage.make('nvui.pieceStyle'),
    });
}
export function prefixSetting() {
    return makeSetting({
        choices: [
            ['letter', 'Letter: w/b'],
            ['name', 'Name: white/black'],
            ['none', 'None'],
        ],
        default: 'letter',
        storage: lichess.storage.make('nvui.prefixStyle'),
    });
}
export function positionSetting() {
    return makeSetting({
        choices: [
            ['before', 'before: c2: wp'],
            ['after', 'after: wp: c2'],
            ['none', 'none'],
        ],
        default: 'before',
        storage: lichess.storage.make('nvui.positionStyle'),
    });
}
const renderPieceStyle = (piece, pieceStyle) => {
    switch (pieceStyle) {
        case 'letter':
            return letterPiece[piece];
        case 'white uppercase letter':
            return whiteUpperLetterPiece[piece];
        case 'name':
            return namePiece[piece];
        case 'white uppercase name':
            return whiteUpperNamePiece[piece];
    }
};
const renderPrefixStyle = (color, prefixStyle) => {
    switch (prefixStyle) {
        case 'letter':
            return color.charAt(0);
        case 'name':
            return color + ' ';
        case 'none':
            return '';
    }
};
export function lastCaptured(movesGenerator, pieceStyle, prefixStyle) {
    const moves = movesGenerator();
    const oldFen = moves[moves.length - 2];
    const newFen = moves[moves.length - 1];
    if (!oldFen || !newFen) {
        return 'none';
    }
    const oldSplitFen = oldFen.split(' ')[0];
    const newSplitFen = newFen.split(' ')[0];
    for (const p of 'kKqQrRbBnNpP') {
        const diff = oldSplitFen.split(p).length - 1 - (newSplitFen.split(p).length - 1);
        const pcolor = p.toUpperCase() === p ? 'white' : 'black';
        if (diff === 1) {
            const prefix = renderPrefixStyle(pcolor, prefixStyle);
            const piece = renderPieceStyle(p, pieceStyle);
            return prefix + piece;
        }
    }
    return 'none';
}
export function renderSan(san, uci, style) {
    if (!san)
        return '';
    let move;
    if (san.includes('O-O-O'))
        move = 'long castling';
    else if (san.includes('O-O'))
        move = 'short castling';
    else if (style === 'san')
        move = san.replace(/[\+#]/, '');
    else if (style === 'uci')
        move = uci || san;
    else {
        move = san
            .replace(/[\+#]/, '')
            .split('')
            .map(c => {
            if (c == 'x')
                return 'takes';
            if (c == '+')
                return 'check';
            if (c == '#')
                return 'checkmate';
            if (c == '=')
                return 'promotion';
            const code = c.charCodeAt(0);
            if (code > 48 && code < 58)
                return c; // 1-8
            if (code > 96 && code < 105)
                return renderFile(c, style); // a-g
            return roles[c] || c;
        })
            .join(' ');
    }
    if (san.includes('+'))
        move += ' check';
    if (san.includes('#'))
        move += ' checkmate';
    return move;
}
export function renderPieces(pieces, style) {
    return h('div', ['white', 'black'].map(color => {
        const lists = [];
        ['king', 'queen', 'rook', 'bishop', 'knight', 'pawn'].forEach(role => {
            const keys = [];
            for (const [key, piece] of pieces) {
                if (piece.color === color && piece.role === role)
                    keys.push(key);
            }
            if (keys.length)
                lists.push([`${role}${keys.length > 1 ? 's' : ''}`, ...keys]);
        });
        return h('div', [
            h('h3', `${color} pieces`),
            lists
                .map(l => `${l[0]}: ${l
                .slice(1)
                .map((k) => renderKey(k, style))
                .join(', ')}`)
                .join(', '),
        ]);
    }));
}
export function renderPieceKeys(pieces, p, style) {
    const name = `${p === p.toUpperCase() ? 'white' : 'black'} ${roles[p.toUpperCase()]}`;
    const res = [];
    for (const [k, piece] of pieces) {
        if (piece && `${piece.color} ${piece.role}` === name)
            res.push(k);
    }
    return `${name}: ${res.length ? res.map(k => renderKey(k, style)).join(', ') : 'none'}`;
}
export function renderPiecesOn(pieces, rankOrFile, style) {
    const res = [];
    for (const k of allKeys) {
        if (k.includes(rankOrFile)) {
            const piece = pieces.get(k);
            if (piece)
                res.push(`${renderKey(k, style)} ${piece.color} ${piece.role}`);
        }
    }
    return res.length ? res.join(', ') : 'blank';
}
export function renderBoard(pieces, pov, pieceStyle, prefixStyle, positionStyle, boardStyle) {
    const doRankHeader = (rank) => {
        return h('th', { attrs: { scope: 'row' } }, rank);
    };
    const doFileHeaders = () => {
        const ths = files.map(file => h('th', { attrs: { scope: 'col' } }, file));
        if (pov === 'black')
            ths.reverse();
        return h('tr', [h('td'), ...ths, h('td')]);
    };
    const renderPositionStyle = (rank, file, orig) => {
        switch (positionStyle) {
            case 'before':
                return file.toUpperCase() + rank + ' ' + orig;
            case 'after':
                return orig + ' ' + file.toUpperCase() + rank;
            case 'none':
                return orig;
        }
    };
    const doPieceButton = (rank, file, letter, color, text) => {
        return h('button', {
            attrs: { rank: rank, file: file, piece: letter.toLowerCase(), color: color },
        }, text);
    };
    const doPiece = (rank, file) => {
        const key = (file + rank);
        const piece = pieces.get(key);
        const pieceWrapper = boardStyle === 'table' ? 'td' : 'span';
        if (piece) {
            const role = letters[piece.role];
            const pieceText = renderPieceStyle(piece.color === 'white' ? role.toUpperCase() : role, pieceStyle);
            const prefix = renderPrefixStyle(piece.color, prefixStyle);
            const text = renderPositionStyle(rank, file, prefix + pieceText);
            return h(pieceWrapper, doPieceButton(rank, file, role, piece.color, text));
        }
        else {
            const letter = (key.charCodeAt(0) + key.charCodeAt(1)) % 2 ? '-' : '+';
            const text = renderPositionStyle(rank, file, letter);
            return h(pieceWrapper, doPieceButton(rank, file, letter, 'none', text));
        }
    };
    const doRank = (pov, rank) => {
        const rankElements = [];
        if (boardStyle === 'table')
            rankElements.push(doRankHeader(rank));
        rankElements.push(...files.map(file => doPiece(rank, file)));
        if (boardStyle === 'table')
            rankElements.push(doRankHeader(rank));
        if (pov === 'black')
            rankElements.reverse();
        return h(boardStyle === 'table' ? 'tr' : 'div', rankElements);
    };
    const ranks = [];
    if (boardStyle === 'table')
        ranks.push(doFileHeaders());
    ranks.push(...invRanks.map(rank => doRank(pov, rank)));
    if (boardStyle === 'table')
        ranks.push(doFileHeaders());
    if (pov === 'black')
        ranks.reverse();
    return h(boardStyle === 'table' ? 'table.board-wrapper' : 'div.board-wrapper', ranks);
}
export const renderFile = (f, style) => style === 'nato' ? nato[f] : style === 'anna' ? anna[f] : f;
export const renderKey = (key, style) => style === 'nato' || style === 'anna' ? `${renderFile(key[0], style)} ${key[1]}` : `${key[0]}${key[1]}`;
export function castlingFlavours(input) {
    switch (input.toLowerCase().replace(/[-\s]+/g, '')) {
        case 'oo':
        case '00':
            return 'o-o';
        case 'ooo':
        case '000':
            return 'o-o-o';
    }
    return input;
}
/* Listen to interactions on the chessboard */
export function positionJumpHandler() {
    return (ev) => {
        var _a, _b;
        const $btn = $(ev.target);
        const $file = (_a = $btn.attr('file')) !== null && _a !== void 0 ? _a : '';
        const $rank = (_b = $btn.attr('rank')) !== null && _b !== void 0 ? _b : '';
        let $newRank = '';
        let $newFile = '';
        if (ev.key.match(/^[1-8]$/)) {
            $newRank = ev.key;
            $newFile = $file;
        }
        else if (ev.key.match(/^[!@#$%^&*]$/)) {
            $newRank = $rank;
            $newFile = symbolToFile(ev.key);
            // if not a valid key for jumping
        }
        else {
            return true;
        }
        const newBtn = document.querySelector('.board-wrapper button[rank="' + $newRank + '"][file="' + $newFile + '"]');
        if (newBtn) {
            newBtn.focus();
            return false;
        }
        return true;
    };
}
export function pieceJumpingHandler(wrapSound, errorSound) {
    return (ev) => {
        if (!ev.key.match(/^[kqrbnp]$/i))
            return true;
        const $currBtn = $(ev.target);
        // TODO: decouple from promotion attribute setting in selectionHandler
        if ($currBtn.attr('promotion') === 'true') {
            const $moveBox = $('input.move');
            const $boardLive = $('.boardstatus');
            const $promotionPiece = ev.key.toLowerCase();
            const $form = $moveBox.parent().parent();
            if (!$promotionPiece.match(/^[qnrb]$/)) {
                $boardLive.text('Invalid promotion piece. q for queen, n for knight, r for rook, b for bishop');
                return false;
            }
            $moveBox.val($moveBox.val() + $promotionPiece);
            $currBtn.removeAttr('promotion');
            const $sendForm = new Event('submit', {
                cancelable: true,
                bubbles: true,
            });
            $form.trigger($sendForm);
            return false;
        }
        const $myBtnAttrs = '.board-wrapper [rank="' + $currBtn.attr('rank') + '"][file="' + $currBtn.attr('file') + '"]';
        const $allPieces = $('.board-wrapper [piece="' + ev.key.toLowerCase() + '"], ' + $myBtnAttrs);
        const $myPieceIndex = $allPieces.index($myBtnAttrs);
        const $next = ev.key.toLowerCase() === ev.key;
        const $prevNextPieces = $next ? $allPieces.slice($myPieceIndex + 1) : $allPieces.slice(0, $myPieceIndex);
        const $piece = $next ? $prevNextPieces.get(0) : $prevNextPieces.get($prevNextPieces.length - 1);
        if ($piece) {
            $piece.focus();
            // if detected any matching piece; one is the pice being clicked on,
        }
        else if ($allPieces.length >= 2) {
            const $wrapPiece = $next ? $allPieces.get(0) : $allPieces.get($allPieces.length - 1);
            $wrapPiece === null || $wrapPiece === void 0 ? void 0 : $wrapPiece.focus();
            wrapSound();
        }
        else {
            errorSound();
        }
        return false;
    };
}
export function arrowKeyHandler(pov, borderSound) {
    return (ev) => {
        var _a;
        const $currBtn = $(ev.target);
        const $isWhite = pov === 'white';
        let $file = (_a = $currBtn.attr('file')) !== null && _a !== void 0 ? _a : ' ';
        let $rank = Number($currBtn.attr('rank'));
        if (ev.key === 'ArrowUp') {
            $rank = $isWhite ? ($rank += 1) : ($rank -= 1);
        }
        else if (ev.key === 'ArrowDown') {
            $rank = $isWhite ? ($rank -= 1) : ($rank += 1);
        }
        else if (ev.key === 'ArrowLeft') {
            $file = String.fromCharCode($isWhite ? $file.charCodeAt(0) - 1 : $file.charCodeAt(0) + 1);
        }
        else if (ev.key === 'ArrowRight') {
            $file = String.fromCharCode($isWhite ? $file.charCodeAt(0) + 1 : $file.charCodeAt(0) - 1);
        }
        else {
            return true;
        }
        const $newSq = document.querySelector('.board-wrapper [file="' + $file + '"][rank="' + $rank + '"]');
        if ($newSq) {
            $newSq.focus();
        }
        else {
            borderSound();
        }
        ev.preventDefault();
        return false;
    };
}
export function selectionHandler(getOpponentColor, selectSound) {
    return (ev) => {
        var _a, _b;
        const opponentColor = getOpponentColor();
        // this depends on the current document structure. This may not be advisable in case the structure wil change.
        const $evBtn = $(ev.target);
        const $rank = $evBtn.attr('rank');
        const $pos = ((_a = $evBtn.attr('file')) !== null && _a !== void 0 ? _a : '') + $rank;
        const $boardLive = $('.boardstatus');
        const $promotionRank = opponentColor === 'black' ? '8' : '1';
        const $moveBox = $(document.querySelector('input.move'));
        if (!$moveBox)
            return false;
        // if no move in box yet
        if ($moveBox.val() === '') {
            // if user selects anothers' piece first
            if ($evBtn.attr('color') === opponentColor)
                return false;
            // as long as the user is selecting a piece and not a blank tile
            if ($evBtn.text().match(/^[^\-+]+/g)) {
                $moveBox.val($pos);
                selectSound();
            }
        }
        else {
            // if user selects their own piece second
            if ($evBtn.attr('color') === (opponentColor === 'black' ? 'white' : 'black'))
                return false;
            const $first = $moveBox.val();
            const $firstPiece = $('.board-wrapper [file="' + $first[0] + '"][rank="' + $first[1] + '"]');
            $moveBox.val($moveBox.val() + $pos);
            // this is coupled to pieceJumpingHandler() noticing that the attribute is set and acting differently. TODO: make cleaner
            // if pawn promotion
            if ($rank === $promotionRank && ((_b = $firstPiece.attr('piece')) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === 'p') {
                $evBtn.attr('promotion', 'true');
                $boardLive.text('Promote to? q for queen, n for knight, r for rook, b for bishop');
                return false;
            }
            // this section depends on the form being the grandparent of the input.move box.
            const $form = $moveBox.parent().parent();
            const $event = new Event('submit', {
                cancelable: true,
                bubbles: true,
            });
            $form.trigger($event);
        }
        return false;
    };
}
export function boardCommandsHandler() {
    return (ev) => {
        var _a, _b;
        const $currBtn = $(ev.target);
        const $boardLive = $('.boardstatus');
        const $position = ((_a = $currBtn.attr('file')) !== null && _a !== void 0 ? _a : '') + ((_b = $currBtn.attr('rank')) !== null && _b !== void 0 ? _b : '');
        if (ev.key === 'o') {
            $boardLive.text();
            $boardLive.text($position);
            return false;
        }
        else if (ev.key === 'l') {
            const $lastMove = $('p.lastMove').text();
            $boardLive.text();
            $boardLive.text($lastMove);
            return false;
        }
        else if (ev.key === 't') {
            $boardLive.text();
            $boardLive.text($('.nvui .botc').text() + ', ' + $('.nvui .topc').text());
            return false;
        }
        return true;
    };
}
export function lastCapturedCommandHandler(steps, pieceStyle, prefixStyle) {
    return (ev) => {
        const $boardLive = $('.boardstatus');
        if (ev.key === 'c') {
            $boardLive.text();
            $boardLive.text(lastCaptured(steps, pieceStyle, prefixStyle));
            return false;
        }
        return true;
    };
}
export function possibleMovesHandler(yourColor, turnColor, startingFen, piecesFunc, variant, moveable, steps) {
    return (ev) => {
        var _a, _b, _c;
        if (ev.key !== 'm' && ev.key !== 'M')
            return true;
        const $boardLive = $('.boardstatus');
        const pieces = piecesFunc();
        const $btn = $(ev.target);
        const pos = (((_a = $btn.attr('file')) !== null && _a !== void 0 ? _a : '') + $btn.attr('rank'));
        const ruleTranslation = {
            standard: 0,
            antichess: 1,
            kingOfTheHill: 2,
            threeCheck: 3,
            atomic: 4,
            horde: 5,
            racingKings: 6,
            crazyhouse: 7,
        };
        const rules = RULES[ruleTranslation[variant]];
        let rawMoves;
        // possible inefficient to reparse fen; but seems to work when it is AND when it is not the users' turn. Also note that this FEN is incomplete as it only contains the piece information.
        // if it is your turn
        if (turnColor() === yourColor) {
            rawMoves = moveable();
        }
        else {
            const fromSetup = setupPosition(rules, parseFen(startingFen()).unwrap()).unwrap();
            steps().forEach(s => {
                if (s.uci) {
                    const move = parseUci(s.uci);
                    if (move)
                        fromSetup.play(move);
                }
            });
            // important to override whose turn it is so only the users' own turns will show up
            fromSetup.turn = yourColor;
            rawMoves = chessgroundDests(fromSetup);
        }
        const possibleMoves = (_c = (_b = rawMoves === null || rawMoves === void 0 ? void 0 : rawMoves.get(pos)) === null || _b === void 0 ? void 0 : _b.map(i => {
            const p = pieces.get(i);
            // logic to prevent 'capture rook' on own piece in chess960
            return p && p.color !== yourColor ? `${i} captures ${p.role}` : i;
        })) === null || _c === void 0 ? void 0 : _c.filter(i => ev.key === 'm' || i.includes('captures'));
        if (!possibleMoves) {
            $boardLive.text('None');
            // if filters out non-capturing moves
        }
        else if (possibleMoves.length === 0) {
            $boardLive.text('No captures');
        }
        else {
            $boardLive.text(possibleMoves.join(', '));
        }
        return false;
    };
}
const promotionRegex = /^([a-h]x?)?[a-h](1|8)=\w$/;
const uciPromotionRegex = /^([a-h][1-8])([a-h](1|8))[qrbn]$/;
function destsToUcis(dests) {
    const ucis = [];
    for (const [orig, d] of dests) {
        if (d)
            d.forEach(function (dest) {
                ucis.push(orig + dest);
            });
    }
    return ucis;
}
function sanToUci(san, legalSans) {
    if (san in legalSans)
        return legalSans[san];
    const lowered = san.toLowerCase();
    for (const i in legalSans)
        if (i.toLowerCase() === lowered)
            return legalSans[i];
    return;
}
export function inputToLegalUci(input, fen, chessground) {
    var _a;
    const legalUcis = destsToUcis(chessground.state.movable.dests), legalSans = sanWriter(fen, legalUcis);
    let uci = sanToUci(input, legalSans) || input, promotion = '';
    if (input.match(promotionRegex)) {
        uci = sanToUci(input.slice(0, -2), legalSans) || input;
        promotion = input.slice(-1).toLowerCase();
    }
    else if (input.match(uciPromotionRegex)) {
        uci = input.slice(0, -1);
        promotion = input.slice(-1).toLowerCase();
    }
    else if ('18'.includes(uci[3]) && ((_a = chessground.state.pieces.get(uci.slice(0, 2))) === null || _a === void 0 ? void 0 : _a.role) == 'pawn')
        promotion = 'q';
    if (legalUcis.includes(uci.toLowerCase()))
        return uci + promotion;
    else
        return;
}
export function renderMainline(nodes, currentPath, style) {
    const res = [];
    let path = '';
    nodes.forEach(node => {
        if (!node.san || !node.uci)
            return;
        path += node.id;
        const content = [
            node.ply & 1 ? plyToTurn(node.ply) + ' ' : null,
            renderSan(node.san, node.uci, style),
        ];
        res.push(h('move', {
            attrs: { p: path },
            class: { active: path === currentPath },
        }, content));
        res.push(renderComments(node, style));
        res.push(', ');
        if (node.ply % 2 === 0)
            res.push(h('br'));
    });
    return res;
}
const plyToTurn = (ply) => Math.floor((ply - 1) / 2) + 1;
export function renderComments(node, style) {
    if (!node.comments)
        return '';
    return (node.comments || []).map(c => renderComment(c, style)).join('. ');
}
function renderComment(comment, style) {
    return comment.by === 'lichess'
        ? comment.text.replace(/Best move was (.+)\./, (_, san) => 'Best move was ' + renderSan(san, undefined, style))
        : comment.text;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2hlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLENBQUMsRUFBd0IsTUFBTSxVQUFVLENBQUM7QUFDbkQsT0FBTyxFQUE2QixLQUFLLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNyRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXJELE9BQU8sRUFBVyxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDakQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN4QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRCxPQUFPLEVBQWMsS0FBSyxFQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFZLFNBQVMsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQVk1QyxNQUFNLElBQUksR0FBaUM7SUFDekMsQ0FBQyxFQUFFLE9BQU87SUFDVixDQUFDLEVBQUUsT0FBTztJQUNWLENBQUMsRUFBRSxTQUFTO0lBQ1osQ0FBQyxFQUFFLE9BQU87SUFDVixDQUFDLEVBQUUsTUFBTTtJQUNULENBQUMsRUFBRSxTQUFTO0lBQ1osQ0FBQyxFQUFFLE1BQU07SUFDVCxDQUFDLEVBQUUsT0FBTztDQUNYLENBQUM7QUFDRixNQUFNLElBQUksR0FBaUM7SUFDekMsQ0FBQyxFQUFFLE1BQU07SUFDVCxDQUFDLEVBQUUsT0FBTztJQUNWLENBQUMsRUFBRSxPQUFPO0lBQ1YsQ0FBQyxFQUFFLE9BQU87SUFDVixDQUFDLEVBQUUsS0FBSztJQUNSLENBQUMsRUFBRSxPQUFPO0lBQ1YsQ0FBQyxFQUFFLFFBQVE7SUFDWCxDQUFDLEVBQUUsUUFBUTtDQUNaLENBQUM7QUFDRixNQUFNLEtBQUssR0FBaUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ3RILE1BQU0sT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUUxRixNQUFNLFdBQVcsR0FBaUM7SUFDaEQsQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0NBQ1AsQ0FBQztBQUNGLE1BQU0scUJBQXFCLEdBQWlDO0lBQzFELENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztJQUNOLENBQUMsRUFBRSxHQUFHO0lBQ04sQ0FBQyxFQUFFLEdBQUc7SUFDTixDQUFDLEVBQUUsR0FBRztDQUNQLENBQUM7QUFDRixNQUFNLENBQUMsTUFBTSxTQUFTLEdBQWlDO0lB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QUMsQ0FBQztRQUNmLElBQUksSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCxNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQVEsRUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFdEUsTUFBTSxVQUFVLGNBQWMsQ0FBQyxJQUFlLEVBQUUsS0FBWTtJQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUM5QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVFLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxPQUFxQixFQUFFLEtBQVk7SUFDeEQsT0FBTyxPQUFPLENBQUMsRUFBRSxLQUFLLFNBQVM7UUFDN0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0csQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGgsIFZOb2RlLCBWTm9kZUNoaWxkcmVuIH0gZnJvbSAnc25hYmJkb20nO1xuaW1wb3J0IHsgRGVzdHMsIFBpZWNlcywgUmFuaywgRmlsZSwgZmlsZXMgfSBmcm9tICdjaGVzc2dyb3VuZC90eXBlcyc7XG5pbXBvcnQgeyBpbnZSYW5rcywgYWxsS2V5cyB9IGZyb20gJ2NoZXNzZ3JvdW5kL3V0aWwnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnY2hlc3Nncm91bmQvYXBpJztcbmltcG9ydCB7IFNldHRpbmcsIG1ha2VTZXR0aW5nIH0gZnJvbSAnLi9zZXR0aW5nJztcbmltcG9ydCB7IHBhcnNlRmVuIH0gZnJvbSAnY2hlc3NvcHMvZmVuJztcbmltcG9ydCB7IGNoZXNzZ3JvdW5kRGVzdHMgfSBmcm9tICdjaGVzc29wcy9jb21wYXQnO1xuaW1wb3J0IHsgU3F1YXJlTmFtZSwgUlVMRVMsIFJ1bGVzIH0gZnJvbSAnY2hlc3NvcHMvdHlwZXMnO1xuaW1wb3J0IHsgc2V0dXBQb3NpdGlvbiB9IGZyb20gJ2NoZXNzb3BzL3ZhcmlhbnQnO1xuaW1wb3J0IHsgcGFyc2VVY2kgfSBmcm9tICdjaGVzc29wcy91dGlsJztcbmltcG9ydCB7IFNhblRvVWNpLCBzYW5Xcml0ZXIgfSBmcm9tICdjaGVzcyc7XG5cbmV4cG9ydCB0eXBlIFN0eWxlID0gJ3VjaScgfCAnc2FuJyB8ICdsaXRlcmF0ZScgfCAnbmF0bycgfCAnYW5uYSc7XG5leHBvcnQgdHlwZSBQaWVjZVN0eWxlID0gJ2xldHRlcicgfCAnd2hpdGUgdXBwZXJjYXNlIGxldHRlcicgfCAnbmFtZScgfCAnd2hpdGUgdXBwZXJjYXNlIG5hbWUnO1xuZXhwb3J0IHR5cGUgUHJlZml4U3R5bGUgPSAnbGV0dGVyJyB8ICduYW1lJyB8ICdub25lJztcbmV4cG9ydCB0eXBlIFBvc2l0aW9uU3R5bGUgPSAnYmVmb3JlJyB8ICdhZnRlcicgfCAnbm9uZSc7XG5leHBvcnQgdHlwZSBCb2FyZFN0eWxlID0gJ3BsYWluJyB8ICd0YWJsZSc7XG5cbmludGVyZmFjZSBSb3VuZFN0ZXAge1xuICB1Y2k6IFVjaTtcbn1cblxuY29uc3QgbmF0bzogeyBbbGV0dGVyOiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcbiAgYTogJ2FscGhhJyxcbiAgYjogJ2JyYXZvJyxcbiAgYzogJ2NoYXJsaWUnLFxuICBkOiAnZGVsdGEnLFxuICBlOiAnZWNobycsXG4gIGY6ICdmb3h0cm90JyxcbiAgZzogJ2dvbGYnLFxuICBoOiAnaG90ZWwnLFxufTtcbmNvbnN0IGFubmE6IHsgW2xldHRlcjogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gIGE6ICdhbm5hJyxcbiAgYjogJ2JlbGxhJyxcbiAgYzogJ2Nlc2FyJyxcbiAgZDogJ2RhdmlkJyxcbiAgZTogJ2V2YScsXG4gIGY6ICdmZWxpeCcsXG4gIGc6ICdndXN0YXYnLFxuICBoOiAnaGVjdG9yJyxcbn07XG5jb25zdCByb2xlczogeyBbbGV0dGVyOiBzdHJpbmddOiBzdHJpbmcgfSA9IHsgUDogJ3Bhd24nLCBSOiAncm9vaycsIE46ICdrbmlnaHQnLCBCOiAnYmlzaG9wJywgUTogJ3F1ZWVuJywgSzogJ2tpbmcnIH07XG5jb25zdCBsZXR0ZXJzID0geyBwYXduOiAncCcsIHJvb2s6ICdyJywga25pZ2h0OiAnbicsIGJpc2hvcDogJ2InLCBxdWVlbjogJ3EnLCBraW5nOiAnaycgfTtcblxuY29uc3QgbGV0dGVyUGllY2U6IHsgW2xldHRlcjogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gIHA6ICdwJyxcbiAgcjogJ3InLFxuICBuOiAnbicsXG4gIGI6ICdiJyxcbiAgcTogJ3EnLFxuICBrOiAnaycsXG4gIFA6ICdwJyxcbiAgUjogJ3InLFxuICBOOiAnbicsXG4gIEI6ICdiJyxcbiAgUTogJ3EnLFxuICBLOiAnaycsXG59O1xuY29uc3Qgd2hpdGVVcHBlckxldHRlclBpZWNlOiB7IFtsZXR0ZXI6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICBwOiAncCcsXG4gIHI6ICdyJyxcbiAgbjogJ24nLFxuICBiOiAnYicsXG4gIHE6ICdxJyxcbiAgazogJ2snLFxuICBQOiAnUCcsXG4gIFI6ICdSJyxcbiAgTjogJ04nLFxuICBCOiAnQicsXG4gIFE6ICdRJyxcbiAgSzogJ0snLFxufTtcbmV4cG9ydCBjb25zdCBuYW1lUGllY2U6IHsgW2xldHRlcjogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gIHA6ICdwYXduJyxcbiAgcjogJ3Jvb2snLFxuICBuOiAna25pZ2h0JyxcbiAgYjogJ2Jpc2hvcCcsXG4gIHE6ICdxdWVlbicsXG4gIGs6ICdraW5nJyxcbiAgUDogJ3Bhd24nLFxuICBSOiAncm9vaycsXG4gIE46ICdrbmlnaHQnLFxuICBCOiAnYmlzaG9wJyxcbiAgUTogJ3F1ZWVuJyxcbiAgSzogJ2tpbmcnLFxufTtcbmNvbnN0IHdoaXRlVXBwZXJOYW1lUGllY2U6IHsgW2xldHRlcjogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gIHA6ICdwYXduJyxcbiAgcjogJ3Jvb2snLFxuICBuOiAna25pZ2h0JyxcbiAgYjogJ2Jpc2hvcCcsXG4gIHE6ICdxdWVlbicsXG4gIGs6ICdraW5nJyxcbiAgUDogJ1Bhd24nLFxuICBSOiAnUm9vaycsXG4gIE46ICdLbmlnaHQnLFxuICBCOiAnQmlzaG9wJyxcbiAgUTogJ1F1ZWVuJyxcbiAgSzogJ0tpbmcnLFxufTtcbmNvbnN0IHNraXBUb0ZpbGU6IHsgW2xldHRlcjogc3RyaW5nXTogc3RyaW5nIH0gPSB7XG4gICchJzogJ2EnLFxuICAnQCc6ICdiJyxcbiAgJyMnOiAnYycsXG4gICQ6ICdkJyxcbiAgJyUnOiAnZScsXG4gICdeJzogJ2YnLFxuICAnJic6ICdnJyxcbiAgJyonOiAnaCcsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc3ltYm9sVG9GaWxlKGNoYXI6IHN0cmluZykge1xuICByZXR1cm4gc2tpcFRvRmlsZVtjaGFyXSA/PyAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1cHBvcnRlZFZhcmlhbnQoa2V5OiBzdHJpbmcpIHtcbiAgcmV0dXJuIFsnc3RhbmRhcmQnLCAnY2hlc3M5NjAnLCAna2luZ09mVGhlSGlsbCcsICd0aHJlZUNoZWNrJywgJ2Zyb21Qb3NpdGlvbicsICdhdG9taWMnLCAnaG9yZGUnXS5pbmNsdWRlcyhrZXkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm9hcmRTZXR0aW5nKCk6IFNldHRpbmc8Qm9hcmRTdHlsZT4ge1xuICByZXR1cm4gbWFrZVNldHRpbmc8Qm9hcmRTdHlsZT4oe1xuICAgIGNob2ljZXM6IFtcbiAgICAgIFsncGxhaW4nLCAncGxhaW46IGxheW91dCB3aXRoIG5vIHNlbWFudGljIHJvd3Mgb3IgY29sdW1ucyddLFxuICAgICAgWyd0YWJsZScsICd0YWJsZTogbGF5b3V0IHVzaW5nIGEgdGFibGUgd2l0aCByYW5rIGFuZCBmaWxlIGNvbHVtbnMgYW5kIHJvdyBoZWFkZXJzJ10sXG4gICAgXSxcbiAgICBkZWZhdWx0OiAncGxhaW4nLFxuICAgIHN0b3JhZ2U6IGxpY2hlc3Muc3RvcmFnZS5tYWtlKCdudnVpLmJvYXJkTGF5b3V0JyksXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVTZXR0aW5nKCk6IFNldHRpbmc8U3R5bGU+IHtcbiAgcmV0dXJuIG1ha2VTZXR0aW5nPFN0eWxlPih7XG4gICAgY2hvaWNlczogW1xuICAgICAgWydzYW4nLCAnU0FOOiBOeGYzJ10sXG4gICAgICBbJ3VjaScsICdVQ0k6IGcxZjMnXSxcbiAgICAgIFsnbGl0ZXJhdGUnLCAnTGl0ZXJhdGU6IGtuaWdodCB0YWtlcyBmIDMnXSxcbiAgICAgIFsnYW5uYScsICdBbm5hOiBrbmlnaHQgdGFrZXMgZmVsaXggMyddLFxuICAgICAgWyduYXRvJywgJ05hdG86IGtuaWdodCB0YWtlcyBmb3h0cm90IDMnXSxcbiAgICBdLFxuICAgIGRlZmF1bHQ6ICdhbm5hJywgLy8gYWxsIHRoZSByYWdlIGluIE9UQiBibGluZCBjaGVzcyB0b3VybmFtZW50c1xuICAgIHN0b3JhZ2U6IGxpY2hlc3Muc3RvcmFnZS5tYWtlKCdudnVpLm1vdmVOb3RhdGlvbicpLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBpZWNlU2V0dGluZygpOiBTZXR0aW5nPFBpZWNlU3R5bGU+IHtcbiAgcmV0dXJuIG1ha2VTZXR0aW5nPFBpZWNlU3R5bGU+KHtcbiAgICBjaG9pY2VzOiBbXG4gICAgICBbJ2xldHRlcicsICdMZXR0ZXI6IHAsIHAnXSxcbiAgICAgIFsnd2hpdGUgdXBwZXJjYXNlIGxldHRlcicsICdXaGl0ZSB1cHBlY2FzZSBsZXR0ZXI6IFAsIHAnXSxcbiAgICAgIFsnbmFtZScsICdOYW1lOiBwYXduLCBwYXduJ10sXG4gICAgICBbJ3doaXRlIHVwcGVyY2FzZSBuYW1lJywgJ1doaXRlIHVwcGVyY2FzZSBuYW1lOiBQYXduLCBwYXduJ10sXG4gICAgXSxcbiAgICBkZWZhdWx0OiAnbGV0dGVyJyxcbiAgICBzdG9yYWdlOiBsaWNoZXNzLnN0b3JhZ2UubWFrZSgnbnZ1aS5waWVjZVN0eWxlJyksXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJlZml4U2V0dGluZygpOiBTZXR0aW5nPFByZWZpeFN0eWxlPiB7XG4gIHJldHVybiBtYWtlU2V0dGluZzxQcmVmaXhTdHlsZT4oe1xuICAgIGNob2ljZXM6IFtcbiAgICAgIFsnbGV0dGVyJywgJ0xldHRlcjogdy9iJ10sXG4gICAgICBbJ25hbWUnLCAnTmFtZTogd2hpdGUvYmxhY2snXSxcbiAgICAgIFsnbm9uZScsICdOb25lJ10sXG4gICAgXSxcbiAgICBkZWZhdWx0OiAnbGV0dGVyJyxcbiAgICBzdG9yYWdlOiBsaWNoZXNzLnN0b3JhZ2UubWFrZSgnbnZ1aS5wcmVmaXhTdHlsZScpLFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvc2l0aW9uU2V0dGluZygpOiBTZXR0aW5nPFBvc2l0aW9uU3R5bGU+IHtcbiAgcmV0dXJuIG1ha2VTZXR0aW5nPFBvc2l0aW9uU3R5bGU+KHtcbiAgICBjaG9pY2VzOiBbXG4gICAgICBbJ2JlZm9yZScsICdiZWZvcmU6IGMyOiB3cCddLFxuICAgICAgWydhZnRlcicsICdhZnRlcjogd3A6IGMyJ10sXG4gICAgICBbJ25vbmUnLCAnbm9uZSddLFxuICAgIF0sXG4gICAgZGVmYXVsdDogJ2JlZm9yZScsXG4gICAgc3RvcmFnZTogbGljaGVzcy5zdG9yYWdlLm1ha2UoJ252dWkucG9zaXRpb25TdHlsZScpLFxuICB9KTtcbn1cbmNvbnN0IHJlbmRlclBpZWNlU3R5bGUgPSAocGllY2U6IHN0cmluZywgcGllY2VTdHlsZTogUGllY2VTdHlsZSkgPT4ge1xuICBzd2l0Y2ggKHBpZWNlU3R5bGUpIHtcbiAgICBjYXNlICdsZXR0ZXInOlxuICAgICAgcmV0dXJuIGxldHRlclBpZWNlW3BpZWNlXTtcbiAgICBjYXNlICd3aGl0ZSB1cHBlcmNhc2UgbGV0dGVyJzpcbiAgICAgIHJldHVybiB3aGl0ZVVwcGVyTGV0dGVyUGllY2VbcGllY2VdO1xuICAgIGNhc2UgJ25hbWUnOlxuICAgICAgcmV0dXJuIG5hbWVQaWVjZVtwaWVjZV07XG4gICAgY2FzZSAnd2hpdGUgdXBwZXJjYXNlIG5hbWUnOlxuICAgICAgcmV0dXJuIHdoaXRlVXBwZXJOYW1lUGllY2VbcGllY2VdO1xuICB9XG59O1xuY29uc3QgcmVuZGVyUHJlZml4U3R5bGUgPSAoY29sb3I6IENvbG9yLCBwcmVmaXhTdHlsZTogUHJlZml4U3R5bGUpID0+IHtcbiAgc3dpdGNoIChwcmVmaXhTdHlsZSkge1xuICAgIGNhc2UgJ2xldHRlcic6XG4gICAgICByZXR1cm4gY29sb3IuY2hhckF0KDApO1xuICAgIGNhc2UgJ25hbWUnOlxuICAgICAgcmV0dXJuIGNvbG9yICsgJyAnO1xuICAgIGNhc2UgJ25vbmUnOlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gbGFzdENhcHR1cmVkKG1vdmVzR2VuZXJhdG9yOiAoKSA9PiBzdHJpbmdbXSwgcGllY2VTdHlsZTogUGllY2VTdHlsZSwgcHJlZml4U3R5bGU6IFByZWZpeFN0eWxlKTogc3RyaW5nIHtcbiAgY29uc3QgbW92ZXMgPSBtb3Zlc0dlbmVyYXRvcigpO1xuICBjb25zdCBvbGRGZW4gPSBtb3Zlc1ttb3Zlcy5sZW5ndGggLSAyXTtcbiAgY29uc3QgbmV3RmVuID0gbW92ZXNbbW92ZXMubGVuZ3RoIC0gMV07XG4gIGlmICghb2xkRmVuIHx8ICFuZXdGZW4pIHtcbiAgICByZXR1cm4gJ25vbmUnO1xuICB9XG4gIGNvbnN0IG9sZFNwbGl0RmVuID0gb2xkRmVuLnNwbGl0KCcgJylbMF07XG4gIGNvbnN0IG5ld1NwbGl0RmVuID0gbmV3RmVuLnNwbGl0KCcgJylbMF07XG4gIGZvciAoY29uc3QgcCBvZiAna0txUXJSYkJuTnBQJykge1xuICAgIGNvbnN0IGRpZmYgPSBvbGRTcGxpdEZlbi5zcGxpdChwKS5sZW5ndGggLSAxIC0gKG5ld1NwbGl0RmVuLnNwbGl0KHApLmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IHBjb2xvciA9IHAudG9VcHBlckNhc2UoKSA9PT0gcCA/ICd3aGl0ZScgOiAnYmxhY2snO1xuICAgIGlmIChkaWZmID09PSAxKSB7XG4gICAgICBjb25zdCBwcmVmaXggPSByZW5kZXJQcmVmaXhTdHlsZShwY29sb3IsIHByZWZpeFN0eWxlKTtcbiAgICAgIGNvbnN0IHBpZWNlID0gcmVuZGVyUGllY2VTdHlsZShwLCBwaWVjZVN0eWxlKTtcbiAgICAgIHJldHVybiBwcmVmaXggKyBwaWVjZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuICdub25lJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclNhbihzYW46IFNhbiwgdWNpOiBVY2kgfCB1bmRlZmluZWQsIHN0eWxlOiBTdHlsZSkge1xuICBpZiAoIXNhbikgcmV0dXJuICcnO1xuICBsZXQgbW92ZTogc3RyaW5nO1xuICBpZiAoc2FuLmluY2x1ZGVzKCdPLU8tTycpKSBtb3ZlID0gJ2xvbmcgY2FzdGxpbmcnO1xuICBlbHNlIGlmIChzYW4uaW5jbHVkZXMoJ08tTycpKSBtb3ZlID0gJ3Nob3J0IGNhc3RsaW5nJztcbiAgZWxzZSBpZiAoc3R5bGUgPT09ICdzYW4nKSBtb3ZlID0gc2FuLnJlcGxhY2UoL1tcXCsjXS8sICcnKTtcbiAgZWxzZSBpZiAoc3R5bGUgPT09ICd1Y2knKSBtb3ZlID0gdWNpIHx8IHNhbjtcbiAgZWxzZSB7XG4gICAgbW92ZSA9IHNhblxuICAgICAgLnJlcGxhY2UoL1tcXCsjXS8sICcnKVxuICAgICAgLnNwbGl0KCcnKVxuICAgICAgLm1hcChjID0+IHtcbiAgICAgICAgaWYgKGMgPT0gJ3gnKSByZXR1cm4gJ3Rha2VzJztcbiAgICAgICAgaWYgKGMgPT0gJysnKSByZXR1cm4gJ2NoZWNrJztcbiAgICAgICAgaWYgKGMgPT0gJyMnKSByZXR1cm4gJ2NoZWNrbWF0ZSc7XG4gICAgICAgIGlmIChjID09ICc9JykgcmV0dXJuICdwcm9tb3Rpb24nO1xuICAgICAgICBjb25zdCBjb2RlID0gYy5jaGFyQ29kZUF0KDApO1xuICAgICAgICBpZiAoY29kZSA+IDQ4ICYmIGNvZGUgPCA1OCkgcmV0dXJuIGM7IC8vIDEtOFxuICAgICAgICBpZiAoY29kZSA+IDk2ICYmIGNvZGUgPCAxMDUpIHJldHVybiByZW5kZXJGaWxlKGMsIHN0eWxlKTsgLy8gYS1nXG4gICAgICAgIHJldHVybiByb2xlc1tjXSB8fCBjO1xuICAgICAgfSlcbiAgICAgIC5qb2luKCcgJyk7XG4gIH1cbiAgaWYgKHNhbi5pbmNsdWRlcygnKycpKSBtb3ZlICs9ICcgY2hlY2snO1xuICBpZiAoc2FuLmluY2x1ZGVzKCcjJykpIG1vdmUgKz0gJyBjaGVja21hdGUnO1xuICByZXR1cm4gbW92ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlclBpZWNlcyhwaWVjZXM6IFBpZWNlcywgc3R5bGU6IFN0eWxlKTogVk5vZGUge1xuICByZXR1cm4gaChcbiAgICAnZGl2JyxcbiAgICBbJ3doaXRlJywgJ2JsYWNrJ10ubWFwKGNvbG9yID0+IHtcbiAgICAgIGNvbnN0IGxpc3RzOiBzdHJpbmdbXVtdID0gW107XG4gICAgICBbJ2tpbmcnLCAncXVlZW4nLCAncm9vaycsICdiaXNob3AnLCAna25pZ2h0JywgJ3Bhd24nXS5mb3JFYWNoKHJvbGUgPT4ge1xuICAgICAgICBjb25zdCBrZXlzID0gW107XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgcGllY2VdIG9mIHBpZWNlcykge1xuICAgICAgICAgIGlmIChwaWVjZS5jb2xvciA9PT0gY29sb3IgJiYgcGllY2Uucm9sZSA9PT0gcm9sZSkga2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtleXMubGVuZ3RoKSBsaXN0cy5wdXNoKFtgJHtyb2xlfSR7a2V5cy5sZW5ndGggPiAxID8gJ3MnIDogJyd9YCwgLi4ua2V5c10pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gaCgnZGl2JywgW1xuICAgICAgICBoKCdoMycsIGAke2NvbG9yfSBwaWVjZXNgKSxcbiAgICAgICAgbGlzdHNcbiAgICAgICAgICAubWFwKFxuICAgICAgICAgICAgbCA9PlxuICAgICAgICAgICAgICBgJHtsWzBdfTogJHtsXG4gICAgICAgICAgICAgICAgLnNsaWNlKDEpXG4gICAgICAgICAgICAgICAgLm1hcCgoazogc3RyaW5nKSA9PiByZW5kZXJLZXkoaywgc3R5bGUpKVxuICAgICAgICAgICAgICAgIC5qb2luKCcsICcpfWBcbiAgICAgICAgICApXG4gICAgICAgICAgLmpvaW4oJywgJyksXG4gICAgICBdKTtcbiAgICB9KVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyUGllY2VLZXlzKHBpZWNlczogUGllY2VzLCBwOiBzdHJpbmcsIHN0eWxlOiBTdHlsZSk6IHN0cmluZyB7XG4gIGNvbnN0IG5hbWUgPSBgJHtwID09PSBwLnRvVXBwZXJDYXNlKCkgPyAnd2hpdGUnIDogJ2JsYWNrJ30gJHtyb2xlc1twLnRvVXBwZXJDYXNlKCldfWA7XG4gIGNvbnN0IHJlczogS2V5W10gPSBbXTtcbiAgZm9yIChjb25zdCBbaywgcGllY2VdIG9mIHBpZWNlcykge1xuICAgIGlmIChwaWVjZSAmJiBgJHtwaWVjZS5jb2xvcn0gJHtwaWVjZS5yb2xlfWAgPT09IG5hbWUpIHJlcy5wdXNoKGsgYXMgS2V5KTtcbiAgfVxuICByZXR1cm4gYCR7bmFtZX06ICR7cmVzLmxlbmd0aCA/IHJlcy5tYXAoayA9PiByZW5kZXJLZXkoaywgc3R5bGUpKS5qb2luKCcsICcpIDogJ25vbmUnfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJQaWVjZXNPbihwaWVjZXM6IFBpZWNlcywgcmFua09yRmlsZTogc3RyaW5nLCBzdHlsZTogU3R5bGUpOiBzdHJpbmcge1xuICBjb25zdCByZXM6IHN0cmluZ1tdID0gW107XG4gIGZvciAoY29uc3QgayBvZiBhbGxLZXlzKSB7XG4gICAgaWYgKGsuaW5jbHVkZXMocmFua09yRmlsZSkpIHtcbiAgICAgIGNvbnN0IHBpZWNlID0gcGllY2VzLmdldChrKTtcbiAgICAgIGlmIChwaWVjZSkgcmVzLnB1c2goYCR7cmVuZGVyS2V5KGssIHN0eWxlKX0gJHtwaWVjZS5jb2xvcn0gJHtwaWVjZS5yb2xlfWApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzLmxlbmd0aCA/IHJlcy5qb2luKCcsICcpIDogJ2JsYW5rJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckJvYXJkKFxuICBwaWVjZXM6IFBpZWNlcyxcbiAgcG92OiBDb2xvcixcbiAgcGllY2VTdHlsZTogUGllY2VTdHlsZSxcbiAgcHJlZml4U3R5bGU6IFByZWZpeFN0eWxlLFxuICBwb3NpdGlvblN0eWxlOiBQb3NpdGlvblN0eWxlLFxuICBib2FyZFN0eWxlOiBCb2FyZFN0eWxlXG4pOiBWTm9kZSB7XG4gIGNvbnN0IGRvUmFua0hlYWRlciA9IChyYW5rOiBSYW5rKTogVk5vZGUgPT4ge1xuICAgIHJldHVybiBoKCd0aCcsIHsgYXR0cnM6IHsgc2NvcGU6ICdyb3cnIH0gfSwgcmFuayk7XG4gIH07XG4gIGNvbnN0IGRvRmlsZUhlYWRlcnMgPSAoKTogVk5vZGUgPT4ge1xuICAgIGNvbnN0IHRocyA9IGZpbGVzLm1hcChmaWxlID0+IGgoJ3RoJywgeyBhdHRyczogeyBzY29wZTogJ2NvbCcgfSB9LCBmaWxlKSk7XG4gICAgaWYgKHBvdiA9PT0gJ2JsYWNrJykgdGhzLnJldmVyc2UoKTtcbiAgICByZXR1cm4gaCgndHInLCBbaCgndGQnKSwgLi4udGhzLCBoKCd0ZCcpXSk7XG4gIH07XG4gIGNvbnN0IHJlbmRlclBvc2l0aW9uU3R5bGUgPSAocmFuazogUmFuaywgZmlsZTogRmlsZSwgb3JpZzogc3RyaW5nKSA9PiB7XG4gICAgc3dpdGNoIChwb3NpdGlvblN0eWxlKSB7XG4gICAgICBjYXNlICdiZWZvcmUnOlxuICAgICAgICByZXR1cm4gZmlsZS50b1VwcGVyQ2FzZSgpICsgcmFuayArICcgJyArIG9yaWc7XG4gICAgICBjYXNlICdhZnRlcic6XG4gICAgICAgIHJldHVybiBvcmlnICsgJyAnICsgZmlsZS50b1VwcGVyQ2FzZSgpICsgcmFuaztcbiAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICByZXR1cm4gb3JpZztcbiAgICB9XG4gIH07XG4gIGNvbnN0IGRvUGllY2VCdXR0b24gPSAocmFuazogUmFuaywgZmlsZTogRmlsZSwgbGV0dGVyOiBzdHJpbmcsIGNvbG9yOiBDb2xvciB8ICdub25lJywgdGV4dDogc3RyaW5nKTogVk5vZGUgPT4ge1xuICAgIHJldHVybiBoKFxuICAgICAgJ2J1dHRvbicsXG4gICAgICB7XG4gICAgICAgIGF0dHJzOiB7IHJhbms6IHJhbmssIGZpbGU6IGZpbGUsIHBpZWNlOiBsZXR0ZXIudG9Mb3dlckNhc2UoKSwgY29sb3I6IGNvbG9yIH0sXG4gICAgICB9LFxuICAgICAgdGV4dFxuICAgICk7XG4gIH07XG4gIGNvbnN0IGRvUGllY2UgPSAocmFuazogUmFuaywgZmlsZTogRmlsZSk6IFZOb2RlID0+IHtcbiAgICBjb25zdCBrZXkgPSAoZmlsZSArIHJhbmspIGFzIEtleTtcbiAgICBjb25zdCBwaWVjZSA9IHBpZWNlcy5nZXQoa2V5KTtcbiAgICBjb25zdCBwaWVjZVdyYXBwZXIgPSBib2FyZFN0eWxlID09PSAndGFibGUnID8gJ3RkJyA6ICdzcGFuJztcbiAgICBpZiAocGllY2UpIHtcbiAgICAgIGNvbnN0IHJvbGUgPSBsZXR0ZXJzW3BpZWNlLnJvbGVdO1xuICAgICAgY29uc3QgcGllY2VUZXh0ID0gcmVuZGVyUGllY2VTdHlsZShwaWVjZS5jb2xvciA9PT0gJ3doaXRlJyA/IHJvbGUudG9VcHBlckNhc2UoKSA6IHJvbGUsIHBpZWNlU3R5bGUpO1xuICAgICAgY29uc3QgcHJlZml4ID0gcmVuZGVyUHJlZml4U3R5bGUocGllY2UuY29sb3IsIHByZWZpeFN0eWxlKTtcbiAgICAgIGNvbnN0IHRleHQgPSByZW5kZXJQb3NpdGlvblN0eWxlKHJhbmssIGZpbGUsIHByZWZpeCArIHBpZWNlVGV4dCk7XG4gICAgICByZXR1cm4gaChwaWVjZVdyYXBwZXIsIGRvUGllY2VCdXR0b24ocmFuaywgZmlsZSwgcm9sZSwgcGllY2UuY29sb3IsIHRleHQpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbGV0dGVyID0gKGtleS5jaGFyQ29kZUF0KDApICsga2V5LmNoYXJDb2RlQXQoMSkpICUgMiA/ICctJyA6ICcrJztcbiAgICAgIGNvbnN0IHRleHQgPSByZW5kZXJQb3NpdGlvblN0eWxlKHJhbmssIGZpbGUsIGxldHRlcik7XG4gICAgICByZXR1cm4gaChwaWVjZVdyYXBwZXIsIGRvUGllY2VCdXR0b24ocmFuaywgZmlsZSwgbGV0dGVyLCAnbm9uZScsIHRleHQpKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGRvUmFuayA9IChwb3Y6IENvbG9yLCByYW5rOiBSYW5rKTogVk5vZGUgPT4ge1xuICAgIGNvbnN0IHJhbmtFbGVtZW50cyA9IFtdO1xuICAgIGlmIChib2FyZFN0eWxlID09PSAndGFibGUnKSByYW5rRWxlbWVudHMucHVzaChkb1JhbmtIZWFkZXIocmFuaykpO1xuICAgIHJhbmtFbGVtZW50cy5wdXNoKC4uLmZpbGVzLm1hcChmaWxlID0+IGRvUGllY2UocmFuaywgZmlsZSkpKTtcbiAgICBpZiAoYm9hcmRTdHlsZSA9PT0gJ3RhYmxlJykgcmFua0VsZW1lbnRzLnB1c2goZG9SYW5rSGVhZGVyKHJhbmspKTtcbiAgICBpZiAocG92ID09PSAnYmxhY2snKSByYW5rRWxlbWVudHMucmV2ZXJzZSgpO1xuICAgIHJldHVybiBoKGJvYXJkU3R5bGUgPT09ICd0YWJsZScgPyAndHInIDogJ2RpdicsIHJhbmtFbGVtZW50cyk7XG4gIH07XG4gIGNvbnN0IHJhbmtzOiBWTm9kZVtdID0gW107XG4gIGlmIChib2FyZFN0eWxlID09PSAndGFibGUnKSByYW5rcy5wdXNoKGRvRmlsZUhlYWRlcnMoKSk7XG4gIHJhbmtzLnB1c2goLi4uaW52UmFua3MubWFwKHJhbmsgPT4gZG9SYW5rKHBvdiwgcmFuaykpKTtcbiAgaWYgKGJvYXJkU3R5bGUgPT09ICd0YWJsZScpIHJhbmtzLnB1c2goZG9GaWxlSGVhZGVycygpKTtcbiAgaWYgKHBvdiA9PT0gJ2JsYWNrJykgcmFua3MucmV2ZXJzZSgpO1xuICByZXR1cm4gaChib2FyZFN0eWxlID09PSAndGFibGUnID8gJ3RhYmxlLmJvYXJkLXdyYXBwZXInIDogJ2Rpdi5ib2FyZC13cmFwcGVyJywgcmFua3MpO1xufVxuXG5leHBvcnQgY29uc3QgcmVuZGVyRmlsZSA9IChmOiBzdHJpbmcsIHN0eWxlOiBTdHlsZSk6IHN0cmluZyA9PlxuICBzdHlsZSA9PT0gJ25hdG8nID8gbmF0b1tmXSA6IHN0eWxlID09PSAnYW5uYScgPyBhbm5hW2ZdIDogZjtcblxuZXhwb3J0IGNvbnN0IHJlbmRlcktleSA9IChrZXk6IHN0cmluZywgc3R5bGU6IFN0eWxlKTogc3RyaW5nID0+XG4gIHN0eWxlID09PSAnbmF0bycgfHwgc3R5bGUgPT09ICdhbm5hJyA/IGAke3JlbmRlckZpbGUoa2V5WzBdLCBzdHlsZSl9ICR7a2V5WzFdfWAgOiBgJHtrZXlbMF19JHtrZXlbMV19YDtcblxuZXhwb3J0IGZ1bmN0aW9uIGNhc3RsaW5nRmxhdm91cnMoaW5wdXQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIHN3aXRjaCAoaW5wdXQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bLVxcc10rL2csICcnKSkge1xuICAgIGNhc2UgJ29vJzpcbiAgICBjYXNlICcwMCc6XG4gICAgICByZXR1cm4gJ28tbyc7XG4gICAgY2FzZSAnb29vJzpcbiAgICBjYXNlICcwMDAnOlxuICAgICAgcmV0dXJuICdvLW8tbyc7XG4gIH1cbiAgcmV0dXJuIGlucHV0O1xufVxuXG4vKiBMaXN0ZW4gdG8gaW50ZXJhY3Rpb25zIG9uIHRoZSBjaGVzc2JvYXJkICovXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb25KdW1wSGFuZGxlcigpIHtcbiAgcmV0dXJuIChldjogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIGNvbnN0ICRidG4gPSAkKGV2LnRhcmdldCBhcyBIVE1MRWxlbWVudCk7XG4gICAgY29uc3QgJGZpbGUgPSAkYnRuLmF0dHIoJ2ZpbGUnKSA/PyAnJztcbiAgICBjb25zdCAkcmFuayA9ICRidG4uYXR0cigncmFuaycpID8/ICcnO1xuICAgIGxldCAkbmV3UmFuayA9ICcnO1xuICAgIGxldCAkbmV3RmlsZSA9ICcnO1xuICAgIGlmIChldi5rZXkubWF0Y2goL15bMS04XSQvKSkge1xuICAgICAgJG5ld1JhbmsgPSBldi5rZXk7XG4gICAgICAkbmV3RmlsZSA9ICRmaWxlO1xuICAgIH0gZWxzZSBpZiAoZXYua2V5Lm1hdGNoKC9eWyFAIyQlXiYqXSQvKSkge1xuICAgICAgJG5ld1JhbmsgPSAkcmFuaztcbiAgICAgICRuZXdGaWxlID0gc3ltYm9sVG9GaWxlKGV2LmtleSk7XG4gICAgICAvLyBpZiBub3QgYSB2YWxpZCBrZXkgZm9yIGp1bXBpbmdcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0IG5ld0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAnLmJvYXJkLXdyYXBwZXIgYnV0dG9uW3Jhbms9XCInICsgJG5ld1JhbmsgKyAnXCJdW2ZpbGU9XCInICsgJG5ld0ZpbGUgKyAnXCJdJ1xuICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgaWYgKG5ld0J0bikge1xuICAgICAgbmV3QnRuLmZvY3VzKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGllY2VKdW1waW5nSGFuZGxlcih3cmFwU291bmQ6ICgpID0+IHZvaWQsIGVycm9yU291bmQ6ICgpID0+IHZvaWQpIHtcbiAgcmV0dXJuIChldjogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgIGlmICghZXYua2V5Lm1hdGNoKC9eW2txcmJucF0kL2kpKSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCAkY3VyckJ0biA9ICQoZXYudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcblxuICAgIC8vIFRPRE86IGRlY291cGxlIGZyb20gcHJvbW90aW9uIGF0dHJpYnV0ZSBzZXR0aW5nIGluIHNlbGVjdGlvbkhhbmRsZXJcbiAgICBpZiAoJGN1cnJCdG4uYXR0cigncHJvbW90aW9uJykgPT09ICd0cnVlJykge1xuICAgICAgY29uc3QgJG1vdmVCb3ggPSAkKCdpbnB1dC5tb3ZlJyk7XG4gICAgICBjb25zdCAkYm9hcmRMaXZlID0gJCgnLmJvYXJkc3RhdHVzJyk7XG4gICAgICBjb25zdCAkcHJvbW90aW9uUGllY2UgPSBldi5rZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0ICRmb3JtID0gJG1vdmVCb3gucGFyZW50KCkucGFyZW50KCk7XG4gICAgICBpZiAoISRwcm9tb3Rpb25QaWVjZS5tYXRjaCgvXltxbnJiXSQvKSkge1xuICAgICAgICAkYm9hcmRMaXZlLnRleHQoJ0ludmFsaWQgcHJvbW90aW9uIHBpZWNlLiBxIGZvciBxdWVlbiwgbiBmb3Iga25pZ2h0LCByIGZvciByb29rLCBiIGZvciBiaXNob3AnKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgJG1vdmVCb3gudmFsKCRtb3ZlQm94LnZhbCgpICsgJHByb21vdGlvblBpZWNlKTtcbiAgICAgICRjdXJyQnRuLnJlbW92ZUF0dHIoJ3Byb21vdGlvbicpO1xuICAgICAgY29uc3QgJHNlbmRGb3JtID0gbmV3IEV2ZW50KCdzdWJtaXQnLCB7XG4gICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICB9KTtcbiAgICAgICRmb3JtLnRyaWdnZXIoJHNlbmRGb3JtKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCAkbXlCdG5BdHRycyA9ICcuYm9hcmQtd3JhcHBlciBbcmFuaz1cIicgKyAkY3VyckJ0bi5hdHRyKCdyYW5rJykgKyAnXCJdW2ZpbGU9XCInICsgJGN1cnJCdG4uYXR0cignZmlsZScpICsgJ1wiXSc7XG4gICAgY29uc3QgJGFsbFBpZWNlcyA9ICQoJy5ib2FyZC13cmFwcGVyIFtwaWVjZT1cIicgKyBldi5rZXkudG9Mb3dlckNhc2UoKSArICdcIl0sICcgKyAkbXlCdG5BdHRycyk7XG4gICAgY29uc3QgJG15UGllY2VJbmRleCA9ICRhbGxQaWVjZXMuaW5kZXgoJG15QnRuQXR0cnMpO1xuICAgIGNvbnN0ICRuZXh0ID0gZXYua2V5LnRvTG93ZXJDYXNlKCkgPT09IGV2LmtleTtcbiAgICBjb25zdCAkcHJldk5leHRQaWVjZXMgPSAkbmV4dCA/ICRhbGxQaWVjZXMuc2xpY2UoJG15UGllY2VJbmRleCArIDEpIDogJGFsbFBpZWNlcy5zbGljZSgwLCAkbXlQaWVjZUluZGV4KTtcbiAgICBjb25zdCAkcGllY2UgPSAkbmV4dCA/ICRwcmV2TmV4dFBpZWNlcy5nZXQoMCkgOiAkcHJldk5leHRQaWVjZXMuZ2V0KCRwcmV2TmV4dFBpZWNlcy5sZW5ndGggLSAxKTtcbiAgICBpZiAoJHBpZWNlKSB7XG4gICAgICAkcGllY2UuZm9jdXMoKTtcbiAgICAgIC8vIGlmIGRldGVjdGVkIGFueSBtYXRjaGluZyBwaWVjZTsgb25lIGlzIHRoZSBwaWNlIGJlaW5nIGNsaWNrZWQgb24sXG4gICAgfSBlbHNlIGlmICgkYWxsUGllY2VzLmxlbmd0aCA+PSAyKSB7XG4gICAgICBjb25zdCAkd3JhcFBpZWNlID0gJG5leHQgPyAkYWxsUGllY2VzLmdldCgwKSA6ICRhbGxQaWVjZXMuZ2V0KCRhbGxQaWVjZXMubGVuZ3RoIC0gMSk7XG4gICAgICAkd3JhcFBpZWNlPy5mb2N1cygpO1xuICAgICAgd3JhcFNvdW5kKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9yU291bmQoKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXJyb3dLZXlIYW5kbGVyKHBvdjogQ29sb3IsIGJvcmRlclNvdW5kOiAoKSA9PiB2b2lkKSB7XG4gIHJldHVybiAoZXY6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICBjb25zdCAkY3VyckJ0biA9ICQoZXYudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgICBjb25zdCAkaXNXaGl0ZSA9IHBvdiA9PT0gJ3doaXRlJztcbiAgICBsZXQgJGZpbGUgPSAkY3VyckJ0bi5hdHRyKCdmaWxlJykgPz8gJyAnO1xuICAgIGxldCAkcmFuayA9IE51bWJlcigkY3VyckJ0bi5hdHRyKCdyYW5rJykpO1xuICAgIGlmIChldi5rZXkgPT09ICdBcnJvd1VwJykge1xuICAgICAgJHJhbmsgPSAkaXNXaGl0ZSA/ICgkcmFuayArPSAxKSA6ICgkcmFuayAtPSAxKTtcbiAgICB9IGVsc2UgaWYgKGV2LmtleSA9PT0gJ0Fycm93RG93bicpIHtcbiAgICAgICRyYW5rID0gJGlzV2hpdGUgPyAoJHJhbmsgLT0gMSkgOiAoJHJhbmsgKz0gMSk7XG4gICAgfSBlbHNlIGlmIChldi5rZXkgPT09ICdBcnJvd0xlZnQnKSB7XG4gICAgICAkZmlsZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoJGlzV2hpdGUgPyAkZmlsZS5jaGFyQ29kZUF0KDApIC0gMSA6ICRmaWxlLmNoYXJDb2RlQXQoMCkgKyAxKTtcbiAgICB9IGVsc2UgaWYgKGV2LmtleSA9PT0gJ0Fycm93UmlnaHQnKSB7XG4gICAgICAkZmlsZSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoJGlzV2hpdGUgPyAkZmlsZS5jaGFyQ29kZUF0KDApICsgMSA6ICRmaWxlLmNoYXJDb2RlQXQoMCkgLSAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGNvbnN0ICRuZXdTcSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib2FyZC13cmFwcGVyIFtmaWxlPVwiJyArICRmaWxlICsgJ1wiXVtyYW5rPVwiJyArICRyYW5rICsgJ1wiXScpIGFzIEhUTUxFbGVtZW50O1xuICAgIGlmICgkbmV3U3EpIHtcbiAgICAgICRuZXdTcS5mb2N1cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3JkZXJTb3VuZCgpO1xuICAgIH1cbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlbGVjdGlvbkhhbmRsZXIoZ2V0T3Bwb25lbnRDb2xvcjogKCkgPT4gQ29sb3IsIHNlbGVjdFNvdW5kOiAoKSA9PiB2b2lkKSB7XG4gIHJldHVybiAoZXY6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBjb25zdCBvcHBvbmVudENvbG9yID0gZ2V0T3Bwb25lbnRDb2xvcigpO1xuICAgIC8vIHRoaXMgZGVwZW5kcyBvbiB0aGUgY3VycmVudCBkb2N1bWVudCBzdHJ1Y3R1cmUuIFRoaXMgbWF5IG5vdCBiZSBhZHZpc2FibGUgaW4gY2FzZSB0aGUgc3RydWN0dXJlIHdpbCBjaGFuZ2UuXG4gICAgY29uc3QgJGV2QnRuID0gJChldi50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgIGNvbnN0ICRyYW5rID0gJGV2QnRuLmF0dHIoJ3JhbmsnKTtcbiAgICBjb25zdCAkcG9zID0gKCRldkJ0bi5hdHRyKCdmaWxlJykgPz8gJycpICsgJHJhbms7XG4gICAgY29uc3QgJGJvYXJkTGl2ZSA9ICQoJy5ib2FyZHN0YXR1cycpO1xuICAgIGNvbnN0ICRwcm9tb3Rpb25SYW5rID0gb3Bwb25lbnRDb2xvciA9PT0gJ2JsYWNrJyA/ICc4JyA6ICcxJztcbiAgICBjb25zdCAkbW92ZUJveCA9ICQoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQubW92ZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQpO1xuICAgIGlmICghJG1vdmVCb3gpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIGlmIG5vIG1vdmUgaW4gYm94IHlldFxuICAgIGlmICgkbW92ZUJveC52YWwoKSA9PT0gJycpIHtcbiAgICAgIC8vIGlmIHVzZXIgc2VsZWN0cyBhbm90aGVycycgcGllY2UgZmlyc3RcbiAgICAgIGlmICgkZXZCdG4uYXR0cignY29sb3InKSA9PT0gb3Bwb25lbnRDb2xvcikgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gYXMgbG9uZyBhcyB0aGUgdXNlciBpcyBzZWxlY3RpbmcgYSBwaWVjZSBhbmQgbm90IGEgYmxhbmsgdGlsZVxuICAgICAgaWYgKCRldkJ0bi50ZXh0KCkubWF0Y2goL15bXlxcLStdKy9nKSkge1xuICAgICAgICAkbW92ZUJveC52YWwoJHBvcyk7XG4gICAgICAgIHNlbGVjdFNvdW5kKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIHVzZXIgc2VsZWN0cyB0aGVpciBvd24gcGllY2Ugc2Vjb25kXG4gICAgICBpZiAoJGV2QnRuLmF0dHIoJ2NvbG9yJykgPT09IChvcHBvbmVudENvbG9yID09PSAnYmxhY2snID8gJ3doaXRlJyA6ICdibGFjaycpKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGNvbnN0ICRmaXJzdCA9ICRtb3ZlQm94LnZhbCgpO1xuICAgICAgY29uc3QgJGZpcnN0UGllY2UgPSAkKCcuYm9hcmQtd3JhcHBlciBbZmlsZT1cIicgKyAkZmlyc3RbMF0gKyAnXCJdW3Jhbms9XCInICsgJGZpcnN0WzFdICsgJ1wiXScpO1xuICAgICAgJG1vdmVCb3gudmFsKCRtb3ZlQm94LnZhbCgpICsgJHBvcyk7XG4gICAgICAvLyB0aGlzIGlzIGNvdXBsZWQgdG8gcGllY2VKdW1waW5nSGFuZGxlcigpIG5vdGljaW5nIHRoYXQgdGhlIGF0dHJpYnV0ZSBpcyBzZXQgYW5kIGFjdGluZyBkaWZmZXJlbnRseS4gVE9ETzogbWFrZSBjbGVhbmVyXG4gICAgICAvLyBpZiBwYXduIHByb21vdGlvblxuICAgICAgaWYgKCRyYW5rID09PSAkcHJvbW90aW9uUmFuayAmJiAkZmlyc3RQaWVjZS5hdHRyKCdwaWVjZScpPy50b0xvd2VyQ2FzZSgpID09PSAncCcpIHtcbiAgICAgICAgJGV2QnRuLmF0dHIoJ3Byb21vdGlvbicsICd0cnVlJyk7XG4gICAgICAgICRib2FyZExpdmUudGV4dCgnUHJvbW90ZSB0bz8gcSBmb3IgcXVlZW4sIG4gZm9yIGtuaWdodCwgciBmb3Igcm9vaywgYiBmb3IgYmlzaG9wJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIHRoaXMgc2VjdGlvbiBkZXBlbmRzIG9uIHRoZSBmb3JtIGJlaW5nIHRoZSBncmFuZHBhcmVudCBvZiB0aGUgaW5wdXQubW92ZSBib3guXG4gICAgICBjb25zdCAkZm9ybSA9ICRtb3ZlQm94LnBhcmVudCgpLnBhcmVudCgpO1xuICAgICAgY29uc3QgJGV2ZW50ID0gbmV3IEV2ZW50KCdzdWJtaXQnLCB7XG4gICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICB9KTtcbiAgICAgICRmb3JtLnRyaWdnZXIoJGV2ZW50KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm9hcmRDb21tYW5kc0hhbmRsZXIoKSB7XG4gIHJldHVybiAoZXY6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICBjb25zdCAkY3VyckJ0biA9ICQoZXYudGFyZ2V0IGFzIEhUTUxFbGVtZW50KTtcbiAgICBjb25zdCAkYm9hcmRMaXZlID0gJCgnLmJvYXJkc3RhdHVzJyk7XG4gICAgY29uc3QgJHBvc2l0aW9uID0gKCRjdXJyQnRuLmF0dHIoJ2ZpbGUnKSA/PyAnJykgKyAoJGN1cnJCdG4uYXR0cigncmFuaycpID8/ICcnKTtcbiAgICBpZiAoZXYua2V5ID09PSAnbycpIHtcbiAgICAgICRib2FyZExpdmUudGV4dCgpO1xuICAgICAgJGJvYXJkTGl2ZS50ZXh0KCRwb3NpdGlvbik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChldi5rZXkgPT09ICdsJykge1xuICAgICAgY29uc3QgJGxhc3RNb3ZlID0gJCgncC5sYXN0TW92ZScpLnRleHQoKTtcbiAgICAgICRib2FyZExpdmUudGV4dCgpO1xuICAgICAgJGJvYXJkTGl2ZS50ZXh0KCRsYXN0TW92ZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChldi5rZXkgPT09ICd0Jykge1xuICAgICAgJGJvYXJkTGl2ZS50ZXh0KCk7XG4gICAgICAkYm9hcmRMaXZlLnRleHQoJCgnLm52dWkgLmJvdGMnKS50ZXh0KCkgKyAnLCAnICsgJCgnLm52dWkgLnRvcGMnKS50ZXh0KCkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsYXN0Q2FwdHVyZWRDb21tYW5kSGFuZGxlcihzdGVwczogKCkgPT4gc3RyaW5nW10sIHBpZWNlU3R5bGU6IFBpZWNlU3R5bGUsIHByZWZpeFN0eWxlOiBQcmVmaXhTdHlsZSkge1xuICByZXR1cm4gKGV2OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgY29uc3QgJGJvYXJkTGl2ZSA9ICQoJy5ib2FyZHN0YXR1cycpO1xuICAgIGlmIChldi5rZXkgPT09ICdjJykge1xuICAgICAgJGJvYXJkTGl2ZS50ZXh0KCk7XG4gICAgICAkYm9hcmRMaXZlLnRleHQobGFzdENhcHR1cmVkKHN0ZXBzLCBwaWVjZVN0eWxlLCBwcmVmaXhTdHlsZSkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvc3NpYmxlTW92ZXNIYW5kbGVyKFxuICB5b3VyQ29sb3I6IENvbG9yLFxuICB0dXJuQ29sb3I6ICgpID0+IENvbG9yLFxuICBzdGFydGluZ0ZlbjogKCkgPT4gc3RyaW5nLFxuICBwaWVjZXNGdW5jOiAoKSA9PiBQaWVjZXMsXG4gIHZhcmlhbnQ6IHN0cmluZyxcbiAgbW92ZWFibGU6ICgpID0+IE1hcDxzdHJpbmcsIEFycmF5PHN0cmluZz4+IHwgdW5kZWZpbmVkLFxuICBzdGVwczogKCkgPT4gUm91bmRTdGVwW11cbikge1xuICByZXR1cm4gKGV2OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgaWYgKGV2LmtleSAhPT0gJ20nICYmIGV2LmtleSAhPT0gJ00nKSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCAkYm9hcmRMaXZlID0gJCgnLmJvYXJkc3RhdHVzJyk7XG4gICAgY29uc3QgcGllY2VzOiBQaWVjZXMgPSBwaWVjZXNGdW5jKCk7XG5cbiAgICBjb25zdCAkYnRuID0gJChldi50YXJnZXQgYXMgSFRNTEVsZW1lbnQpO1xuICAgIGNvbnN0IHBvcyA9ICgoJGJ0bi5hdHRyKCdmaWxlJykgPz8gJycpICsgJGJ0bi5hdHRyKCdyYW5rJykpIGFzIFNxdWFyZU5hbWU7XG4gICAgY29uc3QgcnVsZVRyYW5zbGF0aW9uOiB7IFt2YXJpOiBzdHJpbmddOiBudW1iZXIgfSA9IHtcbiAgICAgIHN0YW5kYXJkOiAwLFxuICAgICAgYW50aWNoZXNzOiAxLFxuICAgICAga2luZ09mVGhlSGlsbDogMixcbiAgICAgIHRocmVlQ2hlY2s6IDMsXG4gICAgICBhdG9taWM6IDQsXG4gICAgICBob3JkZTogNSxcbiAgICAgIHJhY2luZ0tpbmdzOiA2LFxuICAgICAgY3Jhenlob3VzZTogNyxcbiAgICB9O1xuICAgIGNvbnN0IHJ1bGVzOiBSdWxlcyA9IFJVTEVTW3J1bGVUcmFuc2xhdGlvblt2YXJpYW50XV07XG5cbiAgICBsZXQgcmF3TW92ZXM7XG5cbiAgICAvLyBwb3NzaWJsZSBpbmVmZmljaWVudCB0byByZXBhcnNlIGZlbjsgYnV0IHNlZW1zIHRvIHdvcmsgd2hlbiBpdCBpcyBBTkQgd2hlbiBpdCBpcyBub3QgdGhlIHVzZXJzJyB0dXJuLiBBbHNvIG5vdGUgdGhhdCB0aGlzIEZFTiBpcyBpbmNvbXBsZXRlIGFzIGl0IG9ubHkgY29udGFpbnMgdGhlIHBpZWNlIGluZm9ybWF0aW9uLlxuICAgIC8vIGlmIGl0IGlzIHlvdXIgdHVyblxuICAgIGlmICh0dXJuQ29sb3IoKSA9PT0geW91ckNvbG9yKSB7XG4gICAgICByYXdNb3ZlcyA9IG1vdmVhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZyb21TZXR1cCA9IHNldHVwUG9zaXRpb24ocnVsZXMsIHBhcnNlRmVuKHN0YXJ0aW5nRmVuKCkpLnVud3JhcCgpKS51bndyYXAoKTtcbiAgICAgIHN0ZXBzKCkuZm9yRWFjaChzID0+IHtcbiAgICAgICAgaWYgKHMudWNpKSB7XG4gICAgICAgICAgY29uc3QgbW92ZSA9IHBhcnNlVWNpKHMudWNpKTtcbiAgICAgICAgICBpZiAobW92ZSkgZnJvbVNldHVwLnBsYXkobW92ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gaW1wb3J0YW50IHRvIG92ZXJyaWRlIHdob3NlIHR1cm4gaXQgaXMgc28gb25seSB0aGUgdXNlcnMnIG93biB0dXJucyB3aWxsIHNob3cgdXBcbiAgICAgIGZyb21TZXR1cC50dXJuID0geW91ckNvbG9yO1xuICAgICAgcmF3TW92ZXMgPSBjaGVzc2dyb3VuZERlc3RzKGZyb21TZXR1cCk7XG4gICAgfVxuXG4gICAgY29uc3QgcG9zc2libGVNb3ZlcyA9IHJhd01vdmVzXG4gICAgICA/LmdldChwb3MpXG4gICAgICA/Lm1hcChpID0+IHtcbiAgICAgICAgY29uc3QgcCA9IHBpZWNlcy5nZXQoaSBhcyBLZXkpO1xuICAgICAgICAvLyBsb2dpYyB0byBwcmV2ZW50ICdjYXB0dXJlIHJvb2snIG9uIG93biBwaWVjZSBpbiBjaGVzczk2MFxuICAgICAgICByZXR1cm4gcCAmJiBwLmNvbG9yICE9PSB5b3VyQ29sb3IgPyBgJHtpfSBjYXB0dXJlcyAke3Aucm9sZX1gIDogaTtcbiAgICAgIH0pXG4gICAgICA/LmZpbHRlcihpID0+IGV2LmtleSA9PT0gJ20nIHx8IGkuaW5jbHVkZXMoJ2NhcHR1cmVzJykpO1xuICAgIGlmICghcG9zc2libGVNb3Zlcykge1xuICAgICAgJGJvYXJkTGl2ZS50ZXh0KCdOb25lJyk7XG4gICAgICAvLyBpZiBmaWx0ZXJzIG91dCBub24tY2FwdHVyaW5nIG1vdmVzXG4gICAgfSBlbHNlIGlmIChwb3NzaWJsZU1vdmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgJGJvYXJkTGl2ZS50ZXh0KCdObyBjYXB0dXJlcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkYm9hcmRMaXZlLnRleHQocG9zc2libGVNb3Zlcy5qb2luKCcsICcpKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xufVxuXG5jb25zdCBwcm9tb3Rpb25SZWdleCA9IC9eKFthLWhdeD8pP1thLWhdKDF8OCk9XFx3JC87XG5jb25zdCB1Y2lQcm9tb3Rpb25SZWdleCA9IC9eKFthLWhdWzEtOF0pKFthLWhdKDF8OCkpW3FyYm5dJC87XG5cbmZ1bmN0aW9uIGRlc3RzVG9VY2lzKGRlc3RzOiBEZXN0cykge1xuICBjb25zdCB1Y2lzOiBzdHJpbmdbXSA9IFtdO1xuICBmb3IgKGNvbnN0IFtvcmlnLCBkXSBvZiBkZXN0cykge1xuICAgIGlmIChkKVxuICAgICAgZC5mb3JFYWNoKGZ1bmN0aW9uIChkZXN0KSB7XG4gICAgICAgIHVjaXMucHVzaChvcmlnICsgZGVzdCk7XG4gICAgICB9KTtcbiAgfVxuICByZXR1cm4gdWNpcztcbn1cblxuZnVuY3Rpb24gc2FuVG9VY2koc2FuOiBzdHJpbmcsIGxlZ2FsU2FuczogU2FuVG9VY2kpOiBVY2kgfCB1bmRlZmluZWQge1xuICBpZiAoc2FuIGluIGxlZ2FsU2FucykgcmV0dXJuIGxlZ2FsU2Fuc1tzYW5dO1xuICBjb25zdCBsb3dlcmVkID0gc2FuLnRvTG93ZXJDYXNlKCk7XG4gIGZvciAoY29uc3QgaSBpbiBsZWdhbFNhbnMpIGlmIChpLnRvTG93ZXJDYXNlKCkgPT09IGxvd2VyZWQpIHJldHVybiBsZWdhbFNhbnNbaV07XG4gIHJldHVybjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlucHV0VG9MZWdhbFVjaShpbnB1dDogc3RyaW5nLCBmZW46IHN0cmluZywgY2hlc3Nncm91bmQ6IEFwaSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IGxlZ2FsVWNpcyA9IGRlc3RzVG9VY2lzKGNoZXNzZ3JvdW5kLnN0YXRlLm1vdmFibGUuZGVzdHMhKSxcbiAgICBsZWdhbFNhbnMgPSBzYW5Xcml0ZXIoZmVuLCBsZWdhbFVjaXMpO1xuICBsZXQgdWNpID0gc2FuVG9VY2koaW5wdXQsIGxlZ2FsU2FucykgfHwgaW5wdXQsXG4gICAgcHJvbW90aW9uID0gJyc7XG5cbiAgaWYgKGlucHV0Lm1hdGNoKHByb21vdGlvblJlZ2V4KSkge1xuICAgIHVjaSA9IHNhblRvVWNpKGlucHV0LnNsaWNlKDAsIC0yKSwgbGVnYWxTYW5zKSB8fCBpbnB1dDtcbiAgICBwcm9tb3Rpb24gPSBpbnB1dC5zbGljZSgtMSkudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmIChpbnB1dC5tYXRjaCh1Y2lQcm9tb3Rpb25SZWdleCkpIHtcbiAgICB1Y2kgPSBpbnB1dC5zbGljZSgwLCAtMSk7XG4gICAgcHJvbW90aW9uID0gaW5wdXQuc2xpY2UoLTEpLnRvTG93ZXJDYXNlKCk7XG4gIH0gZWxzZSBpZiAoJzE4Jy5pbmNsdWRlcyh1Y2lbM10pICYmIGNoZXNzZ3JvdW5kLnN0YXRlLnBpZWNlcy5nZXQodWNpLnNsaWNlKDAsIDIpIGFzIEtleSk/LnJvbGUgPT0gJ3Bhd24nKVxuICAgIHByb21vdGlvbiA9ICdxJztcblxuICBpZiAobGVnYWxVY2lzLmluY2x1ZGVzKHVjaS50b0xvd2VyQ2FzZSgpKSkgcmV0dXJuIHVjaSArIHByb21vdGlvbjtcbiAgZWxzZSByZXR1cm47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJNYWlubGluZShub2RlczogVHJlZS5Ob2RlW10sIGN1cnJlbnRQYXRoOiBUcmVlLlBhdGgsIHN0eWxlOiBTdHlsZSkge1xuICBjb25zdCByZXM6IEFycmF5PHN0cmluZyB8IFZOb2RlPiA9IFtdO1xuICBsZXQgcGF0aDogVHJlZS5QYXRoID0gJyc7XG4gIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgaWYgKCFub2RlLnNhbiB8fCAhbm9kZS51Y2kpIHJldHVybjtcbiAgICBwYXRoICs9IG5vZGUuaWQ7XG4gICAgY29uc3QgY29udGVudDogVk5vZGVDaGlsZHJlbiA9IFtcbiAgICAgIG5vZGUucGx5ICYgMSA/IHBseVRvVHVybihub2RlLnBseSkgKyAnICcgOiBudWxsLFxuICAgICAgcmVuZGVyU2FuKG5vZGUuc2FuLCBub2RlLnVjaSwgc3R5bGUpLFxuICAgIF07XG4gICAgcmVzLnB1c2goXG4gICAgICBoKFxuICAgICAgICAnbW92ZScsXG4gICAgICAgIHtcbiAgICAgICAgICBhdHRyczogeyBwOiBwYXRoIH0sXG4gICAgICAgICAgY2xhc3M6IHsgYWN0aXZlOiBwYXRoID09PSBjdXJyZW50UGF0aCB9LFxuICAgICAgICB9LFxuICAgICAgICBjb250ZW50XG4gICAgICApXG4gICAgKTtcbiAgICByZXMucHVzaChyZW5kZXJDb21tZW50cyhub2RlLCBzdHlsZSkpO1xuICAgIHJlcy5wdXNoKCcsICcpO1xuICAgIGlmIChub2RlLnBseSAlIDIgPT09IDApIHJlcy5wdXNoKGgoJ2JyJykpO1xuICB9KTtcbiAgcmV0dXJuIHJlcztcbn1cblxuY29uc3QgcGx5VG9UdXJuID0gKHBseTogUGx5KTogbnVtYmVyID0+IE1hdGguZmxvb3IoKHBseSAtIDEpIC8gMikgKyAxO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyQ29tbWVudHMobm9kZTogVHJlZS5Ob2RlLCBzdHlsZTogU3R5bGUpOiBzdHJpbmcge1xuICBpZiAoIW5vZGUuY29tbWVudHMpIHJldHVybiAnJztcbiAgcmV0dXJuIChub2RlLmNvbW1lbnRzIHx8IFtdKS5tYXAoYyA9PiByZW5kZXJDb21tZW50KGMsIHN0eWxlKSkuam9pbignLiAnKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ29tbWVudChjb21tZW50OiBUcmVlLkNvbW1lbnQsIHN0eWxlOiBTdHlsZSk6IHN0cmluZyB7XG4gIHJldHVybiBjb21tZW50LmJ5ID09PSAnbGljaGVzcydcbiAgICA/IGNvbW1lbnQudGV4dC5yZXBsYWNlKC9CZXN0IG1vdmUgd2FzICguKylcXC4vLCAoXywgc2FuKSA9PiAnQmVzdCBtb3ZlIHdhcyAnICsgcmVuZGVyU2FuKHNhbiwgdW5kZWZpbmVkLCBzdHlsZSkpXG4gICAgOiBjb21tZW50LnRleHQ7XG59XG4iXX0=