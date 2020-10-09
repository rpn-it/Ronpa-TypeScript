"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.draftAddReplyChange = void 0;
const random_1 = require("@sudoo/random");
const declare_1 = require("../declare");
exports.draftAddReplyChange = (config) => {
    return {
        action: declare_1.RONPA_ACTION.ADD_REPLY,
        id: random_1.randomUnique(),
        at: new Date(),
        by: config.by,
        reply: config.reply,
        story: config.story,
        content: config.content,
        type: config.type,
    };
};
