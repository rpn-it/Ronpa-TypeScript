import { RONPA_ACTION } from "../declare";
export declare type AddReactionConfig = {
    readonly by: string;
    readonly bulletId: string;
    readonly reaction: string;
};
export declare type AddReactionChange = {
    readonly action: RONPA_ACTION.ADD_REACTION;
    readonly at: Date;
} & AddReactionConfig;
export declare const draftAddReactionChange: (config: AddReactionConfig) => AddReactionChange;
export declare type RemoveReactionConfig = {
    readonly by: string;
    readonly bulletId: string;
    readonly reaction: string;
};
export declare type RemoveReactionChange = {
    readonly action: RONPA_ACTION.REMOVE_REACTION;
    readonly at: Date;
} & RemoveReactionConfig;
export declare const draftRemoveReactionChange: (config: RemoveReactionConfig) => RemoveReactionChange;
