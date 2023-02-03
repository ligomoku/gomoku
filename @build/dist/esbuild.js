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
exports.esbuild = void 0;
const cps = __importStar(require("node:child_process"));
const path = __importStar(require("node:path"));
const es = __importStar(require("esbuild"));
const build_1 = require("./build");
const main_1 = require("./main");
async function esbuild() {
    if (!main_1.env.esbuild)
        return;
    const entryPoints = {};
    for (const mod of build_1.buildModules) {
        (0, build_1.preModule)(mod);
        if (mod.bundle) {
            for (const r of mod.bundle) {
                entryPoints[r.output] = path.join(mod.root, r.input);
            }
        }
    }
    try {
        await es.build({
            sourcemap: main_1.env.prod ? false : 'inline',
            define: {
                __info__: JSON.stringify({
                    date: new Date(new Date().toUTCString()).toISOString().split('.')[0] + '+00:00',
                    commit: cps.execSync('git rev-parse -q HEAD', { encoding: 'utf-8' }).trim(),
                    message: cps.execSync('git log -1 --pretty=%s', { encoding: 'utf-8' }).trim(),
                }),
            },
            format: 'iife',
            target: 'es2018',
            logLevel: 'silent',
            bundle: true,
            outdir: main_1.env.jsDir,
            watch: main_1.env.watch,
            minify: main_1.env.prod,
            entryPoints: entryPoints,
            outExtension: { '.js': main_1.env.prod ? '.min.js' : '.js' },
            plugins: [/*onStartPlugin, onLoadPlugin,*/ onEndPlugin],
        });
    }
    catch (e) {
        main_1.env.log(e, { error: true });
    }
}
exports.esbuild = esbuild;
/*
const onStartPlugin = {
  name: 'lichessOnStart',
  setup(build: es.PluginBuild) {
    build.onStart(() => env.log(c.grey('Bundling') + ' modules', { ctx: 'esbuild' }));
  },
};

const fileFilter = new RegExp(`\\${path.sep}ui\\${path.sep}(.+\\.ts)$`);
const onLoadPlugin = {
  // more like onMurderScrollbackBuffer
  name: 'lichessOnLoad',
  setup(build: es.PluginBuild) {
    build.onLoad({ filter: fileFilter }, (o: es.OnLoadArgs): es.OnLoadResult | undefined => {
      env.log(`Bundling '${c.cyan(fileFilter.exec(o.path)![1])}'`, { ctx: 'esbuild' });
      return undefined;
    });
  },
};*/
const onEndPlugin = {
    name: 'lichessOnEnd',
    setup(build) {
        build.onEnd((result) => {
            for (const err of result.errors) {
                esbuildMessage(err, true);
            }
            for (const warn of result.warnings) {
                esbuildMessage(warn);
            }
            main_1.env.done(result.errors.length, 'esbuild');
        });
    },
};
function esbuildMessage(msg, error = false) {
    var _a, _b, _c, _d;
    const file = (_b = (_a = msg.location) === null || _a === void 0 ? void 0 : _a.file.replace(/^[./]*/, '')) !== null && _b !== void 0 ? _b : '<unknown>';
    const line = ((_c = msg.location) === null || _c === void 0 ? void 0 : _c.line) ? `line ${msg.location.line} of ` : '';
    const srcText = (_d = msg.location) === null || _d === void 0 ? void 0 : _d.lineText;
    main_1.env.log(`${error ? main_1.errorMark : main_1.colors.warn('WARNING')} - ${line}'${main_1.colors.cyan(file)}': ${msg.text}`, { ctx: 'esbuild' });
    if (srcText)
        main_1.env.log('  ' + main_1.colors.magenta(srcText), { ctx: 'esbuild' });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNidWlsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lc2J1aWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQTBDO0FBQzFDLGdEQUFrQztBQUNsQyw0Q0FBOEI7QUFDOUIsbUNBQWtEO0FBQ2xELGlDQUFxRDtBQUU5QyxLQUFLLFVBQVUsT0FBTztJQUMzQixJQUFJLENBQUMsVUFBRyxDQUFDLE9BQU87UUFBRSxPQUFPO0lBQ3pCLE1BQU0sV0FBVyxHQUE4QixFQUFFLENBQUM7SUFDbEQsS0FBSyxNQUFNLEdBQUcsSUFBSSxvQkFBWSxFQUFFO1FBQzlCLElBQUEsaUJBQVMsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNkLEtBQUssTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtnQkFDMUIsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3REO1NBQ0Y7S0FDRjtJQUNELElBQUk7UUFDRixNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDYixTQUFTLEVBQUUsVUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRO1lBQ3RDLE1BQU0sRUFBRTtnQkFDTixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDdkIsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUTtvQkFDL0UsTUFBTSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsdUJBQXVCLEVB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cyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgKiBhcyBlcyBmcm9tICdlc2J1aWxkJztcbmltcG9ydCB7IHByZU1vZHVsZSwgYnVpbGRNb2R1bGVzIH0gZnJvbSAnLi9idWlsZCc7XG5pbXBvcnQgeyBlbnYsIGVycm9yTWFyaywgY29sb3JzIGFzIGMgfSBmcm9tICcuL21haW4nO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXNidWlsZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFlbnYuZXNidWlsZCkgcmV0dXJuO1xuICBjb25zdCBlbnRyeVBvaW50czogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICBmb3IgKGNvbnN0IG1vZCBvZiBidWlsZE1vZHVsZXMpIHtcbiAgICBwcmVNb2R1bGUobW9kKTtcbiAgICBpZiAobW9kLmJ1bmRsZSkge1xuICAgICAgZm9yIChjb25zdCByIG9mIG1vZC5idW5kbGUpIHtcbiAgICAgICAgZW50cnlQb2ludHNbci5vdXRwdXRdID0gcGF0aC5qb2luKG1vZC5yb290LCByLmlucHV0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdHJ5IHtcbiAgICBhd2FpdCBlcy5idWlsZCh7XG4gICAgICBzb3VyY2VtYXA6IGVudi5wcm9kID8gZmFsc2UgOiAnaW5saW5lJyxcbiAgICAgIGRlZmluZToge1xuICAgICAgICBfX2luZm9fXzogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKG5ldyBEYXRlKCkudG9VVENTdHJpbmcoKSkudG9JU09TdHJpbmcoKS5zcGxpdCgnLicpWzBdICsgJyswMDowMCcsXG4gICAgICAgICAgY29tbWl0OiBjcHMuZXhlY1N5bmMoJ2dpdCByZXYtcGFyc2UgLXEgSEVBRCcsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkudHJpbSgpLFxuICAgICAgICAgIG1lc3NhZ2U6IGNwcy5leGVjU3luYygnZ2l0IGxvZyAtMSAtLXByZXR0eT0lcycsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkudHJpbSgpLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgICBmb3JtYXQ6ICdpaWZlJyxcbiAgICAgIHRhcmdldDogJ2VzMjAxOCcsXG4gICAgICBsb2dMZXZlbDogJ3NpbGVudCcsXG4gICAgICBidW5kbGU6IHRydWUsXG4gICAgICBvdXRkaXI6IGVudi5qc0RpcixcbiAgICAgIHdhdGNoOiBlbnYud2F0Y2gsXG4gICAgICBtaW5pZnk6IGVudi5wcm9kLFxuICAgICAgZW50cnlQb2ludHM6IGVudHJ5UG9pbnRzLFxuICAgICAgb3V0RXh0ZW5zaW9uOiB7ICcuanMnOiBlbnYucHJvZCA/ICcubWluLmpzJyA6ICcuanMnIH0sXG4gICAgICBwbHVnaW5zOiBbLypvblN0YXJ0UGx1Z2luLCBvbkxvYWRQbHVnaW4sKi8gb25FbmRQbHVnaW5dLFxuICAgIH0pO1xuICB9IGNhdGNoIChlOiBhbnkpIHtcbiAgICBlbnYubG9nKGUsIHsgZXJyb3I6IHRydWUgfSk7XG4gIH1cbn1cbi8qXG5jb25zdCBvblN0YXJ0UGx1Z2luID0ge1xuICBuYW1lOiAnbGljaGVzc09uU3RhcnQnLFxuICBzZXR1cChidWlsZDogZXMuUGx1Z2luQnVpbGQpIHtcbiAgICBidWlsZC5vblN0YXJ0KCgpID0+IGVudi5sb2coYy5ncmV5KCdCdW5kbGluZycpICsgJyBtb2R1bGVzJywgeyBjdHg6ICdlc2J1aWxkJyB9KSk7XG4gIH0sXG59O1xuXG5jb25zdCBmaWxlRmlsdGVyID0gbmV3IFJlZ0V4cChgXFxcXCR7cGF0aC5zZXB9dWlcXFxcJHtwYXRoLnNlcH0oLitcXFxcLnRzKSRgKTtcbmNvbnN0IG9uTG9hZFBsdWdpbiA9IHtcbiAgLy8gbW9yZSBsaWtlIG9uTXVyZGVyU2Nyb2xsYmFja0J1ZmZlclxuICBuYW1lOiAnbGljaGVzc09uTG9hZCcsXG4gIHNldHVwKGJ1aWxkOiBlcy5QbHVnaW5CdWlsZCkge1xuICAgIGJ1aWxkLm9uTG9hZCh7IGZpbHRlcjogZmlsZUZpbHRlciB9LCAobzogZXMuT25Mb2FkQXJncyk6IGVzLk9uTG9hZFJlc3VsdCB8IHVuZGVmaW5lZCA9PiB7XG4gICAgICBlbnYubG9nKGBCdW5kbGluZyAnJHtjLmN5YW4oZmlsZUZpbHRlci5leGVjKG8ucGF0aCkhWzFdKX0nYCwgeyBjdHg6ICdlc2J1aWxkJyB9KTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSk7XG4gIH0sXG59OyovXG5cbmNvbnN0IG9uRW5kUGx1Z2luID0ge1xuICBuYW1lOiAnbGljaGVzc09uRW5kJyxcbiAgc2V0dXAoYnVpbGQ6IGVzLlBsdWdpbkJ1aWxkKSB7XG4gICAgYnVpbGQub25FbmQoKHJlc3VsdDogZXMuQnVpbGRSZXN1bHQpID0+IHtcbiAgICAgIGZvciAoY29uc3QgZXJyIG9mIHJlc3VsdC5lcnJvcnMpIHtcbiAgICAgICAgZXNidWlsZE1lc3NhZ2UoZXJyLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3Qgd2FybiBvZiByZXN1bHQud2FybmluZ3MpIHtcbiAgICAgICAgZXNidWlsZE1lc3NhZ2Uod2Fybik7XG4gICAgICB9XG4gICAgICBlbnYuZG9uZShyZXN1bHQuZXJyb3JzLmxlbmd0aCwgJ2VzYnVpbGQnKTtcbiAgICB9KTtcbiAgfSxcbn07XG5cbmZ1bmN0aW9uIGVzYnVpbGRNZXNzYWdlKG1zZzogZXMuTWVzc2FnZSwgZXJyb3IgPSBmYWxzZSkge1xuICBjb25zdCBmaWxlID0gbXNnLmxvY2F0aW9uPy5maWxlLnJlcGxhY2UoL15bLi9dKi8sICcnKSA/PyAnPHVua25vd24+JztcbiAgY29uc3QgbGluZSA9IG1zZy5sb2NhdGlvbj8ubGluZSA/IGBsaW5lICR7bXNnLmxvY2F0aW9uLmxpbmV9IG9mIGAgOiAnJztcbiAgY29uc3Qgc3JjVGV4dCA9IG1zZy5sb2NhdGlvbj8ubGluZVRleHQ7XG4gIGVudi5sb2coYCR7ZXJyb3IgPyBlcnJvck1hcmsgOiBjLndhcm4oJ1dBUk5JTkcnKX0gLSAke2xpbmV9JyR7Yy5jeWFuKGZpbGUpfSc6ICR7bXNnLnRleHR9YCwgeyBjdHg6ICdlc2J1aWxkJyB9KTtcbiAgaWYgKHNyY1RleHQpIGVudi5sb2coJyAgJyArIGMubWFnZW50YShzcmNUZXh0KSwgeyBjdHg6ICdlc2J1aWxkJyB9KTtcbn1cbiJdfQ==