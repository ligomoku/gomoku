import { defined } from 'common';
import { lichessRules } from 'chessops/compat';
const minDepth = 6;
const maxStockfishPlies = 245;
export class Protocol {
    constructor() {
        this.expectedPvs = 1;
        this.options = new Map();
    }
    connected(send) {
        this.send = send;
        // Get engine name, version and options.
        this.options = new Map([
            ['Threads', '1'],
            ['Hash', '16'],
            ['MultiPV', '1'],
            ['UCI_Variant', 'chess'],
        ]);
        this.send('uci');
    }
    setOption(name, value) {
        value = value.toString();
        if (this.send && this.options.get(name) !== value) {
            this.send(`setoption name ${name} value ${value}`);
            this.options.set(name, value);
        }
    }
    disconnected() {
        if (this.work && this.currentEval)
            this.work.emit(this.currentEval);
        this.work = undefined;
        this.send = undefined;
    }
    received(command) {
        var _a, _b;
        const parts = command.trim().split(/\s+/g);
        if (parts[0] === 'uciok') {
            // Analyse without contempt.
            this.setOption('UCI_AnalyseMode', 'true');
            this.setOption('Analysis Contempt', 'Off');
            // Affects notation only. Life would be easier if everyone would always
            // unconditionally use this mode.
            this.setOption('UCI_Chess960', 'true');
            (_a = this.send) === null || _a === void 0 ? void 0 : _a.call(this, 'ucinewgame');
            (_b = this.send) === null || _b === void 0 ? void 0 : _b.call(this, 'isready');
        }
        else if (parts[0] === 'readyok') {
            this.swapWork();
        }
        else if (parts[0] === 'id' && parts[1] === 'name') {
            this.engineName = parts.slice(2).join(' ');
        }
        else if (parts[0] === 'bestmove') {
            if (this.work && this.currentEval)
                this.work.emit(this.currentEval);
            this.work = undefined;
            this.swapWork();
            return;
        }
        else if (this.work && !this.work.stopRequested && parts[0] === 'info') {
            let depth = 0, nodes, multiPv = 1, elapsedMs, evalType, isMate = false, povEv, moves = [];
            for (let i = 1; i < parts.length; i++) {
                switch (parts[i]) {
                    case 'depth':
                        depth = parseInt(parts[++i]);
                        break;
                    case 'nodes':
                        nodes = parseInt(parts[++i]);
                        break;
                    case 'multipv':
                        multiPv = parseInt(parts[++i]);
                        break;
                    case 'time':
                        elapsedMs = parseInt(parts[++i]);
                        break;
                    case 'score':
                        isMate = parts[++i] === 'mate';
                        povEv = parseInt(parts[++i]);
                        if (parts[i + 1] === 'lowerbound' || parts[i + 1] === 'upperbound')
                            evalType = parts[++i];
                        break;
                    case 'pv':
                        moves = parts.slice(++i);
                        i = parts.length;
                        break;
                }
            }
            // Sometimes we get #0. Let's just skip it.
            if (isMate && !povEv)
                return;
            // Track max pv index to determine when pv prints are done.
            if (this.expectedPvs < multiPv)
                this.expectedPvs = multiPv;
            if (depth < minDepth || !defined(nodes) || !defined(elapsedMs) || !defined(isMate) || !defined(povEv))
                return;
            const pivot = this.work.threatMode ? 0 : 1;
            const ev = this.work.ply % 2 === pivot ? -povEv : povEv;
            // For now, ignore most upperbound/lowerbound messages.
            // However non-primary pvs may only have an upperbound.
            if (evalType && multiPv === 1)
                return;
            const pvData = {
                moves,
                cp: isMate ? undefined : ev,
                mate: isMate ? ev : undefined,
                depth,
            };
            if (multiPv === 1) {
                this.currentEval = {
                    fen: this.work.currentFen,
                    maxDepth: this.work.maxDepth,
                    depth,
                    knps: nodes / elapsedMs,
                    nodes,
                    cp: isMate ? undefined : ev,
                    mate: isMate ? ev : undefined,
                    pvs: [pvData],
                    millis: elapsedMs,
                };
            }
            else if (this.currentEval) {
                this.currentEval.pvs.push(pvData);
                this.currentEval.depth = Math.min(this.currentEval.depth, depth);
            }
            if (multiPv === this.expectedPvs && this.currentEval) {
                this.work.emit(this.currentEval);
                // Depth limits are nice in the user interface, but in clearly decided
                // positions the usual depth limits are reached very quickly due to
                // pruning. Therefore not using `go depth ${this.work.maxDepth}` and
                // manually ensuring Stockfish gets to spend a minimum amount of
                // time/nodes on each position.
                if (depth >= this.work.maxDepth && elapsedMs > 8000 && nodes > 4000 * Math.exp(this.work.maxDepth * 0.3))
                    this.stop();
            }
        }
    }
    stop() {
        var _a;
        if (this.work && !this.work.stopRequested) {
            this.work.stopRequested = true;
            (_a = this.send) === null || _a === void 0 ? void 0 : _a.call(this, 'stop');
        }
    }
    swapWork() {
        if (!this.send || this.work)
            return;
        this.work = this.nextWork;
        this.nextWork = undefined;
        if (this.work) {
            this.currentEval = undefined;
            this.expectedPvs = 1;
            this.setOption('UCI_Variant', this.work.variant === 'antichess'
                ? 'giveaway' // for old asmjs fallback
                : lichessRules(this.work.variant));
            this.setOption('Threads', this.work.threads);
            this.setOption('Hash', this.work.hashSize || 16);
            this.setOption('MultiPV', Math.max(1, this.work.multiPv));
            this.send(['position fen', this.work.initialFen, 'moves', ...this.work.moves].join(' '));
            this.send(this.work.maxDepth >= 99
                ? `go depth ${maxStockfishPlies}` // 'go infinite' would not finish even if entire tree search completed
                : 'go movetime 90000');
        }
    }
    compute(nextWork) {
        this.nextWork = nextWork;
        this.stop();
        this.swapWork();
    }
    isComputing() {
        return !!this.work && !this.work.stopRequested;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdG9jb2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcHJvdG9jb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNqQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHL0MsTUFBTSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBQ25CLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDO0FBRTlCLE1BQU0sT0FBTyxRQUFRO0lBQXJCO1FBS1UsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFLaEIsWUFBTyxHQUFpQyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztJQXdMNUUsQ0FBQztJQXRMQyxTQUFTLENBQUMsSUFBMkI7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFDckIsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDO1lBQ2hCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQztZQUNkLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQztZQUNoQixDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUM7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRU8sU0FBUyxDQUFDLElBQVksRUFBRSxLQUFzQjtRQUNwRCxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7WUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxVQUFVLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLE9BQU8s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QUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ2pELENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGRlZmluZWQgfSBmcm9tICdjb21tb24nO1xuaW1wb3J0IHsgbGljaGVzc1J1bGVzIH0gZnJvbSAnY2hlc3NvcHMvY29tcGF0JztcbmltcG9ydCB7IFdvcmsgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgbWluRGVwdGggPSA2O1xuY29uc3QgbWF4U3RvY2tmaXNoUGxpZXMgPSAyNDU7XG5cbmV4cG9ydCBjbGFzcyBQcm90b2NvbCB7XG4gIHB1YmxpYyBlbmdpbmVOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSB3b3JrOiBXb3JrIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIGN1cnJlbnRFdmFsOiBUcmVlLkxvY2FsRXZhbCB8IHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBleHBlY3RlZFB2cyA9IDE7XG5cbiAgcHJpdmF0ZSBuZXh0V29yazogV29yayB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIHNlbmQ6ICgoY21kOiBzdHJpbmcpID0+IHZvaWQpIHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIG9wdGlvbnM6IE1hcDxzdHJpbmcsIHN0cmluZyB8IG51bWJlcj4gPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gIGNvbm5lY3RlZChzZW5kOiAoY21kOiBzdHJpbmcpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLnNlbmQgPSBzZW5kO1xuXG4gICAgLy8gR2V0IGVuZ2luZSBuYW1lLCB2ZXJzaW9uIGFuZCBvcHRpb25zLlxuICAgIHRoaXMub3B0aW9ucyA9IG5ldyBNYXAoW1xuICAgICAgWydUaHJlYWRzJywgJzEnXSxcbiAgICAgIFsnSGFzaCcsICcxNiddLFxuICAgICAgWydNdWx0aVBWJywgJzEnXSxcbiAgICAgIFsnVUNJX1ZhcmlhbnQnLCAnY2hlc3MnXSxcbiAgICBdKTtcbiAgICB0aGlzLnNlbmQoJ3VjaScpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXRPcHRpb24obmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKTogdm9pZCB7XG4gICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgIGlmICh0aGlzLnNlbmQgJiYgdGhpcy5vcHRpb25zLmdldChuYW1lKSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuc2VuZChgc2V0b3B0aW9uIG5hbWUgJHtuYW1lfSB2YWx1ZSAke3ZhbHVlfWApO1xuICAgICAgdGhpcy5vcHRpb25zLnNldChuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdGVkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLndvcmsgJiYgdGhpcy5jdXJyZW50RXZhbCkgdGhpcy53b3JrLmVtaXQodGhpcy5jdXJyZW50RXZhbCk7XG4gICAgdGhpcy53b3JrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2VuZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJlY2VpdmVkKGNvbW1hbmQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHBhcnRzID0gY29tbWFuZC50cmltKCkuc3BsaXQoL1xccysvZyk7XG4gICAgaWYgKHBhcnRzWzBdID09PSAndWNpb2snKSB7XG4gICAgICAvLyBBbmFseXNlIHdpdGhvdXQgY29udGVtcHQuXG4gICAgICB0aGlzLnNldE9wdGlvbignVUNJX0FuYWx5c2VNb2RlJywgJ3RydWUnKTtcbiAgICAgIHRoaXMuc2V0T3B0aW9uKCdBbmFseXNpcyBDb250ZW1wdCcsICdPZmYnKTtcblxuICAgICAgLy8gQWZmZWN0cyBub3RhdGlvbiBvbmx5LiBMaWZlIHdvdWxkIGJlIGVhc2llciBpZiBldmVyeW9uZSB3b3VsZCBhbHdheXNcbiAgICAgIC8vIHVuY29uZGl0aW9uYWxseSB1c2UgdGhpcyBtb2RlLlxuICAgICAgdGhpcy5zZXRPcHRpb24oJ1VDSV9DaGVzczk2MCcsICd0cnVlJyk7XG5cbiAgICAgIHRoaXMuc2VuZD8uKCd1Y2luZXdnYW1lJyk7XG4gICAgICB0aGlzLnNlbmQ/LignaXNyZWFkeScpO1xuICAgIH0gZWxzZSBpZiAocGFydHNbMF0gPT09ICdyZWFkeW9rJykge1xuICAgICAgdGhpcy5zd2FwV29yaygpO1xuICAgIH0gZWxzZSBpZiAocGFydHNbMF0gPT09ICdpZCcgJiYgcGFydHNbMV0gPT09ICduYW1lJykge1xuICAgICAgdGhpcy5lbmdpbmVOYW1lID0gcGFydHMuc2xpY2UoMikuam9pbignICcpO1xuICAgIH0gZWxzZSBpZiAocGFydHNbMF0gPT09ICdiZXN0bW92ZScpIHtcbiAgICAgIGlmICh0aGlzLndvcmsgJiYgdGhpcy5jdXJyZW50RXZhbCkgdGhpcy53b3JrLmVtaXQodGhpcy5jdXJyZW50RXZhbCk7XG4gICAgICB0aGlzLndvcmsgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLnN3YXBXb3JrKCk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh0aGlzLndvcmsgJiYgIXRoaXMud29yay5zdG9wUmVxdWVzdGVkICYmIHBhcnRzWzBdID09PSAnaW5mbycpIHtcbiAgICAgIGxldCBkZXB0aCA9IDAsXG4gICAgICAgIG5vZGVzLFxuICAgICAgICBtdWx0aVB2ID0gMSxcbiAgICAgICAgZWxhcHNlZE1zLFxuICAgICAgICBldmFsVHlwZSxcbiAgICAgICAgaXNNYXRlID0gZmFsc2UsXG4gICAgICAgIHBvdkV2LFxuICAgICAgICBtb3Zlczogc3RyaW5nW10gPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3dpdGNoIChwYXJ0c1tpXSkge1xuICAgICAgICAgIGNhc2UgJ2RlcHRoJzpcbiAgICAgICAgICAgIGRlcHRoID0gcGFyc2VJbnQocGFydHNbKytpXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdub2Rlcyc6XG4gICAgICAgICAgICBub2RlcyA9IHBhcnNlSW50KHBhcnRzWysraV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbXVsdGlwdic6XG4gICAgICAgICAgICBtdWx0aVB2ID0gcGFyc2VJbnQocGFydHNbKytpXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd0aW1lJzpcbiAgICAgICAgICAgIGVsYXBzZWRNcyA9IHBhcnNlSW50KHBhcnRzWysraV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2NvcmUnOlxuICAgICAgICAgICAgaXNNYXRlID0gcGFydHNbKytpXSA9PT0gJ21hdGUnO1xuICAgICAgICAgICAgcG92RXYgPSBwYXJzZUludChwYXJ0c1srK2ldKTtcbiAgICAgICAgICAgIGlmIChwYXJ0c1tpICsgMV0gPT09ICdsb3dlcmJvdW5kJyB8fCBwYXJ0c1tpICsgMV0gPT09ICd1cHBlcmJvdW5kJykgZXZhbFR5cGUgPSBwYXJ0c1srK2ldO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncHYnOlxuICAgICAgICAgICAgbW92ZXMgPSBwYXJ0cy5zbGljZSgrK2kpO1xuICAgICAgICAgICAgaSA9IHBhcnRzLmxlbmd0aDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNvbWV0aW1lcyB3ZSBnZXQgIzAuIExldCdzIGp1c3Qgc2tpcCBpdC5cbiAgICAgIGlmIChpc01hdGUgJiYgIXBvdkV2KSByZXR1cm47XG5cbiAgICAgIC8vIFRyYWNrIG1heCBwdiBpbmRleCB0byBkZXRlcm1pbmUgd2hlbiBwdiBwcmludHMgYXJlIGRvbmUuXG4gICAgICBpZiAodGhpcy5leHBlY3RlZFB2cyA8IG11bHRpUHYpIHRoaXMuZXhwZWN0ZWRQdnMgPSBtdWx0aVB2O1xuXG4gICAgICBpZiAoZGVwdGggPCBtaW5EZXB0aCB8fCAhZGVmaW5lZChub2RlcykgfHwgIWRlZmluZWQoZWxhcHNlZE1zKSB8fCAhZGVmaW5lZChpc01hdGUpIHx8ICFkZWZpbmVkKHBvdkV2KSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBwaXZvdCA9IHRoaXMud29yay50aHJlYXRNb2RlID8gMCA6IDE7XG4gICAgICBjb25zdCBldiA9IHRoaXMud29yay5wbHkgJSAyID09PSBwaXZvdCA/IC1wb3ZFdiA6IHBvdkV2O1xuXG4gICAgICAvLyBGb3Igbm93LCBpZ25vcmUgbW9zdCB1cHBlcmJvdW5kL2xvd2VyYm91bmQgbWVzc2FnZXMuXG4gICAgICAvLyBIb3dldmVyIG5vbi1wcmltYXJ5IHB2cyBtYXkgb25seSBoYXZlIGFuIHVwcGVyYm91bmQuXG4gICAgICBpZiAoZXZhbFR5cGUgJiYgbXVsdGlQdiA9PT0gMSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBwdkRhdGEgPSB7XG4gICAgICAgIG1vdmVzLFxuICAgICAgICBjcDogaXNNYXRlID8gdW5kZWZpbmVkIDogZXYsXG4gICAgICAgIG1hdGU6IGlzTWF0ZSA/IGV2IDogdW5kZWZpbmVkLFxuICAgICAgICBkZXB0aCxcbiAgICAgIH07XG5cbiAgICAgIGlmIChtdWx0aVB2ID09PSAxKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEV2YWwgPSB7XG4gICAgICAgICAgZmVuOiB0aGlzLndvcmsuY3VycmVudEZlbixcbiAgICAgICAgICBtYXhEZXB0aDogdGhpcy53b3JrLm1heERlcHRoLFxuICAgICAgICAgIGRlcHRoLFxuICAgICAgICAgIGtucHM6IG5vZGVzIC8gZWxhcHNlZE1zLFxuICAgICAgICAgIG5vZGVzLFxuICAgICAgICAgIGNwOiBpc01hdGUgPyB1bmRlZmluZWQgOiBldixcbiAgICAgICAgICBtYXRlOiBpc01hdGUgPyBldiA6IHVuZGVmaW5lZCxcbiAgICAgICAgICBwdnM6IFtwdkRhdGFdLFxuICAgICAgICAgIG1pbGxpczogZWxhcHNlZE1zLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRFdmFsKSB7XG4gICAgICAgIHRoaXMuY3VycmVudEV2YWwucHZzLnB1c2gocHZEYXRhKTtcbiAgICAgICAgdGhpcy5jdXJyZW50RXZhbC5kZXB0aCA9IE1hdGgubWluKHRoaXMuY3VycmVudEV2YWwuZGVwdGgsIGRlcHRoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG11bHRpUHYgPT09IHRoaXMuZXhwZWN0ZWRQdnMgJiYgdGhpcy5jdXJyZW50RXZhbCkge1xuICAgICAgICB0aGlzLndvcmsuZW1pdCh0aGlzLmN1cnJlbnRFdmFsKTtcblxuICAgICAgICAvLyBEZXB0aCBsaW1pdHMgYXJlIG5pY2UgaW4gdGhlIHVzZXIgaW50ZXJmYWNlLCBidXQgaW4gY2xlYXJseSBkZWNpZGVkXG4gICAgICAgIC8vIHBvc2l0aW9ucyB0aGUgdXN1YWwgZGVwdGggbGltaXRzIGFyZSByZWFjaGVkIHZlcnkgcXVpY2tseSBkdWUgdG9cbiAgICAgICAgLy8gcHJ1bmluZy4gVGhlcmVmb3JlIG5vdCB1c2luZyBgZ28gZGVwdGggJHt0aGlzLndvcmsubWF4RGVwdGh9YCBhbmRcbiAgICAgICAgLy8gbWFudWFsbHkgZW5zdXJpbmcgU3RvY2tmaXNoIGdldHMgdG8gc3BlbmQgYSBtaW5pbXVtIGFtb3VudCBvZlxuICAgICAgICAvLyB0aW1lL25vZGVzIG9uIGVhY2ggcG9zaXRpb24uXG4gICAgICAgIGlmIChkZXB0aCA+PSB0aGlzLndvcmsubWF4RGVwdGggJiYgZWxhcHNlZE1zID4gODAwMCAmJiBub2RlcyA+IDQwMDAgKiBNYXRoLmV4cCh0aGlzLndvcmsubWF4RGVwdGggKiAwLjMpKVxuICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RvcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy53b3JrICYmICF0aGlzLndvcmsuc3RvcFJlcXVlc3RlZCkge1xuICAgICAgdGhpcy53b3JrLnN0b3BSZXF1ZXN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zZW5kPy4oJ3N0b3AnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN3YXBXb3JrKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zZW5kIHx8IHRoaXMud29yaykgcmV0dXJuO1xuXG4gICAgdGhpcy53b3JrID0gdGhpcy5uZXh0V29yaztcbiAgICB0aGlzLm5leHRXb3JrID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHRoaXMud29yaykge1xuICAgICAgdGhpcy5jdXJyZW50RXZhbCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZXhwZWN0ZWRQdnMgPSAxO1xuXG4gICAgICB0aGlzLnNldE9wdGlvbihcbiAgICAgICAgJ1VDSV9WYXJpYW50JyxcbiAgICAgICAgdGhpcy53b3JrLnZhcmlhbnQgPT09ICdhbnRpY2hlc3MnXG4gICAgICAgICAgPyAnZ2l2ZWF3YXknIC8vIGZvciBvbGQgYXNtanMgZmFsbGJhY2tcbiAgICAgICAgICA6IGxpY2hlc3NSdWxlcyh0aGlzLndvcmsudmFyaWFudClcbiAgICAgICk7XG4gICAgICB0aGlzLnNldE9wdGlvbignVGhyZWFkcycsIHRoaXMud29yay50aHJlYWRzKTtcbiAgICAgIHRoaXMuc2V0T3B0aW9uKCdIYXNoJywgdGhpcy53b3JrLmhhc2hTaXplIHx8IDE2KTtcbiAgICAgIHRoaXMuc2V0T3B0aW9uKCdNdWx0aVBWJywgTWF0aC5tYXgoMSwgdGhpcy53b3JrLm11bHRpUHYpKTtcblxuICAgICAgdGhpcy5zZW5kKFsncG9zaXRpb24gZmVuJywgdGhpcy53b3JrLmluaXRpYWxGZW4sICdtb3ZlcycsIC4uLnRoaXMud29yay5tb3Zlc10uam9pbignICcpKTtcbiAgICAgIHRoaXMuc2VuZChcbiAgICAgICAgdGhpcy53b3JrLm1heERlcHRoID49IDk5XG4gICAgICAgICAgPyBgZ28gZGVwdGggJHttYXhTdG9ja2Zpc2hQbGllc31gIC8vICdnbyBpbmZpbml0ZScgd291bGQgbm90IGZpbmlzaCBldmVuIGlmIGVudGlyZSB0cmVlIHNlYXJjaCBjb21wbGV0ZWRcbiAgICAgICAgICA6ICdnbyBtb3ZldGltZSA5MDAwMCdcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY29tcHV0ZShuZXh0V29yazogV29yayB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMubmV4dFdvcmsgPSBuZXh0V29yaztcbiAgICB0aGlzLnN0b3AoKTtcbiAgICB0aGlzLnN3YXBXb3JrKCk7XG4gIH1cblxuICBpc0NvbXB1dGluZygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLndvcmsgJiYgIXRoaXMud29yay5zdG9wUmVxdWVzdGVkO1xuICB9XG59XG4iXX0=