import { ContentType, FlatRecord, RECORD_TYPE, RONPA_ACTION } from "../declare";
export declare type AddReplyConfig<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {
    readonly by: string;
    readonly content: ContentType<T>;
    readonly story: string;
    readonly reply?: string;
    readonly type: T;
};
export declare type AddReplyChange<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {
    readonly action: RONPA_ACTION.ADD_REPLY;
} & FlatRecord<T>;
export declare const draftAddReplyChange: <T extends RECORD_TYPE = RECORD_TYPE.TEXT>(config: AddReplyConfig<T>) => AddReplyChange<T>;
