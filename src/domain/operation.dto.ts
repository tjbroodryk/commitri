import { Change } from "./change.dto";

export type Operation = { source: string, output: string, changes: Change[] }