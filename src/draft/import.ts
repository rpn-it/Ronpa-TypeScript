/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Import
 */

import { CHANGE_TYPE, RECORD_TYPE } from "../declare";
import { ThesisChange } from "./thesis";

export type ChangeType<C extends CHANGE_TYPE, T extends RECORD_TYPE = RECORD_TYPE.TEXT> =
    C extends CHANGE_TYPE.THESIS ? ThesisChange<T>
    : never;

export * from "./thesis";

