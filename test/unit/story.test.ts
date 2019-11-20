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

        expect(exec).to.be.throw('[Ronpa] Thesis Does Not Exist');
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

    it('should be able to remove insider', (): void => {

        const records: FlatRecord[] = createThesisStoryRecords(chance);
        const story = Story.fromRecords(records);

        const insider1: string = chance.string();
        const insider2: string = chance.string();

        story.addInsiders(insider1, insider2);

        expect(story.getThesis().insiders).to.be.lengthOf(2);

        story.removeInsiders(insider2);

        expect(story.getThesis().insiders).to.be.lengthOf(1);
    });

    it('should be able to set extra', (): void => {

        const records: FlatRecord[] = createThesisStoryRecords(chance);
        const story = Story.fromRecords(records);

        const key: string = chance.string();
        const value: string = chance.string();

        expect(Object.keys(story.getExtras())).to.be.lengthOf(1);

        story.setExtra(key, value);

        expect(Object.keys(story.getExtras())).to.be.lengthOf(2);
    });

    it('should be able to compare story - sad', (): void => {

        const records: FlatRecord[] = createStoryRecords(chance);
        const by: string = chance.string();
        const content: string = chance.string();

        const story = Story.fromRecords(records);
        story.createBullet(by, content);

        const another = Story.fromRecords(records);
        another.createBullet(by, content);

        // tslint:disable-next-line: no-unused-expression
        expect(another.equals(story)).to.be.false;
    });

    it('should be able to compare story - happy', (): void => {

        const records: FlatRecord[] = createStoryRecords(chance);
        const by: string = chance.string();
        const content: string = chance.string();

        const story = Story.fromRecords(records);
        story.createBullet(by, content);

        const another = story.clone();

        // tslint:disable-next-line: no-unused-expression
        expect(another.equals(story)).to.be.true;
    });
});
