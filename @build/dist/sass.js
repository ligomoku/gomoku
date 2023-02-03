"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sass = void 0;
const cps = __importStar(require("node:child_process"));
const fs = __importStar(require("node:fs"));
const ps = __importStar(require("node:process"));
const path = __importStar(require("node:path"));
const main_1 = require("./main");
const build_1 = require("./build");
const parse_1 = require("./parse");
async function sass() {
    if (!main_1.env.sass)
        return;
    builder.clear();
    importMap.clear();
    await buildThemedScss();
    const allSources = await (0, parse_1.globArray)('./*/css/**/[^_]*.scss', { abs: false });
    const modNames = build_1.buildModules.map(x => x.name);
    // filter to modules we're actually building
    builder.sources = new Set(allSources.filter(x => modNames.find(y => x.startsWith(`${y}${path.sep}`))));
    for (const build of builder.sources) {
        await parseImports(build);
    }
    if (main_1.env.watch) {
        for (const dir of [...importMap.keys()].map(path.dirname)) {
            const watcher = fs.watch(dir);
            watcher.on('change', onChanges.bind(null, dir));
            watcher.on('error', (err) => main_1.env.error(err, 'sass'));
            watcher.on('close', () => {
                main_1.env.error('Watcher closed unexpectedly. Exiting');
                ps.exit(-1);
            });
        }
    }
    if (builder.sources.size) {
        main_1.env.log('Building css', { ctx: 'sass' });
        compile([...builder.sources], false);
    }
    else
        main_1.env.done(0, 'sass');
}
exports.sass = sass;
const sassArgs = ['--no-error-css', '--stop-on-error', '--no-color', '--quiet', '--quiet-deps'];
const importMap = new Map(); // (cssFile, sourcesThatImportIt)
const partialRe = /(.*)\/_(.*)\.scss$/;
const importRe = /@import ['"](.*)['"]/g;
const builder = new (class {
    constructor() {
        this.fileSet = new Set();
    }
    clear() {
        clearTimeout(this.timeout);
        this.timeout = undefined;
        this.fileSet.clear();
    }
    add(files) {
        // filenames relative to lila/ui
        const oldCount = this.fileSet.size;
        files.forEach(src => imports(src).forEach(dest => this.fileSet.add(dest)));
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(this.fire.bind(this), 200);
        return this.fileSet.size > oldCount;
    }
    fire() {
        compile([...this.fileSet].filter(x => this.sources.has(x)));
        this.clear();
    }
})();
async function buildThemedScss() {
    main_1.env.log('Building themed scss', { ctx: 'sass' });
    const partials = (await (0, parse_1.globArray)('./*/css/build/_*.scss', { abs: false })).filter((f) => !f.endsWith('.abstract.scss'));
    for (const file of partials) {
        const match = partialRe.exec(file);
        if (!match || match.length < 3)
            continue;
        const path = match[1];
        const partial = match[2];
        for (const direction of ['ltr', 'rtl']) {
            for (const theme of ['light', 'dark', 'transp']) {
                const themed = `${path}/${partial}.${direction}.${theme}.scss`;
                if (fs.existsSync(themed)) {
                    continue;
                }
                const code = `@import '../../../common/css/dir/${direction}';\n` +
                    `@import '../../../common/css/theme/${theme}';\n` +
                    `@import '${partial}';\n`;
                try {
                    await fs.promises.writeFile(themed, code);
                }
                catch (e) {
                    main_1.env.log(e, { error: true });
                }
            }
        }
    }
}
function compile(sources, tellTheWorld = true) {
    var _a, _b;
    if (tellTheWorld) {
        for (const srcFile of sources) {
            main_1.env.log(`Building '${main_1.colors.cyan(srcFile)}'`, { ctx: 'sass' });
        }
    }
    const sassExec = path.join(main_1.env.buildDir, 'dart-sass', `${ps.platform}-${ps.arch}`, 'sass');
    const proc = cps.spawn(sassExec, sassArgs.concat(main_1.env.prod ? ['--style=compressed', '--no-source-map'] : ['--embed-sources'], sources.map((src) => `${src}:${path.join(main_1.env.cssDir, path.basename(src).replace(/(.*)scss$/, main_1.env.prod ? '$1min.css' : '$1dev.css'))}`)));
    (_a = proc.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (buf) => {
        const txts = (0, main_1.lines)(buf.toString('utf8'));
        for (const txt of txts)
            main_1.env.log(main_1.colors.red(txt), { ctx: 'sass' });
    });
    (_b = proc.stderr) === null || _b === void 0 ? void 0 : _b.on('data', (buf) => sassError(buf.toString('utf8')));
    proc.on('close', (code) => main_1.env.done(code, 'sass'));
}
function imports(srcFile, bset = new Set()) {
    var _a;
    if (bset.has(srcFile))
        return bset;
    bset.add(srcFile);
    for (const dep of (_a = importMap.get(srcFile)) !== null && _a !== void 0 ? _a : [])
        imports(dep, bset);
    return bset;
}
function onChanges(dir, eventType, srcFile) {
    if (eventType === 'change') {
        if (builder.add([path.join(dir, srcFile)]))
            main_1.env.log(`File '${main_1.colors.cyanBold(srcFile)}' changed`);
    }
    else if (eventType === 'rename') {
        (0, parse_1.globArray)('*.scss', { cwd: dir, abs: false }).then(files => {
            if (builder.add(files.map(f => path.join(dir, f)))) {
                main_1.env.log(`Directory '${main_1.colors.cyanBold(dir)}' changed`);
            }
        });
    }
}
async function parseImports(src, depth = 1, processed = new Set()) {
    var _a;
    if (depth > 10) {
        // arbitrary
        main_1.env.log(`${main_1.errorMark} '${main_1.colors.cyan(src)}' - max depth exceeded (${depth})`);
        ps.exit(-2);
    }
    if (processed.has(src))
        return;
    processed.add(src);
    try {
        for (const match of (await fs.promises.readFile(src, 'utf8')).matchAll(importRe)) {
            if (match.length !== 2)
                continue;
            const absDep = path.resolve(path.dirname(src), resolvePartial(match[1]));
            if (!absDep.startsWith(main_1.env.uiDir))
                continue;
            const dep = absDep.slice(main_1.env.uiDir.length + 1);
            if (!((_a = importMap.get(dep)) === null || _a === void 0 ? void 0 : _a.add(src)))
                importMap.set(dep, new Set([src]));
            await parseImports(dep, depth + 1, processed);
        }
    }
    catch (e) {
        main_1.env.log(`${main_1.errorMark} failed to read ${src} - ${JSON.stringify(e, undefined, 2)}`);
    }
}
function resolvePartial(partial) {
    const nameBegin = partial.lastIndexOf(path.sep) + 1;
    return `${partial.slice(0, nameBegin)}_${partial.slice(nameBegin)}.scss`;
}
const hrule = '---------------------------------------------------------------------------';
function sassError(error) {
    for (const err of (0, main_1.lines)(error)) {
        if (err.startsWith('Error:')) {
            main_1.env.log(main_1.colors.grey(hrule), { ctx: 'sass' });
            main_1.env.log(`${main_1.errorMark} - ${err.slice(7)}`, { ctx: 'sass' });
        }
        else
            main_1.env.log(err, { ctx: 'sass' });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Fzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQTBDO0FBQzFDLDRDQUE4QjtBQUM5QixpREFBbUM7QUFDbkMsZ0RBQWtDO0FBQ2xDLGlDQUE0RDtBQUM1RCxtQ0FBdUM7QUFDdkMsbUNBQW9DO0FBRTdCLEtBQUssVUFBVSxJQUFJO0lBQ3hCLElBQUksQ0FBQyxVQUFHLENBQUMsSUFBSTtRQUFFLE9BQU87SUFFdEIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hCLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUVsQixNQUFNLGVBQWUsRUFBRSxDQUFDO0lBRXhCLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBQSxpQkFBUyxFQUFDLHVCQUF1QixFQUFFLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFNUUsTUFBTSxRQUFRLEdBQUcsb0JBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFL0MsNENBQTRDO0lBQzVDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQVMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRS9HLEtBQUssTUFBTSxLQUFLLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRTtRQUNuQyxNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMzQjtJQUVELElBQUksVUFBRyxDQUFDLEtBQUssRUFBRTtRQUNiLEtBQUssTUFBTSxHQUFHLElBQUksQ0FB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RyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDcEY7QUFDSCxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsT0FBZTtJQUNyQyxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztBQUMzRSxDQUFDO0FBRUQsTUFBTSxLQUFLLEdBQUcsNkVBQTZFLENBQUM7QUFFNUYsU0FBUyxTQUFTLENBQUMsS0FBYTtJQUM5QixLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUEsWUFBSyxFQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzlCLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QixVQUFHLENBQUMsR0FBRyxDQUFDLGFBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN4QyxVQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsZ0JBQVMsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM1RDs7WUFBTSxVQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0tBQ3RDO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNwcyBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0ICogYXMgZnMgZnJvbSAnbm9kZTpmcyc7XG5pbXBvcnQgKiBhcyBwcyBmcm9tICdub2RlOnByb2Nlc3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgZW52LCBjb2xvcnMgYXMgYywgbGluZXMsIGVycm9yTWFyayB9IGZyb20gJy4vbWFpbic7XG5pbXBvcnQgeyBidWlsZE1vZHVsZXMgfSBmcm9tICcuL2J1aWxkJztcbmltcG9ydCB7IGdsb2JBcnJheSB9IGZyb20gJy4vcGFyc2UnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2FzcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFlbnYuc2FzcykgcmV0dXJuO1xuXG4gIGJ1aWxkZXIuY2xlYXIoKTtcbiAgaW1wb3J0TWFwLmNsZWFyKCk7XG5cbiAgYXdhaXQgYnVpbGRUaGVtZWRTY3NzKCk7XG5cbiAgY29uc3QgYWxsU291cmNlcyA9IGF3YWl0IGdsb2JBcnJheSgnLi8qL2Nzcy8qKi9bXl9dKi5zY3NzJywgeyBhYnM6IGZhbHNlIH0pO1xuXG4gIGNvbnN0IG1vZE5hbWVzID0gYnVpbGRNb2R1bGVzLm1hcCh4ID0+IHgubmFtZSk7XG5cbiAgLy8gZmlsdGVyIHRvIG1vZHVsZXMgd2UncmUgYWN0dWFsbHkgYnVpbGRpbmdcbiAgYnVpbGRlci5zb3VyY2VzID0gbmV3IFNldDxzdHJpbmc+KGFsbFNvdXJjZXMuZmlsdGVyKHggPT4gbW9kTmFtZXMuZmluZCh5ID0+IHguc3RhcnRzV2l0aChgJHt5fSR7cGF0aC5zZXB9YCkpKSk7XG5cbiAgZm9yIChjb25zdCBidWlsZCBvZiBidWlsZGVyLnNvdXJjZXMpIHtcbiAgICBhd2FpdCBwYXJzZUltcG9ydHMoYnVpbGQpO1xuICB9XG5cbiAgaWYgKGVudi53YXRjaCkge1xuICAgIGZvciAoY29uc3QgZGlyIG9mIFsuLi5pbXBvcnRNYXAua2V5cygpXS5tYXAocGF0aC5kaXJuYW1lKSkge1xuICAgICAgY29uc3Qgd2F0Y2hlciA9IGZzLndhdGNoKGRpcik7XG4gICAgICB3YXRjaGVyLm9uKCdjaGFuZ2UnLCBvbkNoYW5nZXMuYmluZChudWxsLCBkaXIpKTtcbiAgICAgIHdhdGNoZXIub24oJ2Vycm9yJywgKGVycjogRXJyb3IpID0+IGVudi5lcnJvcihlcnIsICdzYXNzJykpO1xuICAgICAgd2F0Y2hlci5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgIGVudi5lcnJvcignV2F0Y2hlciBjbG9zZWQgdW5leHBlY3RlZGx5LiBFeGl0aW5nJyk7XG4gICAgICAgIHBzLmV4aXQoLTEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGlmIChidWlsZGVyLnNvdXJjZXMuc2l6ZSkge1xuICAgIGVudi5sb2coJ0J1aWxkaW5nIGNzcycsIHsgY3R4OiAnc2FzcycgfSk7XG4gICAgY29tcGlsZShbLi4uYnVpbGRlci5zb3VyY2VzXSwgZmFsc2UpO1xuICB9IGVsc2UgZW52LmRvbmUoMCwgJ3Nhc3MnKTtcbn1cblxuY29uc3Qgc2Fzc0FyZ3MgPSBbJy0tbm8tZXJyb3ItY3NzJywgJy0tc3RvcC1vbi1lcnJvcicsICctLW5vLWNvbG9yJywgJy0tcXVpZXQnLCAnLS1xdWlldC1kZXBzJ107XG5jb25zdCBpbXBvcnRNYXAgPSBuZXcgTWFwPHN0cmluZywgU2V0PHN0cmluZz4+KCk7IC8vIChjc3NGaWxlLCBzb3VyY2VzVGhhdEltcG9ydEl0KVxuY29uc3QgcGFydGlhbFJlID0gLyguKilcXC9fKC4qKVxcLnNjc3MkLztcbmNvbnN0IGltcG9ydFJlID0gL0BpbXBvcnQgWydcIl0oLiopWydcIl0vZztcbmNvbnN0IGJ1aWxkZXIgPSBuZXcgKGNsYXNzIHtcbiAgZmlsZVNldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICB0aW1lb3V0OiBOb2RlSlMuVGltZW91dCB8IHVuZGVmaW5lZDtcbiAgc291cmNlczogU2V0PHN0cmluZz47XG5cbiAgY2xlYXIoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy50aW1lb3V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZmlsZVNldC5jbGVhcigpO1xuICB9XG5cbiAgYWRkKGZpbGVzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICAgIC8vIGZpbGVuYW1lcyByZWxhdGl2ZSB0byBsaWxhL3VpXG4gICAgY29uc3Qgb2xkQ291bnQgPSB0aGlzLmZpbGVTZXQuc2l6ZTtcbiAgICBmaWxlcy5mb3JFYWNoKHNyYyA9PiBpbXBvcnRzKHNyYykuZm9yRWFjaChkZXN0ID0+IHRoaXMuZmlsZVNldC5hZGQoZGVzdCkpKTtcbiAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB9XG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCh0aGlzLmZpcmUuYmluZCh0aGlzKSwgMjAwKTtcbiAgICByZXR1cm4gdGhpcy5maWxlU2V0LnNpemUgPiBvbGRDb3VudDtcbiAgfVxuXG4gIGZpcmUoKSB7XG4gICAgY29tcGlsZShbLi4udGhpcy5maWxlU2V0XS5maWx0ZXIoeCA9PiB0aGlzLnNvdXJjZXMuaGFzKHgpKSk7XG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG59KSgpO1xuXG5hc3luYyBmdW5jdGlvbiBidWlsZFRoZW1lZFNjc3MoKSB7XG4gIGVudi5sb2coJ0J1aWxkaW5nIHRoZW1lZCBzY3NzJywgeyBjdHg6ICdzYXNzJyB9KTtcblxuICBjb25zdCBwYXJ0aWFsczogc3RyaW5nW10gPSAoYXdhaXQgZ2xvYkFycmF5KCcuLyovY3NzL2J1aWxkL18qLnNjc3MnLCB7IGFiczogZmFsc2UgfSkpLmZpbHRlcihcbiAgICAoZjogc3RyaW5nKSA9PiAhZi5lbmRzV2l0aCgnLmFic3RyYWN0LnNjc3MnKVxuICApO1xuICBmb3IgKGNvbnN0IGZpbGUgb2YgcGFydGlhbHMpIHtcbiAgICBjb25zdCBtYXRjaCA9IHBhcnRpYWxSZS5leGVjKGZpbGUpO1xuICAgIGlmICghbWF0Y2ggfHwgbWF0Y2gubGVuZ3RoIDwgMykgY29udGludWU7XG4gICAgY29uc3QgcGF0aCA9IG1hdGNoWzFdO1xuICAgIGNvbnN0IHBhcnRpYWwgPSBtYXRjaFsyXTtcbiAgICBmb3IgKGNvbnN0IGRpcmVjdGlvbiBvZiBbJ2x0cicsICdydGwnXSkge1xuICAgICAgZm9yIChjb25zdCB0aGVtZSBvZiBbJ2xpZ2h0JywgJ2RhcmsnLCAndHJhbnNwJ10pIHtcbiAgICAgICAgY29uc3QgdGhlbWVkID0gYCR7cGF0aH0vJHtwYXJ0aWFsfS4ke2RpcmVjdGlvbn0uJHt0aGVtZX0uc2Nzc2A7XG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHRoZW1lZCkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb2RlID1cbiAgICAgICAgICBgQGltcG9ydCAnLi4vLi4vLi4vY29tbW9uL2Nzcy9kaXIvJHtkaXJlY3Rpb259JztcXG5gICtcbiAgICAgICAgICBgQGltcG9ydCAnLi4vLi4vLi4vY29tbW9uL2Nzcy90aGVtZS8ke3RoZW1lfSc7XFxuYCArXG4gICAgICAgICAgYEBpbXBvcnQgJyR7cGFydGlhbH0nO1xcbmA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKHRoZW1lZCwgY29kZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBlbnYubG9nKGUsIHsgZXJyb3I6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY29tcGlsZShzb3VyY2VzOiBzdHJpbmdbXSwgdGVsbFRoZVdvcmxkID0gdHJ1ZSkge1xuICBpZiAodGVsbFRoZVdvcmxkKSB7XG4gICAgZm9yIChjb25zdCBzcmNGaWxlIG9mIHNvdXJjZXMpIHtcbiAgICAgIGVudi5sb2coYEJ1aWxkaW5nICcke2MuY3lhbihzcmNGaWxlKX0nYCwgeyBjdHg6ICdzYXNzJyB9KTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBzYXNzRXhlYyA9IHBhdGguam9pbihlbnYuYnVpbGREaXIsICdkYXJ0LXNhc3MnLCBgJHtwcy5wbGF0Zm9ybX0tJHtwcy5hcmNofWAsICdzYXNzJyk7XG4gIGNvbnN0IHByb2MgPSBjcHMuc3Bhd24oXG4gICAgc2Fzc0V4ZWMsXG4gICAgc2Fzc0FyZ3MuY29uY2F0KFxuICAgICAgZW52LnByb2QgPyBbJy0tc3R5bGU9Y29tcHJlc3NlZCcsICctLW5vLXNvdXJjZS1tYXAnXSA6IFsnLS1lbWJlZC1zb3VyY2VzJ10sXG4gICAgICBzb3VyY2VzLm1hcChcbiAgICAgICAgKHNyYzogc3RyaW5nKSA9PlxuICAgICAgICAgIGAke3NyY306JHtwYXRoLmpvaW4oXG4gICAgICAgICAgICBlbnYuY3NzRGlyLFxuICAgICAgICAgICAgcGF0aC5iYXNlbmFtZShzcmMpLnJlcGxhY2UoLyguKilzY3NzJC8sIGVudi5wcm9kID8gJyQxbWluLmNzcycgOiAnJDFkZXYuY3NzJylcbiAgICAgICAgICApfWBcbiAgICAgIClcbiAgICApXG4gICk7XG5cbiAgcHJvYy5zdGRvdXQ/Lm9uKCdkYXRhJywgKGJ1ZjogQnVmZmVyKSA9PiB7XG4gICAgY29uc3QgdHh0cyA9IGxpbmVzKGJ1Zi50b1N0cmluZygndXRmOCcpKTtcbiAgICBmb3IgKGNvbnN0IHR4dCBvZiB0eHRzKSBlbnYubG9nKGMucmVkKHR4dCksIHsgY3R4OiAnc2FzcycgfSk7XG4gIH0pO1xuICBwcm9jLnN0ZGVycj8ub24oJ2RhdGEnLCAoYnVmOiBCdWZmZXIpID0+IHNhc3NFcnJvcihidWYudG9TdHJpbmcoJ3V0ZjgnKSkpO1xuICBwcm9jLm9uKCdjbG9zZScsIChjb2RlOiBudW1iZXIpID0+IGVudi5kb25lKGNvZGUsICdzYXNzJykpO1xufVxuXG5mdW5jdGlvbiBpbXBvcnRzKHNyY0ZpbGU6IHN0cmluZywgYnNldCA9IG5ldyBTZXQ8c3RyaW5nPigpKTogU2V0PHN0cmluZz4ge1xuICBpZiAoYnNldC5oYXMoc3JjRmlsZSkpIHJldHVybiBic2V0O1xuICBic2V0LmFkZChzcmNGaWxlKTtcbiAgZm9yIChjb25zdCBkZXAgb2YgaW1wb3J0TWFwLmdldChzcmNGaWxlKSA/PyBbXSkgaW1wb3J0cyhkZXAsIGJzZXQpO1xuICByZXR1cm4gYnNldDtcbn1cblxuZnVuY3Rpb24gb25DaGFuZ2VzKGRpcjogc3RyaW5nLCBldmVudFR5cGU6IHN0cmluZywgc3JjRmlsZTogc3RyaW5nKTogdm9pZCB7XG4gIGlmIChldmVudFR5cGUgPT09ICdjaGFuZ2UnKSB7XG4gICAgaWYgKGJ1aWxkZXIuYWRkKFtwYXRoLmpvaW4oZGlyLCBzcmNGaWxlKV0pKSBlbnYubG9nKGBGaWxlICcke2MuY3lhbkJvbGQoc3JjRmlsZSl9JyBjaGFuZ2VkYCk7XG4gIH0gZWxzZSBpZiAoZXZlbnRUeXBlID09PSAncmVuYW1lJykge1xuICAgIGdsb2JBcnJheSgnKi5zY3NzJywgeyBjd2Q6IGRpciwgYWJzOiBmYWxzZSB9KS50aGVuKGZpbGVzID0+IHtcbiAgICAgIGlmIChidWlsZGVyLmFkZChmaWxlcy5tYXAoZiA9PiBwYXRoLmpvaW4oZGlyLCBmKSkpKSB7XG4gICAgICAgIGVudi5sb2coYERpcmVjdG9yeSAnJHtjLmN5YW5Cb2xkKGRpcil9JyBjaGFuZ2VkYCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gcGFyc2VJbXBvcnRzKHNyYzogc3RyaW5nLCBkZXB0aCA9IDEsIHByb2Nlc3NlZCA9IG5ldyBTZXQ8c3RyaW5nPigpKSB7XG4gIGlmIChkZXB0aCA+IDEwKSB7XG4gICAgLy8gYXJiaXRyYXJ5XG4gICAgZW52LmxvZyhgJHtlcnJvck1hcmt9ICcke2MuY3lhbihzcmMpfScgLSBtYXggZGVwdGggZXhjZWVkZWQgKCR7ZGVwdGh9KWApO1xuICAgIHBzLmV4aXQoLTIpO1xuICB9XG4gIGlmIChwcm9jZXNzZWQuaGFzKHNyYykpIHJldHVybjtcbiAgcHJvY2Vzc2VkLmFkZChzcmMpO1xuXG4gIHRyeSB7XG4gICAgZm9yIChjb25zdCBtYXRjaCBvZiAoYXdhaXQgZnMucHJvbWlzZXMucmVhZEZpbGUoc3JjLCAndXRmOCcpKS5tYXRjaEFsbChpbXBvcnRSZSkpIHtcbiAgICAgIGlmIChtYXRjaC5sZW5ndGggIT09IDIpIGNvbnRpbnVlO1xuICAgICAgY29uc3QgYWJzRGVwID0gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShzcmMpLCByZXNvbHZlUGFydGlhbChtYXRjaFsxXSkpO1xuICAgICAgaWYgKCFhYnNEZXAuc3RhcnRzV2l0aChlbnYudWlEaXIpKSBjb250aW51ZTtcbiAgICAgIGNvbnN0IGRlcCA9IGFic0RlcC5zbGljZShlbnYudWlEaXIubGVuZ3RoICsgMSk7XG4gICAgICBpZiAoIWltcG9ydE1hcC5nZXQoZGVwKT8uYWRkKHNyYykpIGltcG9ydE1hcC5zZXQoZGVwLCBuZXcgU2V0PHN0cmluZz4oW3NyY10pKTtcbiAgICAgIGF3YWl0IHBhcnNlSW1wb3J0cyhkZXAsIGRlcHRoICsgMSwgcHJvY2Vzc2VkKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBlbnYubG9nKGAke2Vycm9yTWFya30gZmFpbGVkIHRvIHJlYWQgJHtzcmN9IC0gJHtKU09OLnN0cmluZ2lmeShlLCB1bmRlZmluZWQsIDIpfWApO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVQYXJ0aWFsKHBhcnRpYWw6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IG5hbWVCZWdpbiA9IHBhcnRpYWwubGFzdEluZGV4T2YocGF0aC5zZXApICsgMTtcbiAgcmV0dXJuIGAke3BhcnRpYWwuc2xpY2UoMCwgbmFtZUJlZ2luKX1fJHtwYXJ0aWFsLnNsaWNlKG5hbWVCZWdpbil9LnNjc3NgO1xufVxuXG5jb25zdCBocnVsZSA9ICctLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nO1xuXG5mdW5jdGlvbiBzYXNzRXJyb3IoZXJyb3I6IHN0cmluZykge1xuICBmb3IgKGNvbnN0IGVyciBvZiBsaW5lcyhlcnJvcikpIHtcbiAgICBpZiAoZXJyLnN0YXJ0c1dpdGgoJ0Vycm9yOicpKSB7XG4gICAgICBlbnYubG9nKGMuZ3JleShocnVsZSksIHsgY3R4OiAnc2FzcycgfSk7XG4gICAgICBlbnYubG9nKGAke2Vycm9yTWFya30gLSAke2Vyci5zbGljZSg3KX1gLCB7IGN0eDogJ3Nhc3MnIH0pO1xuICAgIH0gZWxzZSBlbnYubG9nKGVyciwgeyBjdHg6ICdzYXNzJyB9KTtcbiAgfVxufVxuIl19