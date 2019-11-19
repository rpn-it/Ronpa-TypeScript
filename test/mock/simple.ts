/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Simple
 * @override Mock
 */

import { FlatRecord } from "../../src";

export const createMockSimpleRecords = (chance: Chance.Chance, storyId: string, bullet1Id: string, bullet2Id: string): FlatRecord[] => {

    return [
        {
            id: bullet1Id,
            at: new Date(),
            by: chance.string(),
            story: storyId,
            content: chance.string(),
            thesis: {
                insiders: [],
                extras: {
                    [chance.string()]: chance.string(),
                },
            },
        },
        {
            id: bullet2Id,
            at: new Date(),
            by: chance.string(),
            story: storyId,
            content: chance.string(),
        },
    ];
};
