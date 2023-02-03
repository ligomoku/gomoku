import { getNow } from './util';
export class Clock {
    constructor(config, startedMillisAgo = 0) {
        this.config = config;
        this.start = () => {
            if (!this.startAt)
                this.startAt = getNow();
        };
        this.started = () => !!this.startAt;
        this.millis = () => this.startAt ? Math.max(0, this.startAt + this.initialMillis - getNow()) : this.initialMillis;
        this.addSeconds = (seconds) => {
            this.initialMillis += seconds * 1000;
        };
        this.flag = () => !this.millis();
        this.initialMillis = config.clock.initial * 1000 - (startedMillisAgo || 0);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2xvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUVoQyxNQUFNLE9BQU8sS0FBSztJQUloQixZQUE0QixNQUFjLEVBQUUsbUJBQXVDLENBQUM7UUFBeEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUkxQyxVQUFLLEdBQUcsR0FBRyxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO2dCQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxFQUFFLENBQUM7UUFDN0MsQ0FBQyxDQUFDO1FBRUYsWUFBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRS9CLFdBQU0sR0FBRyxHQUFXLEVBQUUsQ0FDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7UUFFaEcsZUFBVSxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztRQUVGLFNBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQWhCMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0NBZ0JGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IGdldE5vdyB9IGZyb20gJy4vdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBDbG9jayB7XG4gIHN0YXJ0QXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgaW5pdGlhbE1pbGxpczogbnVtYmVyO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihyZWFkb25seSBjb25maWc6IENvbmZpZywgc3RhcnRlZE1pbGxpc0FnbzogbnVtYmVyIHwgdW5kZWZpbmVkID0gMCkge1xuICAgIHRoaXMuaW5pdGlhbE1pbGxpcyA9IGNvbmZpZy5jbG9jay5pbml0aWFsICogMTAwMCAtIChzdGFydGVkTWlsbGlzQWdvIHx8IDApO1xuICB9XG5cbiAgc3RhcnQgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXJ0QXQpIHRoaXMuc3RhcnRBdCA9IGdldE5vdygpO1xuICB9O1xuXG4gIHN0YXJ0ZWQgPSAoKSA9PiAhIXRoaXMuc3RhcnRBdDtcblxuICBtaWxsaXMgPSAoKTogbnVtYmVyID0+XG4gICAgdGhpcy5zdGFydEF0ID8gTWF0aC5tYXgoMCwgdGhpcy5zdGFydEF0ICsgdGhpcy5pbml0aWFsTWlsbGlzIC0gZ2V0Tm93KCkpIDogdGhpcy5pbml0aWFsTWlsbGlzO1xuXG4gIGFkZFNlY29uZHMgPSAoc2Vjb25kczogbnVtYmVyKSA9PiB7XG4gICAgdGhpcy5pbml0aWFsTWlsbGlzICs9IHNlY29uZHMgKiAxMDAwO1xuICB9O1xuXG4gIGZsYWcgPSAoKSA9PiAhdGhpcy5taWxsaXMoKTtcbn1cbiJdfQ==