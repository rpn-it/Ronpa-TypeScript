"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.draftAddThesisChange = void 0;
const random_1 = require("@sudoo/random");
const declare_1 = require("../declare");
exports.draftAddThesisChange = (config) => {
    return {
        action: declare_1.RONPA_ACTION.ADD_THESIS,
        id: random_1.randomUnique(),
        at: new Date(),
        by: config.by,
        story: random_1.randomUnique(),
        content: config.content,
        type: config.type,
        thesis: {
            insiders: config.insiders,
        },
    };
};
