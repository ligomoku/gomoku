import * as status from './status';
export * from './interfaces';
export const playable = (data) => data.game.status.id < status.ids.aborted && !imported(data);
export const isPlayerPlaying = (data) => playable(data) && !data.player.spectator;
export const isPlayerTurn = (data) => isPlayerPlaying(data) && data.game.player == data.player.color;
export const mandatory = (data) => !!data.tournament || !!data.simul || !!data.swiss;
export const playedTurns = (data) => data.game.turns - (data.game.startedAtTurn || 0);
export const bothPlayersHavePlayed = (data) => playedTurns(data) > 1;
export const abortable = (data) => { var _a; return playable(data) && !bothPlayersHavePlayed(data) && !mandatory(data) && !((_a = data.game.rules) === null || _a === void 0 ? void 0 : _a.includes('noAbort')); };
export const rematchable = (data) => { var _a; return !((_a = data.game.rules) === null || _a === void 0 ? void 0 : _a.includes('noRematch')); };
export const takebackable = (data) => playable(data) &&
    data.takebackable &&
    bothPlayersHavePlayed(data) &&
    !data.player.proposingTakeback &&
    !data.opponent.proposingTakeback;
export const drawable = (data) => playable(data) &&
    data.game.turns >= 2 &&
    !data.player.offeringDraw &&
    !hasAi(data) &&
    (!data.swiss || playedTurns(data) >= 60);
export const resignable = (data) => playable(data) && !abortable(data);
// can the current player go berserk?
export const berserkableBy = (data) => !!data.tournament && data.tournament.berserkable && isPlayerPlaying(data) && !bothPlayersHavePlayed(data);
export const moretimeable = (data) => isPlayerPlaying(data) &&
    data.moretimeable &&
    (!!data.clock ||
        (!!data.correspondence && data.correspondence[data.opponent.color] < data.correspondence.increment - 3600));
