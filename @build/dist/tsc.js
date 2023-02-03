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
exports.tsc = void 0;
const fs = __importStar(require("node:fs"));
const cps = __importStar(require("node:child_process"));
const path = __importStar(require("node:path"));
const build_1 = require("./build");
const main_1 = require("./main");
async function tsc(onSuccess) {
    var _a, _b;
    if (!main_1.env.tsc)
        return onSuccess();
    const cfgPath = path.join(main_1.env.buildDir, 'dist', 'build.tsconfig.json');
    const cfg = { files: [] };
    cfg.references = build_1.buildModules.filter(x => x.hasTsconfig).map(x => ({ path: path.join(x.root, 'tsconfig.json') }));
    await fs.promises.writeFile(cfgPath, JSON.stringify(cfg));
    const tsc = cps.spawn('tsc', ['-b', cfgPath].concat(main_1.env.watch ? ['-w', '--preserveWatchOutput'] : ['--force']));
    main_1.env.log(`Checking typescript`, { ctx: 'tsc' });
    (_a = tsc.stdout) === null || _a === void 0 ? void 0 : _a.on('data', (buf) => {
        // no way to magically get build events...
        const txts = (0, main_1.lines)(buf.toString('utf8'));
        for (const txt of txts) {
            if (txt.includes('Found 0 errors')) {
                if (!main_1.env.exitCode.has('tsc'))
                    onSuccess();
                main_1.env.done(0, 'tsc');
            }
            else {
                tscLog(txt);
            }
        }
    });
    (_b = tsc.stderr) === null || _b === void 0 ? void 0 : _b.on('data', txt => main_1.env.log(txt, { ctx: 'tsc', error: true }));
    tsc.addListener('close', code => {
        main_1.env.done(code || 0, 'tsc');
        if (code) {
            main_1.env.done(code, 'esbuild'); // fail both
        }
        else
            onSuccess();
    });
}
exports.tsc = tsc;
function tscLog(text) {
    if (text.includes('File change detected') || text.includes('Starting compilation'))
        return; // redundant
    text = text.replace(/\d?\d:\d\d:\d\d (PM|AM) - /, '');
    if (text.match(/: error TS\d\d\d\d/)) {
        // strip the ../../../../.. junk, highlight error
        text = `${main_1.errorMark} - ${text.replace(/^[./]*/, '')}`;
    }
    main_1.env.log(text.replace('. Watching for file changes.', ` - ${main_1.colors.grey('Watching')}...`), { ctx: 'tsc' });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3RzYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRDQUE4QjtBQUM5Qix3REFBMEM7QUFDMUMsZ0RBQWtDO0FBQ2xDLG1DQUF1QztBQUN2QyxpQ0FBNEQ7QUFFckQsS0FBSyxVQUFVLEdBQUcsQ0FBQyxTQUFxQjs7SUFDN0MsSUFBSSxDQUFDLFVBQUcsQ0FBQyxHQUFHO1FBQUUsT0FBTyxTQUFTLEVBQUUsQ0FBQztJQUVqQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLHFCQUFxQixDQUFDLENBQUM7SUFDdkUsTUFBTSxHQUFHLEdBQVEsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDL0IsR0FBRyxDQUFDLFVBQVUsR0FBRyxvQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNsSCxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFMUQsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWhILFVBQUcsQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUUvQyxNQUFBLEdBQUcsQ0FBQyxNQUFNLDBDQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFXLEVBQUUsRUFBRTtRQUNyQywwQ0FBMEM7UUFDMUMsTUFBTSxJQUFJLEdBQUcsSUFBQSxZQUFLLEVBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUNsQyxJQUFJLENBQUMsVUFBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO29CQUFFLFNBQVMsRUFBRSxDQUFDO2dCQUMxQyxVQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNwQjtpQkFBTTtnQkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDYjtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFBLEdBQUcsQ0FBQyxNQUFNLDBDQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxVQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN6RSxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTtRQUM5QixVQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDM0IsSUFBSSxJQUFJLEVBQUU7WUFDUixVQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVk7U0FDeEM7O1lBQU0sU0FBUyxFQUFFLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBL0JELGtCQStCQztBQUVELFNBQVMsTUFBTSxDQUFDLElBQVk7SUFDMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQztRQUFFLE9BQU8sQ0FBQyxZQUFZO0lBQ3hHLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLDRCQUE0QixFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1FBQ3BDLGlEQUFpRDtRQUNqRCxJQUFJLEdBQUcsR0FBRyxnQkFBUyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7S0FDdkQ7SUFDRCxVQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsOEJBQThCLEVBQUUsTUFBTSxhQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tICdub2RlOmZzJztcbmltcG9ydCAqIGFzIGNwcyBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgYnVpbGRNb2R1bGVzIH0gZnJvbSAnLi9idWlsZCc7XG5pbXBvcnQgeyBlbnYsIGNvbG9ycyBhcyBjLCBlcnJvck1hcmssIGxpbmVzIH0gZnJvbSAnLi9tYWluJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRzYyhvblN1Y2Nlc3M6ICgpID0+IHZvaWQpIHtcbiAgaWYgKCFlbnYudHNjKSByZXR1cm4gb25TdWNjZXNzKCk7XG5cbiAgY29uc3QgY2ZnUGF0aCA9IHBhdGguam9pbihlbnYuYnVpbGREaXIsICdkaXN0JywgJ2J1aWxkLnRzY29uZmlnLmpzb24nKTtcbiAgY29uc3QgY2ZnOiBhbnkgPSB7IGZpbGVzOiBbXSB9O1xuICBjZmcucmVmZXJlbmNlcyA9IGJ1aWxkTW9kdWxlcy5maWx0ZXIoeCA9PiB4Lmhhc1RzY29uZmlnKS5tYXAoeCA9PiAoeyBwYXRoOiBwYXRoLmpvaW4oeC5yb290LCAndHNjb25maWcuanNvbicpIH0pKTtcbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKGNmZ1BhdGgsIEpTT04uc3RyaW5naWZ5KGNmZykpO1xuXG4gIGNvbnN0IHRzYyA9IGNwcy5zcGF3bigndHNjJywgWyctYicsIGNmZ1BhdGhdLmNvbmNhdChlbnYud2F0Y2ggPyBbJy13JywgJy0tcHJlc2VydmVXYXRjaE91dHB1dCddIDogWyctLWZvcmNlJ10pKTtcblxuICBlbnYubG9nKGBDaGVja2luZyB0eXBlc2NyaXB0YCwgeyBjdHg6ICd0c2MnIH0pO1xuXG4gIHRzYy5zdGRvdXQ/Lm9uKCdkYXRhJywgKGJ1ZjogQnVmZmVyKSA9PiB7XG4gICAgLy8gbm8gd2F5IHRvIG1hZ2ljYWxseSBnZXQgYnVpbGQgZXZlbnRzLi4uXG4gICAgY29uc3QgdHh0cyA9IGxpbmVzKGJ1Zi50b1N0cmluZygndXRmOCcpKTtcbiAgICBmb3IgKGNvbnN0IHR4dCBvZiB0eHRzKSB7XG4gICAgICBpZiAodHh0LmluY2x1ZGVzKCdGb3VuZCAwIGVycm9ycycpKSB7XG4gICAgICAgIGlmICghZW52LmV4aXRDb2RlLmhhcygndHNjJykpIG9uU3VjY2VzcygpO1xuICAgICAgICBlbnYuZG9uZSgwLCAndHNjJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0c2NMb2codHh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICB0c2Muc3RkZXJyPy5vbignZGF0YScsIHR4dCA9PiBlbnYubG9nKHR4dCwgeyBjdHg6ICd0c2MnLCBlcnJvcjogdHJ1ZSB9KSk7XG4gIHRzYy5hZGRMaXN0ZW5lcignY2xvc2UnLCBjb2RlID0+IHtcbiAgICBlbnYuZG9uZShjb2RlIHx8IDAsICd0c2MnKTtcbiAgICBpZiAoY29kZSkge1xuICAgICAgZW52LmRvbmUoY29kZSwgJ2VzYnVpbGQnKTsgLy8gZmFpbCBib3RoXG4gICAgfSBlbHNlIG9uU3VjY2VzcygpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdHNjTG9nKHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICBpZiAodGV4dC5pbmNsdWRlcygnRmlsZSBjaGFuZ2UgZGV0ZWN0ZWQnKSB8fCB0ZXh0LmluY2x1ZGVzKCdTdGFydGluZyBjb21waWxhdGlvbicpKSByZXR1cm47IC8vIHJlZHVuZGFudFxuICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXGQ/XFxkOlxcZFxcZDpcXGRcXGQgKFBNfEFNKSAtIC8sICcnKTtcbiAgaWYgKHRleHQubWF0Y2goLzogZXJyb3IgVFNcXGRcXGRcXGRcXGQvKSkge1xuICAgIC8vIHN0cmlwIHRoZSAuLi8uLi8uLi8uLi8uLiBqdW5rLCBoaWdobGlnaHQgZXJyb3JcbiAgICB0ZXh0ID0gYCR7ZXJyb3JNYXJrfSAtICR7dGV4dC5yZXBsYWNlKC9eWy4vXSovLCAnJyl9YDtcbiAgfVxuICBlbnYubG9nKHRleHQucmVwbGFjZSgnLiBXYXRjaGluZyBmb3IgZmlsZSBjaGFuZ2VzLicsIGAgLSAke2MuZ3JleSgnV2F0Y2hpbmcnKX0uLi5gKSwgeyBjdHg6ICd0c2MnIH0pO1xufVxuIl19