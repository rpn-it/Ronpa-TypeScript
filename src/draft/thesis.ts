/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Thesis
 */

import { randomUnique } from "@sudoo/random";
import { ContentType, FlatThesisRecord, RECORD_TYPE, RONPA_ACTION } from "../declare";

export type ThesisConfig<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {

    readonly by: string;
    readonly content: ContentType<T>;
    readonly insiders: string[];
    readonly type: T;
};

export type ThesisChange<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {

    readonly action: RONPA_ACTION.ADD_THESIS;
} & FlatThesisRecord<T>;

export const draftThesisChange = <T extends RECORD_TYPE = RECORD_TYPE.TEXT>(config: ThesisConfig<T>): ThesisChange<T> => {

    return {

        action: RONPA_ACTION.ADD_THESIS,
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
