const toPov = (color, diff) => (color === 'white' ? diff : -diff);
/**
 * https://github.com/lichess-org/lila/pull/11148
 */
const rawWinningChances = (cp) => {
    const MULTIPLIER = -0.00368208; // https://github.com/lichess-org/lila/pull/11148
    return 2 / (1 + Math.exp(MULTIPLIER * cp)) - 1;
};
const cpWinningChances = (cp) => rawWinningChances(Math.min(Math.max(-1000, cp), 1000));
const mateWinningChances = (mate) => {
    const cp = (21 - Math.min(10, Math.abs(mate))) * 100;
    const signed = cp * (mate > 0 ? 1 : -1);
    return rawWinningChances(signed);
};
const evalWinningChances = (ev) => typeof ev.mate !== 'undefined' ? mateWinningChances(ev.mate) : cpWinningChances(ev.cp);
// winning chances for a color
// 1  infinitely winning
// -1 infinitely losing
export const povChances = (color, ev) => toPov(color, evalWinningChances(ev));
// computes the difference, in winning chances, between two evaluations
// 1  = e1 is infinitely better than e2
// -1 = e1 is infinitely worse  than e2
export const povDiff = (color, e1, e2) => (povChances(color, e1) - povChances(color, e2)) / 2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lubmluZ0NoYW5jZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvd2lubmluZ0NoYW5jZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFZLEVBQUUsSUFBWSxFQUFVLEVBQUUsQ0FBQyxDQUFDLEtBQUssS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6Rjs7R0FFRztBQUNILE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxFQUFVLEVBQVUsRUFBRTtJQUMvQyxNQUFNLFVBQVUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGlEQUFpRDtJQUNqRixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUM7QUFFRixNQUFNLGdCQUFnQixHQUFHLENBQUMsRUFBVSxFQUFVLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUV4RyxNQUFNLGtCQUFrQixHQUFHLENBQUMsSUFBWSxFQUFVLEVBQUU7SUFDbEQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3JELE1BQU0sTUFBTSxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxPQUFPLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLENBQUMsQ0FBQztBQUVGLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxFQUFRLEVBQVUsRUFBRSxDQUM5QyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxFQUFHLENBQUMsQ0FBQztBQUUxRiw4QkFBOEI7QUFDOUIsd0JBQXdCO0FBQ3hCLHVCQUF1QjtBQUN2QixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBUSxFQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFbkcsdUVBQXVFO0FBQ3ZFLHVDQUF1QztBQUN2Qyx1Q0FBdUM7QUFDdkMsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBWSxFQUFFLEVBQVEsRUFBRSxFQUFRLEVBQVUsRUFBRSxDQUNsRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2YWwgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgdG9Qb3YgPSAoY29sb3I6IENvbG9yLCBkaWZmOiBudW1iZXIpOiBudW1iZXIgPT4gKGNvbG9yID09PSAnd2hpdGUnID8gZGlmZiA6IC1kaWZmKTtcblxuLyoqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbGljaGVzcy1vcmcvbGlsYS9wdWxsLzExMTQ4XG4gKi9cbmNvbnN0IHJhd1dpbm5pbmdDaGFuY2VzID0gKGNwOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBjb25zdCBNVUxUSVBMSUVSID0gLTAuMDAzNjgyMDg7IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9saWNoZXNzLW9yZy9saWxhL3B1bGwvMTExNDhcbiAgcmV0dXJuIDIgLyAoMSArIE1hdGguZXhwKE1VTFRJUExJRVIgKiBjcCkpIC0gMTtcbn07XG5cbmNvbnN0IGNwV2lubmluZ0NoYW5jZXMgPSAoY3A6IG51bWJlcik6IG51bWJlciA9PiByYXdXaW5uaW5nQ2hhbmNlcyhNYXRoLm1pbihNYXRoLm1heCgtMTAwMCwgY3ApLCAxMDAwKSk7XG5cbmNvbnN0IG1hdGVXaW5uaW5nQ2hhbmNlcyA9IChtYXRlOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBjb25zdCBjcCA9ICgyMSAtIE1hdGgubWluKDEwLCBNYXRoLmFicyhtYXRlKSkpICogMTAwO1xuICBjb25zdCBzaWduZWQgPSBjcCAqIChtYXRlID4gMCA/IDEgOiAtMSk7XG4gIHJldHVybiByYXdXaW5uaW5nQ2hhbmNlcyhzaWduZWQpO1xufTtcblxuY29uc3QgZXZhbFdpbm5pbmdDaGFuY2VzID0gKGV2OiBFdmFsKTogbnVtYmVyID0+XG4gIHR5cGVvZiBldi5tYXRlICE9PSAndW5kZWZpbmVkJyA/IG1hdGVXaW5uaW5nQ2hhbmNlcyhldi5tYXRlKSA6IGNwV2lubmluZ0NoYW5jZXMoZXYuY3AhKTtcblxuLy8gd2lubmluZyBjaGFuY2VzIGZvciBhIGNvbG9yXG4vLyAxICBpbmZpbml0ZWx5IHdpbm5pbmdcbi8vIC0xIGluZmluaXRlbHkgbG9zaW5nXG5leHBvcnQgY29uc3QgcG92Q2hhbmNlcyA9IChjb2xvcjogQ29sb3IsIGV2OiBFdmFsKTogbnVtYmVyID0+IHRvUG92KGNvbG9yLCBldmFsV2lubmluZ0NoYW5jZXMoZXYpKTtcblxuLy8gY29tcHV0ZXMgdGhlIGRpZmZlcmVuY2UsIGluIHdpbm5pbmcgY2hhbmNlcywgYmV0d2VlbiB0d28gZXZhbHVhdGlvbnNcbi8vIDEgID0gZTEgaXMgaW5maW5pdGVseSBiZXR0ZXIgdGhhbiBlMlxuLy8gLTEgPSBlMSBpcyBpbmZpbml0ZWx5IHdvcnNlICB0aGFuIGUyXG5leHBvcnQgY29uc3QgcG92RGlmZiA9IChjb2xvcjogQ29sb3IsIGUxOiBFdmFsLCBlMjogRXZhbCk6IG51bWJlciA9PlxuICAocG92Q2hhbmNlcyhjb2xvciwgZTEpIC0gcG92Q2hhbmNlcyhjb2xvciwgZTIpKSAvIDI7XG4iXX0=