import resizeHandle from 'common/resize';
import * as Prefs from 'common/prefs';
export function makeConfig(opts, pref, userMove) {
    return {
        fen: opts.fen,
        orientation: opts.orientation,
        turnColor: opts.turnColor,
        check: opts.check,
        lastMove: opts.lastMove,
        coordinates: pref.coords !== Prefs.Coords.Hidden,
        addPieceZIndex: pref.is3d,
        addDimensionsCssVarsTo: document.body,
        movable: {
            free: false,
            color: opts.movable.color,
            dests: opts.movable.dests,
            showDests: pref.destination,
            rookCastle: pref.rookCastle,
        },
        draggable: {
            enabled: pref.moveEvent > 0,
            showGhost: pref.highlight,
        },
        selectable: {
            enabled: pref.moveEvent !== 1,
        },
        events: {
            move: userMove,
            insert(elements) {
                resizeHandle(elements, Prefs.ShowResizeHandle.OnlyAtStart, 0, p => p == 0);
            },
        },
        premovable: {
            enabled: false,
        },
        drawable: {
            enabled: true,
            defaultSnapToValidMove: lichess.storage.boolean('arrow.snap').getOrDefault(true),
        },
        highlight: {
            lastMove: pref.highlight,
            check: pref.highlight,
        },
        animation: {
            duration: pref.animation,
        },
        disableContextMenu: true,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlc3Nncm91bmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlldy9jaGVzc2dyb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSxlQUFlLENBQUM7QUFHekMsT0FBTyxLQUFLLEtBQUssTUFBTSxjQUFjLENBQUM7QUFFdEMsTUFBTSxVQUFVLFVBQVUsQ0FBQyxJQUFjLEVBQUUsSUFBYyxFQUFFLFFBQWtCO0lBQzNFLE9BQU87UUFDTCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7UUFDYixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7UUFDN0IsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1FBQ3pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztRQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7UUFDdkIsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLEtBQUssS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNO1FBQ2hELGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSTtRQUN6QixzQkFBc0IsRUFBRSxRQUFRLENBQUMsSUFBSTtRQUNyQyxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsS0FBSztZQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBUSxDQUFDLEtBQUs7WUFDMUIsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFRLENBQUMsS0FBSztZQUMxQixTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDM0IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1NBQzVCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQztZQUMzQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDMUI7UUFDRCxVQUFVLEVBQUU7WUFDVixPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDO1NBQzlCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxNQUFNLENBQUMsUUFBUTtnQkFDYixZQUFZLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdFLENBQUM7U0FDRjtRQUNELFVBQVUsRUFBRTtZQUNWLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRCxRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUUsSUFBSTtZQUNiLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7U0FDakY7UUFDRCxTQUFTLEVBQUU7WUFDVCxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3RCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3pCO1FBQ0Qsa0JBQWtCLEVBQUUsSUFBSTtLQUN6QixDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCByZXNpemVIYW5kbGUgZnJvbSAnY29tbW9uL3Jlc2l6ZSc7XG5pbXBvcnQgeyBDb25maWcgYXMgQ2dDb25maWcgfSBmcm9tICdjaGVzc2dyb3VuZC9jb25maWcnO1xuaW1wb3J0IHsgUHV6UHJlZnMsIFVzZXJNb3ZlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgKiBhcyBQcmVmcyBmcm9tICdjb21tb24vcHJlZnMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUNvbmZpZyhvcHRzOiBDZ0NvbmZpZywgcHJlZjogUHV6UHJlZnMsIHVzZXJNb3ZlOiBVc2VyTW92ZSk6IENnQ29uZmlnIHtcbiAgcmV0dXJuIHtcbiAgICBmZW46IG9wdHMuZmVuLFxuICAgIG9yaWVudGF0aW9uOiBvcHRzLm9yaWVudGF0aW9uLFxuICAgIHR1cm5Db2xvcjogb3B0cy50dXJuQ29sb3IsXG4gICAgY2hlY2s6IG9wdHMuY2hlY2ssXG4gICAgbGFzdE1vdmU6IG9wdHMubGFzdE1vdmUsXG4gICAgY29vcmRpbmF0ZXM6IHByZWYuY29vcmRzICE9PSBQcmVmcy5Db29yZHMuSGlkZGVuLFxuICAgIGFkZFBpZWNlWkluZGV4OiBwcmVmLmlzM2QsXG4gICAgYWRkRGltZW5zaW9uc0Nzc1ZhcnNUbzogZG9jdW1lbnQuYm9keSxcbiAgICBtb3ZhYmxlOiB7XG4gICAgICBmcmVlOiBmYWxzZSxcbiAgICAgIGNvbG9yOiBvcHRzLm1vdmFibGUhLmNvbG9yLFxuICAgICAgZGVzdHM6IG9wdHMubW92YWJsZSEuZGVzdHMsXG4gICAgICBzaG93RGVzdHM6IHByZWYuZGVzdGluYXRpb24sXG4gICAgICByb29rQ2FzdGxlOiBwcmVmLnJvb2tDYXN0bGUsXG4gICAgfSxcbiAgICBkcmFnZ2FibGU6IHtcbiAgICAgIGVuYWJsZWQ6IHByZWYubW92ZUV2ZW50ID4gMCxcbiAgICAgIHNob3dHaG9zdDogcHJlZi5oaWdobGlnaHQsXG4gICAgfSxcbiAgICBzZWxlY3RhYmxlOiB7XG4gICAgICBlbmFibGVkOiBwcmVmLm1vdmVFdmVudCAhPT0gMSxcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgbW92ZTogdXNlck1vdmUsXG4gICAgICBpbnNlcnQoZWxlbWVudHMpIHtcbiAgICAgICAgcmVzaXplSGFuZGxlKGVsZW1lbnRzLCBQcmVmcy5TaG93UmVzaXplSGFuZGxlLk9ubHlBdFN0YXJ0LCAwLCBwID0+IHAgPT0gMCk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgcHJlbW92YWJsZToge1xuICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgfSxcbiAgICBkcmF3YWJsZToge1xuICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIGRlZmF1bHRTbmFwVG9WYWxpZE1vdmU6IGxpY2hlc3Muc3RvcmFnZS5ib29sZWFuKCdhcnJvdy5zbmFwJykuZ2V0T3JEZWZhdWx0KHRydWUpLFxuICAgIH0sXG4gICAgaGlnaGxpZ2h0OiB7XG4gICAgICBsYXN0TW92ZTogcHJlZi5oaWdobGlnaHQsXG4gICAgICBjaGVjazogcHJlZi5oaWdobGlnaHQsXG4gICAgfSxcbiAgICBhbmltYXRpb246IHtcbiAgICAgIGR1cmF0aW9uOiBwcmVmLmFuaW1hdGlvbixcbiAgICB9LFxuICAgIGRpc2FibGVDb250ZXh0TWVudTogdHJ1ZSxcbiAgfTtcbn1cbiJdfQ==