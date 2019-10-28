/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Record
 * @override Mock
 */

import * as Chance from 'chance';
import { FlatRecord } from "../../src";

export const createMockRecords = (): FlatRecord[] => {

    const chance: Chance.Chance = new Chance('mock-ronpa-record');

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
