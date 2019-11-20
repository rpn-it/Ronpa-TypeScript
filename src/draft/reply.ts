/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Reply
 */

import { randomUnique } from "@sudoo/random";
import { ContentType, FlatRecord, RECORD_TYPE, RONPA_ACTION } from "../declare";

export type AddReplyConfig<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {

    readonly by: string;
    readonly content: ContentType<T>;
    readonly story: string;
    readonly reply?: string;
    readonly type: T;
};

export type AddReplyChange<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {

    readonly action: RONPA_ACTION.ADD_REPLY;
} & FlatRecord<T>;

export const draftAddReplyChange = <T extends RECORD_TYPE = RECORD_TYPE.TEXT>(config: AddReplyConfig<T>): AddReplyChange<T> => {

    return {

        action: RONPA_ACTION.ADD_REPLY,
        id: randomUnique(),
        at: new Date(),
        by: config.by,
        reply: config.reply,
        story: config.story,
        content: config.content,
        type: config.type,
    };
};
