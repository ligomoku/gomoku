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
exports.globArray = exports.parseModules = void 0;
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const fg = __importStar(require("fast-glob"));
const main_1 = require("./main");
const parseModules = async () => {
    const moduleList = [];
    for (const dir of (await globArray('[^@]*/package.json')).map(pkg => path.dirname(pkg))) {
        moduleList.push(await parseModule(dir));
    }
    const modules = new Map(moduleList.map(mod => [mod.name, mod]));
    const moduleDeps = new Map();
    modules.forEach(mod => {
        var _a;
        const deplist = [];
        for (const dep in mod.pkg.dependencies) {
            if (modules.has(dep))
                deplist.push(dep);
        }
        moduleDeps.set(mod.name, deplist);
        // for package.jsons with multiple bundles, subsequent bundles depend on the first
        (_a = mod.bundle) === null || _a === void 0 ? void 0 : _a.slice(1).forEach(r => {
            moduleDeps.set(r.output, [mod.name, ...deplist]);
        });
    });
    return [modules, moduleDeps];
};
exports.parseModules = parseModules;
async function globArray(glob, { cwd = main_1.env.uiDir, abs = true } = {}) {
    const files = [];
    for await (const file of fg.stream(glob, { cwd: cwd, absolute: abs }))
        files.push(file.toString('utf8'));
    return files;
}
exports.globArray = globArray;
async function parseModule(moduleDir) {
    var _a;
    const pkg = JSON.parse(await fs.promises.readFile(path.join(moduleDir, 'package.json'), 'utf8'));
    const mod = {
        pkg: pkg,
        name: path.basename(moduleDir),
        root: moduleDir,
        pre: [],
        post: [],
        hasTsconfig: fs.existsSync(path.join(moduleDir, 'tsconfig.json')),
        copy: (_a = pkg.lichess) === null || _a === void 0 ? void 0 : _a.copy,
    };
    parseScripts(mod, 'scripts' in pkg ? pkg.scripts : {});
    if ('lichess' in pkg && 'bundles' in pkg.lichess) {
        mod.bundle = Object.entries(pkg.lichess.bundles).map(x => ({ input: x[0], output: x[1] }));
    }
    return mod;
}
// TODO - just subtract yarn/rollup/tsc commands from script contents, don't overparse the string.
// build steps need shell interpretation via exec/execSync which don't provide array arguments.
function tokenizeArgs(argstr) {
    const args = [];
    const reducer = (a, ch) => {
        if (ch !== ' ')
            return ch === "'" ? [a[0], !a[1]] : [a[0] + ch, a[1]];
        if (a[1])
            return [a[0] + ' ', true];
        else if (a[0])
            args.push(a[0]);
        return ['', false];
    };
    const lastOne = [...argstr].reduce(reducer, ['', false])[0];
    return lastOne ? [...args, lastOne] : args;
}
// go through package json scripts and get what we need from 'compile', 'dev', and 'deps'
// if some other script is necessary, add it to buildScriptKeys
function parseScripts(module, pkgScripts) {
    const buildScriptKeys = ['deps', 'compile', 'dev'].concat(main_1.env.prod ? ['prod'] : []);
    for (const script in pkgScripts) {
        if (!buildScriptKeys.includes(script))
            continue;
        pkgScripts[script].split(/&&/).forEach((cmd) => {
            // no need to support || in a script property yet, we don't even short circuit && properly
            const args = tokenizeArgs(cmd.trim());
            if (!['$npm_execpath', 'tsc'].includes(args[0])) {
                script == 'prod' ? module.post.push(args) : module.pre.push(args);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGFyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBOEI7QUFDOUIsZ0RBQWtDO0FBQ2xDLDhDQUFnQztBQUNoQyxpQ0FBNEM7QUFFckMsTUFBTSxZQUFZLEdBQUcsS0FBSyxJQUFrRSxFQUFFO0lBQ25HLE1BQU0sVUFBVSxHQUFvQixFQUFFLENBQUM7SUFFdkMsS0FBSyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sU0FBUyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDdkYsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3pDO0lBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEUsTUFBTSxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7SUFFL0MsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTs7UUFDcEIsTUFBTSxPQUFPLEdBQWEsRUFBRSxDQUFDO1FBQzdCLEtBQUssTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUU7WUFDdEMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2xD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WUFDckQsMEZBQTBGO1lBQzFGLE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUMvQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbkU7UUFDSCxDQUFDLENBQUMsQ0FBQztLQUNKO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ25vZGU6ZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0ICogYXMgZmcgZnJvbSAnZmFzdC1nbG9iJztcbmltcG9ydCB7IExpY2hlc3NNb2R1bGUsIGVudiB9IGZyb20gJy4vbWFpbic7XG5cbmV4cG9ydCBjb25zdCBwYXJzZU1vZHVsZXMgPSBhc3luYyAoKTogUHJvbWlzZTxbTWFwPHN0cmluZywgTGljaGVzc01vZHVsZT4sIE1hcDxzdHJpbmcsIHN0cmluZ1tdPl0+ID0+IHtcbiAgY29uc3QgbW9kdWxlTGlzdDogTGljaGVzc01vZHVsZVtdID0gW107XG5cbiAgZm9yIChjb25zdCBkaXIgb2YgKGF3YWl0IGdsb2JBcnJheSgnW15AXSovcGFja2FnZS5qc29uJykpLm1hcChwa2cgPT4gcGF0aC5kaXJuYW1lKHBrZykpKSB7XG4gICAgbW9kdWxlTGlzdC5wdXNoKGF3YWl0IHBhcnNlTW9kdWxlKGRpcikpO1xuICB9XG4gIGNvbnN0IG1vZHVsZXMgPSBuZXcgTWFwKG1vZHVsZUxpc3QubWFwKG1vZCA9PiBbbW9kLm5hbWUsIG1vZF0pKTtcbiAgY29uc3QgbW9kdWxlRGVwcyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmdbXT4oKTtcblxuICBtb2R1bGVzLmZvckVhY2gobW9kID0+IHtcbiAgICBjb25zdCBkZXBsaXN0OiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgZGVwIGluIG1vZC5wa2cuZGVwZW5kZW5jaWVzKSB7XG4gICAgICBpZiAobW9kdWxlcy5oYXMoZGVwKSkgZGVwbGlzdC5wdXNoKGRlcCk7XG4gICAgfVxuICAgIG1vZHVsZURlcHMuc2V0KG1vZC5uYW1lLCBkZXBsaXN0KTtcbiAgICAvLyBmb3IgcGFja2FnZS5qc29ucyB3aXRoIG11bHRpcGxlIGJ1bmRsZXMsIHN1YnNlcXVlbnQgYnVuZGxlcyBkZXBlbmQgb24gdGhlIGZpcnN0XG4gICAgbW9kLmJ1bmRsZT8uc2xpY2UoMSkuZm9yRWFjaChyID0+IHtcbiAgICAgIG1vZHVsZURlcHMuc2V0KHIub3V0cHV0LCBbbW9kLm5hbWUsIC4uLmRlcGxpc3RdKTtcbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBbbW9kdWxlcywgbW9kdWxlRGVwc107XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2xvYkFycmF5KGdsb2I6IHN0cmluZywgeyBjd2QgPSBlbnYudWlEaXIsIGFicyA9IHRydWUgfSA9IHt9KTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuICBjb25zdCBmaWxlczogc3RyaW5nW10gPSBbXTtcbiAgZm9yIGF3YWl0IChjb25zdCBmaWxlIG9mIGZnLnN0cmVhbShnbG9iLCB7IGN3ZDogY3dkLCBhYnNvbHV0ZTogYWJzIH0pKSBmaWxlcy5wdXNoKGZpbGUudG9TdHJpbmcoJ3V0ZjgnKSk7XG4gIHJldHVybiBmaWxlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gcGFyc2VNb2R1bGUobW9kdWxlRGlyOiBzdHJpbmcpOiBQcm9taXNlPExpY2hlc3NNb2R1bGU+IHtcbiAgY29uc3QgcGtnID0gSlNPTi5wYXJzZShhd2FpdCBmcy5wcm9taXNlcy5yZWFkRmlsZShwYXRoLmpvaW4obW9kdWxlRGlyLCAncGFja2FnZS5qc29uJyksICd1dGY4JykpO1xuICBjb25zdCBtb2Q6IExpY2hlc3NNb2R1bGUgPSB7XG4gICAgcGtnOiBwa2csXG4gICAgbmFtZTogcGF0aC5iYXNlbmFtZShtb2R1bGVEaXIpLFxuICAgIHJvb3Q6IG1vZHVsZURpcixcbiAgICBwcmU6IFtdLFxuICAgIHBvc3Q6IFtdLFxuICAgIGhhc1RzY29uZmlnOiBmcy5leGlzdHNTeW5jKHBhdGguam9pbihtb2R1bGVEaXIsICd0c2NvbmZpZy5qc29uJykpLFxuICAgIGNvcHk6IHBrZy5saWNoZXNzPy5jb3B5LFxuICB9O1xuICBwYXJzZVNjcmlwdHMobW9kLCAnc2NyaXB0cycgaW4gcGtnID8gcGtnLnNjcmlwdHMgOiB7fSk7XG5cbiAgaWYgKCdsaWNoZXNzJyBpbiBwa2cgJiYgJ2J1bmRsZXMnIGluIHBrZy5saWNoZXNzKSB7XG4gICAgbW9kLmJ1bmRsZSA9IE9iamVjdC5lbnRyaWVzKHBrZy5saWNoZXNzLmJ1bmRsZXMpLm1hcCh4ID0+ICh7IGlucHV0OiB4WzBdLCBvdXRwdXQ6IHhbMV0gYXMgc3RyaW5nIH0pKTtcbiAgfVxuICByZXR1cm4gbW9kO1xufVxuXG4vLyBUT0RPIC0ganVzdCBzdWJ0cmFjdCB5YXJuL3JvbGx1cC90c2MgY29tbWFuZHMgZnJvbSBzY3JpcHQgY29udGVudHMsIGRvbid0IG92ZXJwYXJzZSB0aGUgc3RyaW5nLlxuLy8gYnVpbGQgc3RlcHMgbmVlZCBzaGVsbCBpbnRlcnByZXRhdGlvbiB2aWEgZXhlYy9leGVjU3luYyB3aGljaCBkb24ndCBwcm92aWRlIGFycmF5IGFyZ3VtZW50cy5cbmZ1bmN0aW9uIHRva2VuaXplQXJncyhhcmdzdHI6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgY29uc3QgYXJnczogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgcmVkdWNlciA9IChhOiBhbnlbXSwgY2g6IHN0cmluZykgPT4ge1xuICAgIGlmIChjaCAhPT0gJyAnKSByZXR1cm4gY2ggPT09IFwiJ1wiID8gW2FbMF0sICFhWzFdXSA6IFthWzBdICsgY2gsIGFbMV1dO1xuICAgIGlmIChhWzFdKSByZXR1cm4gW2FbMF0gKyAnICcsIHRydWVdO1xuICAgIGVsc2UgaWYgKGFbMF0pIGFyZ3MucHVzaChhWzBdKTtcbiAgICByZXR1cm4gWycnLCBmYWxzZV07XG4gIH07XG4gIGNvbnN0IGxhc3RPbmUgPSBbLi4uYXJnc3RyXS5yZWR1Y2UocmVkdWNlciwgWycnLCBmYWxzZV0pWzBdO1xuICByZXR1cm4gbGFzdE9uZSA/IFsuLi5hcmdzLCBsYXN0T25lXSA6IGFyZ3M7XG59XG5cbi8vIGdvIHRocm91Z2ggcGFja2FnZSBqc29uIHNjcmlwdHMgYW5kIGdldCB3aGF0IHdlIG5lZWQgZnJvbSAnY29tcGlsZScsICdkZXYnLCBhbmQgJ2RlcHMnXG4vLyBpZiBzb21lIG90aGVyIHNjcmlwdCBpcyBuZWNlc3NhcnksIGFkZCBpdCB0byBidWlsZFNjcmlwdEtleXNcbmZ1bmN0aW9uIHBhcnNlU2NyaXB0cyhtb2R1bGU6IExpY2hlc3NNb2R1bGUsIHBrZ1NjcmlwdHM6IGFueSkge1xuICBjb25zdCBidWlsZFNjcmlwdEtleXMgPSBbJ2RlcHMnLCAnY29tcGlsZScsICdkZXYnXS5jb25jYXQoZW52LnByb2QgPyBbJ3Byb2QnXSA6IFtdKTtcblxuICBmb3IgKGNvbnN0IHNjcmlwdCBpbiBwa2dTY3JpcHRzKSB7XG4gICAgaWYgKCFidWlsZFNjcmlwdEtleXMuaW5jbHVkZXMoc2NyaXB0KSkgY29udGludWU7XG4gICAgcGtnU2NyaXB0c1tzY3JpcHRdLnNwbGl0KC8mJi8pLmZvckVhY2goKGNtZDogc3RyaW5nKSA9PiB7XG4gICAgICAvLyBubyBuZWVkIHRvIHN1cHBvcnQgfHwgaW4gYSBzY3JpcHQgcHJvcGVydHkgeWV0LCB3ZSBkb24ndCBldmVuIHNob3J0IGNpcmN1aXQgJiYgcHJvcGVybHlcbiAgICAgIGNvbnN0IGFyZ3MgPSB0b2tlbml6ZUFyZ3MoY21kLnRyaW0oKSk7XG4gICAgICBpZiAoIVsnJG5wbV9leGVjcGF0aCcsICd0c2MnXS5pbmNsdWRlcyhhcmdzWzBdKSkge1xuICAgICAgICBzY3JpcHQgPT0gJ3Byb2QnID8gbW9kdWxlLnBvc3QucHVzaChhcmdzKSA6IG1vZHVsZS5wcmUucHVzaChhcmdzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19