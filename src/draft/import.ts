/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Import
 */

import { RECORD_TYPE, RONPA_ACTION } from "../declare";
import { ReactionChange } from "./reaction";
import { ThesisChange } from "./thesis";

export type ChangeType<C extends RONPA_ACTION, T extends RECORD_TYPE = RECORD_TYPE.TEXT> =
    C extends RONPA_ACTION.ADD_THESIS ? ThesisChange<T>
    : C extends RONPA_ACTION.REACTION ? ReactionChange
    : never;

export * from "./reaction";
export * from "./thesis";

