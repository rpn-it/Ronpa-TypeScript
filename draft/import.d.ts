import { RECORD_TYPE, RONPA_ACTION } from "../declare";
import { AddReactionChange, RemoveReactionChange } from "./reaction";
import { AddReplyChange } from "./reply";
import { AddThesisChange } from "./thesis";
export declare type ChangeType<C extends RONPA_ACTION, T extends RECORD_TYPE = RECORD_TYPE.TEXT> = C extends RONPA_ACTION.ADD_THESIS ? AddThesisChange<T> : C extends RONPA_ACTION.ADD_REPLY ? AddReplyChange<T> : C extends RONPA_ACTION.ADD_REACTION ? AddReactionChange : C extends RONPA_ACTION.REMOVE_REACTION ? RemoveReactionChange : never;
export * from "./reaction";
export * from "./reply";
export * from "./thesis";
