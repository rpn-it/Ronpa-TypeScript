export declare type Reaction = {
    readonly at: Date;
    readonly by: string;
    readonly type: string;
};
export declare type Thesis = {
    readonly insiders: string[];
    readonly extras?: Record<string, any>;
};
export declare enum RONPA_ACTION {
    ADD_THESIS = "ADD_THESIS",
    ADD_REPLY = "ADD_REPLY",
    ADD_REACTION = "ADD_REACTION",
    REMOVE_REACTION = "REMOVE_REACTION"
}
export declare enum RECORD_TYPE {
    TEXT = "TEXT",
    ATTACHMENT = "ATTACHMENT",
    FILE = "FILE",
    HTML = "HTML"
}
export declare type FileContent = {
    readonly id: string;
    readonly path: string;
    readonly originalName: string;
    readonly mimeType: string;
    readonly size: number;
    readonly lastModifyAt?: Date;
    readonly uploadedAt?: Date;
};
export declare type AttachmentContent = {
    readonly text: string;
    readonly files: FileContent[];
};
export declare type ContentType<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = T extends RECORD_TYPE.TEXT ? string : T extends RECORD_TYPE.ATTACHMENT ? AttachmentContent : T extends RECORD_TYPE.FILE ? FileContent[] : T extends RECORD_TYPE.HTML ? string : never;
export declare type EditHistory<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {
    readonly at: Date;
    readonly by: string;
    readonly before: ContentType<T>;
    readonly after: ContentType<T>;
};
export declare type Writeable<T> = {
    -readonly [P in keyof T]: T[P];
};
export declare type FlatRecord<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {
    readonly id: string;
    readonly at: Date;
    readonly by: string;
    readonly story: string;
    readonly content: ContentType<T>;
    readonly thesis?: Thesis;
    readonly type?: RECORD_TYPE;
    readonly reactions?: Reaction[];
    readonly editHistories?: Array<EditHistory<T>>;
    readonly reply?: string;
    readonly isRobot?: boolean;
    readonly isGenerated?: boolean;
    readonly extras?: Record<string, any>;
};
export declare type FlatThesisRecord<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {
    readonly thesis: Thesis;
} & FlatRecord<T>;
