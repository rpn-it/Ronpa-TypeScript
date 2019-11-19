/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Reaction
 */

import { RONPA_ACTION } from "../declare";

export type ReactionConfig = {

    readonly by: string;
    readonly bulletId: string;
    readonly reaction: string;
};

export type ReactionChange = {

    readonly action: RONPA_ACTION.REACTION;
    readonly at: Date;
} & ReactionConfig;

export const draftReactionChange = (config: ReactionConfig): ReactionChange => {

    return {

        action: RONPA_ACTION.REACTION,
        at: new Date(),
        by: config.by,
        bulletId: config.bulletId,
        reaction: config.reaction,
    };
};
