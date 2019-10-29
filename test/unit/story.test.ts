/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Story
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { FlatRecord, Story } from '../../src';
import { createStoryRecords } from '../mock/records';

describe('Given {Story} Class', (): void => {

    const chance: Chance.Chance = new Chance('ronpa-story');

    it('should be able to create story instance', (): void => {

        const story = Story.create();

        expect(story).to.be.instanceOf(Story);
    });

    it('should be able to create with records', (): void => {

        const records: FlatRecord[] = createStoryRecords(chance);
        const story = Story.fromRecords(records);

        expect(story).to.be.lengthOf(records.length);
    });
});
