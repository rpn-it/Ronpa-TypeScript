/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Declare
 */

export type Reaction = {

    readonly at: Date;
    readonly by: string;
    readonly type: string;
};

export type Thesis = {

    readonly insiders: string[];
};

export enum RECORD_TYPE {

    TEXT = "TEXT",
    FILE = "FILE",
    HTML = "HTML",
}

export type ContentType<T extends RECORD_TYPE = RECORD_TYPE.TEXT> =
    T extends RECORD_TYPE.TEXT ? string
    : T extends RECORD_TYPE.FILE ? {
        readonly path: string,
        readonly originalName: string,
    }
    : T extends RECORD_TYPE.FILE ? string
    : never;

export type FlatRecord<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {

    readonly id: string;
    readonly at: Date;
    readonly by: string;
    readonly story: string;
    readonly content: ContentType<T>;

    readonly thesis?: Thesis;

    readonly type?: RECORD_TYPE;
    readonly reactions?: Reaction[];
    readonly extras?: Record<string, any>;
};
