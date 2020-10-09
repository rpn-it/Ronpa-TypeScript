import { ContentType, FlatThesisRecord, RECORD_TYPE, RONPA_ACTION } from "../declare";
export declare type AddThesisConfig<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {
    readonly by: string;
    readonly content: ContentType<T>;
    readonly insiders: string[];
    readonly type: T;
};
export declare type AddThesisChange<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {
    readonly action: RONPA_ACTION.ADD_THESIS;
} & FlatThesisRecord<T>;
export declare const draftAddThesisChange: <T extends RECORD_TYPE = RECORD_TYPE.TEXT>(config: AddThesisConfig<T>) => AddThesisChange<T>;
