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
exports.preModule = exports.postBuild = exports.build = exports.buildModules = exports.modules = exports.moduleDeps = void 0;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const cps = __importStar(require("node:child_process"));
const ps = __importStar(require("node:process"));
const parse_1 = require("./parse");
const tsc_1 = require("./tsc");
const sass_1 = require("./sass");
const esbuild_1 = require("./esbuild");
const main_1 = require("./main");
async function build(mods) {
    if (!mods.length)
        main_1.env.log(`Parsing modules in '${main_1.colors.cyan(main_1.env.uiDir)}'`);
    ps.chdir(main_1.env.uiDir);
    [exports.modules, exports.moduleDeps] = await (0, parse_1.parseModules)();
    if (mods.find(x => !known(x))) {
        main_1.env.log(`${main_1.errorMark} - unknown module '${main_1.colors.magenta(mods.find(x => !known(x)))}'`);
        return;
    }
    exports.buildModules = mods.length === 0 ? [...exports.modules.values()] : depsMany(mods);
    if (mods.length) {
        main_1.env.log(`Building ${main_1.colors.grey(exports.buildModules.map(x => x.name).join(', '))}`);
    }
    await fs.promises.mkdir(main_1.env.jsDir, { recursive: true });
    await fs.promises.mkdir(main_1.env.cssDir, { recursive: true });
    (0, sass_1.sass)();
    (0, tsc_1.tsc)(() => (0, esbuild_1.esbuild)());
}
exports.build = build;
function postBuild() {
    for (const mod of exports.buildModules) {
        mod.post.forEach((args) => {
            main_1.env.log(`[${main_1.colors.grey(mod.name)}] exec - ${main_1.colors.cyanBold(args.join(' '))}`);
            const stdout = cps.execSync(`${args.join(' ')}`, { cwd: mod.root });
            if (stdout)
                main_1.env.log(stdout, { ctx: mod.name });
        });
    }
}
exports.postBuild = postBuild;
function preModule(mod) {
    mod === null || mod === void 0 ? void 0 : mod.pre.forEach((args) => {
        main_1.env.log(`[${main_1.colors.grey(mod.name)}] exec - ${main_1.colors.cyanBold(args.join(' '))}`);
        const stdout = cps.execSync(`${args.join(' ')}`, { cwd: mod.root });
        if (stdout)
            main_1.env.log(stdout, { ctx: mod.name });
    });
    if (mod === null || mod === void 0 ? void 0 : mod.copy)
        for (const cp of mod.copy) {
            const sources = [];
            const dest = path.join(mod.root, cp.dest) + path.sep;
            if (typeof cp.src === 'string') {
                sources.push(path.join(mod.root, cp.src));
                main_1.env.log(`[${main_1.colors.grey(mod.name)}] copy '${main_1.colors.cyan(cp.src)}'`);
            }
            else if (Array.isArray(cp.src)) {
                for (const s of cp.src) {
                    sources.push(path.join(mod.root, s));
                    main_1.env.log(`[${main_1.colors.grey(mod.name)}] copy '${main_1.colors.cyan(s)}'`);
                }
            }
            fs.mkdirSync(dest, { recursive: true });
            cps.execFileSync('cp', ['-rf', ...sources, dest]);
        }
}
exports.preModule = preModule;
function depsOne(modName) {
    const collect = (dep) => [...(exports.moduleDeps.get(dep) || []).flatMap(d => collect(d)), dep];
    return unique(collect(modName).map(name => exports.modules.get(name)));
}
const depsMany = (modNames) => unique(modNames.flatMap(depsOne));
const unique = (mods) => [...new Set(mods.filter(x => x))];
const known = (name) => exports.modules.has(name);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYnVpbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBOEI7QUFDOUIsZ0RBQWtDO0FBQ2xDLHdEQUEwQztBQUMxQyxpREFBbUM7QUFDbkMsbUNBQXVDO0FBQ3ZDLCtCQUE0QjtBQUM1QixpQ0FBOEI7QUFDOUIsdUNBQW9DO0FBQ3BDLGlDQUFvRTtBQU03RCxLQUFLLFVBQVUsS0FBSyxDQUFDLElBQWM7SUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1FBQUUsVUFBRyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsYUFBQyxDQUFDLElBQUksQ0FBQyxVQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXZFLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXBCLENBQUMsZUFBTyxFQUFFLGtCQUFVLENBQUMsR0FBRyxNQUFNLElBQUEsb0JBQVksR0FBRSxDQUFDO0lBRTdDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDN0IsVUFBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGdCQUFTLHNCQUFzQixhQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BGLE9BQU87S0FDUjtJQUVELG9CQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxlQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFFLElB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T0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDMUcsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFFRCxNQUFNLFFBQVEsR0FBRyxDQUFDLFFBQWtCLEVBQW1CLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBRTVGLE1BQU0sTUFBTSxHQUFHLENBQUksSUFBdUIsRUFBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFRLENBQUM7QUFFN0YsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFZLEVBQVcsRUFBRSxDQUFDLGVBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tICdub2RlOmZzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAnbm9kZTpwYXRoJztcbmltcG9ydCAqIGFzIGNwcyBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0ICogYXMgcHMgZnJvbSAnbm9kZTpwcm9jZXNzJztcbmltcG9ydCB7IHBhcnNlTW9kdWxlcyB9IGZyb20gJy4vcGFyc2UnO1xuaW1wb3J0IHsgdHNjIH0gZnJvbSAnLi90c2MnO1xuaW1wb3J0IHsgc2FzcyB9IGZyb20gJy4vc2Fzcyc7XG5pbXBvcnQgeyBlc2J1aWxkIH0gZnJvbSAnLi9lc2J1aWxkJztcbmltcG9ydCB7IExpY2hlc3NNb2R1bGUsIGVudiwgZXJyb3JNYXJrLCBjb2xvcnMgYXMgYyB9IGZyb20gJy4vbWFpbic7XG5cbmV4cG9ydCBsZXQgbW9kdWxlRGVwczogTWFwPHN0cmluZywgc3RyaW5nW10+O1xuZXhwb3J0IGxldCBtb2R1bGVzOiBNYXA8c3RyaW5nLCBMaWNoZXNzTW9kdWxlPjtcbmV4cG9ydCBsZXQgYnVpbGRNb2R1bGVzOiBMaWNoZXNzTW9kdWxlW107XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZChtb2RzOiBzdHJpbmdbXSkge1xuICBpZiAoIW1vZHMubGVuZ3RoKSBlbnYubG9nKGBQYXJzaW5nIG1vZHVsZXMgaW4gJyR7Yy5jeWFuKGVudi51aURpcil9J2ApO1xuXG4gIHBzLmNoZGlyKGVudi51aURpcik7XG5cbiAgW21vZHVsZXMsIG1vZHVsZURlcHNdID0gYXdhaXQgcGFyc2VNb2R1bGVzKCk7XG5cbiAgaWYgKG1vZHMuZmluZCh4ID0+ICFrbm93bih4KSkpIHtcbiAgICBlbnYubG9nKGAke2Vycm9yTWFya30gLSB1bmtub3duIG1vZHVsZSAnJHtjLm1hZ2VudGEobW9kcy5maW5kKHggPT4gIWtub3duKHgpKSEpfSdgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBidWlsZE1vZHVsZXMgPSBtb2RzLmxlbmd0aCA9PT0gMCA/IFsuLi5tb2R1bGVzLnZhbHVlcygpXSA6IGRlcHNNYW55KG1vZHMpO1xuICBpZiAobW9kcy5sZW5ndGgpIHtcbiAgICBlbnYubG9nKGBCdWlsZGluZyAke2MuZ3JleShidWlsZE1vZHVsZXMubWFwKHggPT4geC5uYW1lKS5qb2luKCcsICcpKX1gKTtcbiAgfVxuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihlbnYuanNEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICBhd2FpdCBmcy5wcm9taXNlcy5ta2RpcihlbnYuY3NzRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcblxuICBzYXNzKCk7XG4gIHRzYygoKSA9PiBlc2J1aWxkKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zdEJ1aWxkKCkge1xuICBmb3IgKGNvbnN0IG1vZCBvZiBidWlsZE1vZHVsZXMpIHtcbiAgICBtb2QucG9zdC5mb3JFYWNoKChhcmdzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgZW52LmxvZyhgWyR7Yy5ncmV5KG1vZC5uYW1lKX1dIGV4ZWMgLSAke2MuY3lhbkJvbGQoYXJncy5qb2luKCcgJykpfWApO1xuICAgICAgY29uc3Qgc3Rkb3V0ID0gY3BzLmV4ZWNTeW5jKGAke2FyZ3Muam9pbignICcpfWAsIHsgY3dkOiBtb2Qucm9vdCB9KTtcbiAgICAgIGlmIChzdGRvdXQpIGVudi5sb2coc3Rkb3V0LCB7IGN0eDogbW9kLm5hbWUgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByZU1vZHVsZShtb2Q6IExpY2hlc3NNb2R1bGUgfCB1bmRlZmluZWQpIHtcbiAgbW9kPy5wcmUuZm9yRWFjaCgoYXJnczogc3RyaW5nW10pID0+IHtcbiAgICBlbnYubG9nKGBbJHtjLmdyZXkobW9kLm5hbWUpfV0gZXhlYyAtICR7Yy5jeWFuQm9sZChhcmdzLmpvaW4oJyAnKSl9YCk7XG4gICAgY29uc3Qgc3Rkb3V0ID0gY3BzLmV4ZWNTeW5jKGAke2FyZ3Muam9pbignICcpfWAsIHsgY3dkOiBtb2Qucm9vdCB9KTtcbiAgICBpZiAoc3Rkb3V0KSBlbnYubG9nKHN0ZG91dCwgeyBjdHg6IG1vZC5uYW1lIH0pO1xuICB9KTtcbiAgaWYgKG1vZD8uY29weSlcbiAgICBmb3IgKGNvbnN0IGNwIG9mIG1vZC5jb3B5KSB7XG4gICAgICBjb25zdCBzb3VyY2VzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgY29uc3QgZGVzdCA9IHBhdGguam9pbihtb2Qucm9vdCwgY3AuZGVzdCkgKyBwYXRoLnNlcDtcbiAgICAgIGlmICh0eXBlb2YgY3Auc3JjID09PSAnc3RyaW5nJykge1xuICAgICAgICBzb3VyY2VzLnB1c2gocGF0aC5qb2luKG1vZC5yb290LCBjcC5zcmMpKTtcbiAgICAgICAgZW52LmxvZyhgWyR7Yy5ncmV5KG1vZC5uYW1lKX1dIGNvcHkgJyR7Yy5jeWFuKGNwLnNyYyl9J2ApO1xuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGNwLnNyYykpIHtcbiAgICAgICAgZm9yIChjb25zdCBzIG9mIGNwLnNyYykge1xuICAgICAgICAgIHNvdXJjZXMucHVzaChwYXRoLmpvaW4obW9kLnJvb3QsIHMpKTtcbiAgICAgICAgICBlbnYubG9nKGBbJHtjLmdyZXkobW9kLm5hbWUpfV0gY29weSAnJHtjLmN5YW4ocyl9J2ApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmcy5ta2RpclN5bmMoZGVzdCwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG5cbiAgICAgIGNwcy5leGVjRmlsZVN5bmMoJ2NwJywgWyctcmYnLCAuLi5zb3VyY2VzLCBkZXN0XSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZXBzT25lKG1vZE5hbWU6IHN0cmluZyk6IExpY2hlc3NNb2R1bGVbXSB7XG4gIGNvbnN0IGNvbGxlY3QgPSAoZGVwOiBzdHJpbmcpOiBzdHJpbmdbXSA9PiBbLi4uKG1vZHVsZURlcHMuZ2V0KGRlcCkgfHwgW10pLmZsYXRNYXAoZCA9PiBjb2xsZWN0KGQpKSwgZGVwXTtcbiAgcmV0dXJuIHVuaXF1ZShjb2xsZWN0KG1vZE5hbWUpLm1hcChuYW1lID0+IG1vZHVsZXMuZ2V0KG5hbWUpKSk7XG59XG5cbmNvbnN0IGRlcHNNYW55ID0gKG1vZE5hbWVzOiBzdHJpbmdbXSk6IExpY2hlc3NNb2R1bGVbXSA9PiB1bmlxdWUobW9kTmFtZXMuZmxhdE1hcChkZXBzT25lKSk7XG5cbmNvbnN0IHVuaXF1ZSA9IDxUPihtb2RzOiAoVCB8IHVuZGVmaW5lZClbXSk6IFRbXSA9PiBbLi4ubmV3IFNldChtb2RzLmZpbHRlcih4ID0+IHgpKV0gYXMgVFtdO1xuXG5jb25zdCBrbm93biA9IChuYW1lOiBzdHJpbmcpOiBib29sZWFuID0+IG1vZHVsZXMuaGFzKG5hbWUpO1xuIl19