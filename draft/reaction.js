"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.draftRemoveReactionChange = exports.draftAddReactionChange = void 0;
const declare_1 = require("../declare");
exports.draftAddReactionChange = (config) => {
    return {
        action: declare_1.RONPA_ACTION.ADD_REACTION,
        at: new Date(),
        by: config.by,
        bulletId: config.bulletId,
        reaction: config.reaction,
    };
};
exports.draftRemoveReactionChange = (config) => {
    return {
        action: declare_1.RONPA_ACTION.REMOVE_REACTION,
        at: new Date(),
        by: config.by,
        bulletId: config.bulletId,
        reaction: config.reaction,
    };
};
