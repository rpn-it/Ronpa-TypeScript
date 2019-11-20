/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Reaction
 */

import { RONPA_ACTION } from "../declare";

export type AddReactionConfig = {

    readonly by: string;
    readonly bulletId: string;
    readonly reaction: string;
};

export type AddReactionChange = {

    readonly action: RONPA_ACTION.ADD_REACTION;
    readonly at: Date;
} & AddReactionConfig;

export const draftAddReactionChange = (config: AddReactionConfig): AddReactionChange => {

    return {

        action: RONPA_ACTION.ADD_REACTION,
        at: new Date(),
        by: config.by,
        bulletId: config.bulletId,
        reaction: config.reaction,
    };
};

export type RemoveReactionConfig = {

    readonly by: string;
    readonly bulletId: string;
    readonly reaction: string;
};

export type RemoveReactionChange = {

    readonly action: RONPA_ACTION.REMOVE_REACTION;
    readonly at: Date;
} & RemoveReactionConfig;

export const draftRemoveReactionChange = (config: RemoveReactionConfig): RemoveReactionChange => {

    return {

        action: RONPA_ACTION.REMOVE_REACTION,
        at: new Date(),
        by: config.by,
        bulletId: config.bulletId,
        reaction: config.reaction,
    };
};
