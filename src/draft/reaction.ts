/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Reaction
 */

import { CHANGE_TYPE } from "../declare";

export type ReactionConfig = {

    readonly by: string;
    readonly bulletId: string;
    readonly reaction: string;
};

export type ReactionChange = {

    readonly action: CHANGE_TYPE.REACTION;
    readonly at: Date;
} & ReactionConfig;

export const draftReactionChange = (config: ReactionConfig): ReactionChange => {

    return {

        action: CHANGE_TYPE.REACTION,
        at: new Date(),
        by: config.by,
        bulletId: config.bulletId,
        reaction: config.reaction,
    };
};
