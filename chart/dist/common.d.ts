import { PlyChart } from './interface';
export interface MovePoint {
    y: number | null;
    x?: number;
    name?: any;
    marker?: any;
}
export declare function selectPly(this: PlyChart, ply: number, onMainline: boolean): void;
export declare function loadHighcharts(tpe: string): Promise<any>;
