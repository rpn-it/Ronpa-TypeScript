/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Record
 * @override Mock
 */

import { FlatRecord } from "../../src";

export const createMockRecords = (chance: Chance.Chance): FlatRecord[] => {

    const story1: string = chance.string();
    const story2: string = chance.string();

    return [
        {
            id: chance.string(),
            at: new Date(),
            by: chance.string(),
            story: story1,
            content: chance.string(),
        },
        {
            id: chance.string(),
            at: new Date(),
            by: chance.string(),
            story: story1,
            content: chance.string(),
        },
        {
            id: chance.string(),
            at: new Date(),
            by: chance.string(),
            story: story2,
            content: chance.string(),
        },
        {
            id: chance.string(),
            at: new Date(),
            by: chance.string(),
            story: story2,
            content: chance.string(),
        },
    ];
};

export const createStoryRecords = (chance: Chance.Chance): FlatRecord[] => {

    const story: string = chance.string();

    return [
        {
            id: chance.string(),
            at: new Date(),
            by: chance.string(),
            story,
            content: chance.string(),
        },
        {
            id: chance.string(),
            at: new Date(),
            by: chance.string(),
            story,
            content: chance.string(),
        },
        {
            id: chance.string(),
            at: new Date(),
            by: chance.string(),
            story,
            content: chance.string(),
        },
    ];
};

