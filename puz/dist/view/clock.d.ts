import { VNode } from 'snabbdom';
import { Run } from '../interfaces';
type OnFlag = () => void;
export default function renderClock(run: Run, onFlag: OnFlag, withBonus: boolean): VNode;
export {};
