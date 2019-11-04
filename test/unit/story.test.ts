/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Story
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { FlatRecord, Story } from '../../src';
import { createStoryRecords, createThesisStoryRecords } from '../mock/records';

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

    it('should be able to add insider - error', (): void => {

        const records: FlatRecord[] = createStoryRecords(chance);
        const story = Story.fromRecords(records);

        const insider1: string = chance.string();

        const exec = () => {
            story.addInsiders(insider1);
        };

        expect(exec).to.be.throw('Thesis Not Exist');
    });

    it('should be able to add insider - simple', (): void => {

        const records: FlatRecord[] = createThesisStoryRecords(chance);
        const story = Story.fromRecords(records);

        const insider1: string = chance.string();

        story.addInsiders(insider1);

        expect(story.getThesis().insiders).to.be.lengthOf(1);
    });

    it('should be able to add insider - duplicate', (): void => {

        const records: FlatRecord[] = createThesisStoryRecords(chance);
        const story = Story.fromRecords(records);

        const insider1: string = chance.string();
        const insider2: string = chance.string();

        story.addInsiders(insider1, insider2);
        story.addInsiders(insider2, insider2);

        expect(story.getThesis().insiders).to.be.lengthOf(2);
    });
});
