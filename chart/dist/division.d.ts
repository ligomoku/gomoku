/// <reference types="lichess" />
import { Division } from './interface';
export default function (div: Division | undefined, trans: Trans): ({
    color: any;
    width: number;
    value: number;
    zIndex: number;
    label?: undefined;
} | {
    label: {
        text: string;
        verticalAlign: string;
        align: string;
        y: number;
        style: {
            color: any;
        };
    };
    color: any;
    width: number;
    value: number;
    zIndex: number;
})[];
