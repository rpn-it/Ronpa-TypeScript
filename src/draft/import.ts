/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Import
 */

import { CHANGE_TYPE, RECORD_TYPE } from "../declare";
import { ReactionChange } from "./reaction";
import { ThesisChange } from "./thesis";

export type ChangeType<C extends CHANGE_TYPE, T extends RECORD_TYPE = RECORD_TYPE.TEXT> =
    C extends CHANGE_TYPE.THESIS ? ThesisChange<T>
    : C extends CHANGE_TYPE.REACTION ? ReactionChange
    : never;

export * from "./reaction";
export * from "./thesis";