const imported = (data) => data.game.source === 'import';
export const replayable = (data) => imported(data) || status.finished(data) || (status.aborted(data) && bothPlayersHavePlayed(data));
export function getPlayer(data, color) {
    if (data.player.color === color)
        return data.player;
    if (data.opponent.color === color)
        return data.opponent;
    return null;
}
export const hasAi = (data) => !!(data.player.ai || data.opponent.ai);
export const userAnalysable = (data) => status.finished(data) || (playable(data) && (!data.clock || !isPlayerPlaying(data)));
export const isCorrespondence = (data) => data.game.speed === 'correspondence';
export const setOnGame = (data, color, onGame) => {
    const player = getPlayer(data, color);
    onGame = onGame || !!player.ai;
    player.onGame = onGame;
    if (onGame)
        setGone(data, color, false);
};
export const setGone = (data, color, gone) => {
    const player = getPlayer(data, color);
    player.gone = !player.ai && gone;
    if (player.gone === false && player.user)
        player.user.online = true;
};
export const nbMoves = (data, color) => Math.floor((playedTurns(data) + (color == 'white' ? 1 : 0)) / 2);
export const isSwitchable = (data) => !hasAi(data) && (!!data.simul || isCorrespondence(data));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9nYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sS0FBSyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBRW5DLGNBQWMsY0FBYyxDQUFDO0FBRTdCLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQWMsRUFBVyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWpILE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxDQUFDLElBQWMsRUFBVyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFFckcsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBYyxFQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7QUFFeEgsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBYyxFQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUV4RyxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFjLEVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDLENBQUM7QUFFeEcsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxJQUFjLEVBQVcsRUFB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QU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQWMsRUFBRSxLQUFZLEVBQUUsSUFBc0IsRUFBUSxFQUFFO0lBQ3BGLE1BQU0sTUFBTSxHQUFHLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEMsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDO0lBQ2pDLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksTUFBTSxDQUFDLElBQUk7UUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDdEUsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBYyxFQUFFLEtBQVksRUFBVSxFQUFFLENBQzlELElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFFbkUsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBYyxFQUFXLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lRGF0YSwgUGxheWVyIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCAqIGFzIHN0YXR1cyBmcm9tICcuL3N0YXR1cyc7XG5cbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBjb25zdCBwbGF5YWJsZSA9IChkYXRhOiBHYW1lRGF0YSk6IGJvb2xlYW4gPT4gZGF0YS5nYW1lLnN0YXR1cy5pZCA8IHN0YXR1cy5pZHMuYWJvcnRlZCAmJiAhaW1wb3J0ZWQoZGF0YSk7XG5cbmV4cG9ydCBjb25zdCBpc1BsYXllclBsYXlpbmcgPSAoZGF0YTogR2FtZURhdGEpOiBib29sZWFuID0+IHBsYXlhYmxlKGRhdGEpICYmICFkYXRhLnBsYXllci5zcGVjdGF0b3I7XG5cbmV4cG9ydCBjb25zdCBpc1BsYXllclR1cm4gPSAoZGF0YTogR2FtZURhdGEpOiBib29sZWFuID0+IGlzUGxheWVyUGxheWluZyhkYXRhKSAmJiBkYXRhLmdhbWUucGxheWVyID09IGRhdGEucGxheWVyLmNvbG9yO1xuXG5leHBvcnQgY29uc3QgbWFuZGF0b3J5ID0gKGRhdGE6IEdhbWVEYXRhKTogYm9vbGVhbiA9PiAhIWRhdGEudG91cm5hbWVudCB8fCAhIWRhdGEuc2ltdWwgfHwgISFkYXRhLnN3aXNzO1xuXG5leHBvcnQgY29uc3QgcGxheWVkVHVybnMgPSAoZGF0YTogR2FtZURhdGEpOiBudW1iZXIgPT4gZGF0YS5nYW1lLnR1cm5zIC0gKGRhdGEuZ2FtZS5zdGFydGVkQXRUdXJuIHx8IDApO1xuXG5leHBvcnQgY29uc3QgYm90aFBsYXllcnNIYXZlUGxheWVkID0gKGRhdGE6IEdhbWVEYXRhKTogYm9vbGVhbiA9PiBwbGF5ZWRUdXJucyhkYXRhKSA+IDE7XG5cbmV4cG9ydCBjb25zdCBhYm9ydGFibGUgPSAoZGF0YTogR2FtZURhdGEpOiBib29sZWFuID0+XG4gIHBsYXlhYmxlKGRhdGEpICYmICFib3RoUGxheWVyc0hhdmVQbGF5ZWQoZGF0YSkgJiYgIW1hbmRhdG9yeShkYXRhKSAmJiAhZGF0YS5nYW1lLnJ1bGVzPy5pbmNsdWRlcygnbm9BYm9ydCcpO1xuXG5leHBvcnQgY29uc3QgcmVtYXRjaGFibGUgPSAoZGF0YTogR2FtZURhdGEpOiBib29sZWFuID0+ICFkYXRhLmdhbWUucnVsZXM/LmluY2x1ZGVzKCdub1JlbWF0Y2gnKTtcblxuZXhwb3J0IGNvbnN0IHRha2ViYWNrYWJsZSA9IChkYXRhOiBHYW1lRGF0YSk6IGJvb2xlYW4gPT5cbiAgcGxheWFibGUoZGF0YSkgJiZcbiAgZGF0YS50YWtlYmFja2FibGUgJiZcbiAgYm90aFBsYXllcnNIYXZlUGxheWVkKGRhdGEpICYmXG4gICFkYXRhLnBsYXllci5wcm9wb3NpbmdUYWtlYmFjayAmJlxuICAhZGF0YS5vcHBvbmVudC5wcm9wb3NpbmdUYWtlYmFjaztcblxuZXhwb3J0IGNvbnN0IGRyYXdhYmxlID0gKGRhdGE6IEdhbWVEYXRhKTogYm9vbGVhbiA9PlxuICBwbGF5YWJsZShkYXRhKSAmJlxuICBkYXRhLmdhbWUudHVybnMgPj0gMiAmJlxuICAhZGF0YS5wbGF5ZXIub2ZmZXJpbmdEcmF3ICYmXG4gICFoYXNBaShkYXRhKSAmJlxuICAoIWRhdGEuc3dpc3MgfHwgcGxheWVkVHVybnMoZGF0YSkgPj0gNjApO1xuXG5leHBvcnQgY29uc3QgcmVzaWduYWJsZSA9IChkYXRhOiBHYW1lRGF0YSk6IGJvb2xlYW4gPT4gcGxheWFibGUoZGF0YSkgJiYgIWFib3J0YWJsZShkYXRhKTtcblxuLy8gY2FuIHRoZSBjdXJyZW50IHBsYXllciBnbyBiZXJzZXJrP1xuZXhwb3J0IGNvbnN0IGJlcnNlcmthYmxlQnkgPSAoZGF0YTogR2FtZURhdGEpOiBib29sZWFuID0+XG4gICEhZGF0YS50b3VybmFtZW50ICYmIGRhdGEudG91cm5hbWVudC5iZXJzZXJrYWJsZSAmJiBpc1BsYXllclBsYXlpbmcoZGF0YSkgJiYgIWJvdGhQbGF5ZXJzSGF2ZVBsYXllZChkYXRhKTtcblxuZXhwb3J0IGNvbnN0IG1vcmV0aW1lYWJsZSA9IChkYXRhOiBHYW1lRGF0YSk6IGJvb2xlYW4gPT5cbiAgaXNQbGF5ZXJQbGF5aW5nKGRhdGEpICYmXG4gIGRhdGEubW9yZXRpbWVhYmxlICYmXG4gICghIWRhdGEuY2xvY2sgfHxcbiAgICAoISFkYXRhLmNvcnJlc3BvbmRlbmNlICYmIGRhdGEuY29ycmVzcG9uZGVuY2VbZGF0YS5vcHBvbmVudC5jb2xvcl0gPCBkYXRhLmNvcnJlc3BvbmRlbmNlLmluY3JlbWVudCAtIDM2MDApKTtcblxuY29uc3QgaW1wb3J0ZWQgPSAoZGF0YTogR2FtZURhdGEpOiBib29sZWFuID0+IGRhdGEuZ2FtZS5zb3VyY2UgPT09ICdpbXBvcnQnO1xuXG5leHBvcnQgY29uc3QgcmVwbGF5YWJsZSA9IChkYXRhOiBHYW1lRGF0YSk6IGJvb2xlYW4gPT5cbiAgaW1wb3J0ZWQoZGF0YSkgfHwgc3RhdHVzLmZpbmlzaGVkKGRhdGEpIHx8IChzdGF0dXMuYWJvcnRlZChkYXRhKSAmJiBib3RoUGxheWVyc0hhdmVQbGF5ZWQoZGF0YSkpO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGxheWVyKGRhdGE6IEdhbWVEYXRhLCBjb2xvcjogQ29sb3IpOiBQbGF5ZXI7XG5leHBvcnQgZnVuY3Rpb24gZ2V0UGxheWVyKGRhdGE6IEdhbWVEYXRhLCBjb2xvcj86IENvbG9yKTogUGxheWVyIHwgbnVsbCB7XG4gIGlmIChkYXRhLnBsYXllci5jb2xvciA9PT0gY29sb3IpIHJldHVybiBkYXRhLnBsYXllcjtcbiAgaWYgKGRhdGEub3Bwb25lbnQuY29sb3IgPT09IGNvbG9yKSByZXR1cm4gZGF0YS5vcHBvbmVudDtcbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBjb25zdCBoYXNBaSA9IChkYXRhOiBHYW1lRGF0YSk6IGJvb2xlYW4gPT4gISEoZGF0YS5wbGF5ZXIuYWkgfHwgZGF0YS5vcHBvbmVudC5haSk7XG5cbmV4cG9ydCBjb25zdCB1c2VyQW5hbHlzYWJsZSA9IChkYXRhOiBHYW1lRGF0YSk6IGJvb2xlYW4gPT5cbiAgc3RhdHVzLmZpbmlzaGVkKGRhdGEpIHx8IChwbGF5YWJsZShkYXRhKSAmJiAoIWRhdGEuY2xvY2sgfHwgIWlzUGxheWVyUGxheWluZyhkYXRhKSkpO1xuXG5leHBvcnQgY29uc3QgaXNDb3JyZXNwb25kZW5jZSA9IChkYXRhOiBHYW1lRGF0YSk6IGJvb2xlYW4gPT4gZGF0YS5nYW1lLnNwZWVkID09PSAnY29ycmVzcG9uZGVuY2UnO1xuXG5leHBvcnQgY29uc3Qgc2V0T25HYW1lID0gKGRhdGE6IEdhbWVEYXRhLCBjb2xvcjogQ29sb3IsIG9uR2FtZTogYm9vbGVhbik6IHZvaWQgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBnZXRQbGF5ZXIoZGF0YSwgY29sb3IpO1xuICBvbkdhbWUgPSBvbkdhbWUgfHwgISFwbGF5ZXIuYWk7XG4gIHBsYXllci5vbkdhbWUgPSBvbkdhbWU7XG4gIGlmIChvbkdhbWUpIHNldEdvbmUoZGF0YSwgY29sb3IsIGZhbHNlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZXRHb25lID0gKGRhdGE6IEdhbWVEYXRhLCBjb2xvcjogQ29sb3IsIGdvbmU6IG51bWJlciB8IGJvb2xlYW4pOiB2b2lkID0+IHtcbiAgY29uc3QgcGxheWVyID0gZ2V0UGxheWVyKGRhdGEsIGNvbG9yKTtcbiAgcGxheWVyLmdvbmUgPSAhcGxheWVyLmFpICYmIGdvbmU7XG4gIGlmIChwbGF5ZXIuZ29uZSA9PT0gZmFsc2UgJiYgcGxheWVyLnVzZXIpIHBsYXllci51c2VyLm9ubGluZSA9IHRydWU7XG59O1xuXG5leHBvcnQgY29uc3QgbmJNb3ZlcyA9IChkYXRhOiBHYW1lRGF0YSwgY29sb3I6IENvbG9yKTogbnVtYmVyID0+XG4gIE1hdGguZmxvb3IoKHBsYXllZFR1cm5zKGRhdGEpICsgKGNvbG9yID09ICd3aGl0ZScgPyAxIDogMCkpIC8gMik7XG5cbmV4cG9ydCBjb25zdCBpc1N3aXRjaGFibGUgPSAoZGF0YTogR2FtZURhdGEpOiBib29sZWFuID0+ICFoYXNBaShkYXRhKSAmJiAoISFkYXRhLnNpbXVsIHx8IGlzQ29ycmVzcG9uZGVuY2UoZGF0YSkpO1xuIl19