/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Thesis
 */

import { randomUnique } from "@sudoo/random";
import { CHANGE_TYPE, ContentType, FlatThesisRecord, RECORD_TYPE } from "../declare";

export type ThesisConfig<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {

    readonly by: string;
    readonly content: ContentType<T>;
    readonly insiders: string[];
    readonly type: T;
};

export type ThesisChange<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {

    readonly action: CHANGE_TYPE.THESIS;
} & FlatThesisRecord<T>;

export const draftThesisChange = <T extends RECORD_TYPE = RECORD_TYPE.TEXT>(config: ThesisConfig<T>): ThesisChange<T> => {

    return {

        action: CHANGE_TYPE.THESIS,
        id: randomUnique(),
        at: new Date(),
        by: config.by,
        story: randomUnique(),
        content: config.content,
        type: config.type,
        thesis: {
            insiders: config.insiders,
        },
    };
};
