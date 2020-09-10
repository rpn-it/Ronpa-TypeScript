/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Ronpa Apply
 * @override Scenario
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { AddReplyChange, AddThesisChange, ChangeType, draftAddReactionChange, draftAddReplyChange, draftAddThesisChange, draftRemoveReactionChange, FlatRecord, Reaction, RECORD_TYPE, Ronpa, RONPA_ACTION } from '../../src';
import { createMockSimpleRecords } from '../mock/simple';

describe('Given {Ronpa} Class Apply Scenarios', (): void => {

    const chance: Chance.Chance = new Chance('scenario-ronpa-ronpa-apply');

    it('should be able to apply bullet add thesis change', (): void => {

        const storyId: string = chance.string();
        const bullet1Id: string = chance.string();
        const bullet2Id: string = chance.string();

        const originalRecords: FlatRecord[] = createMockSimpleRecords(
            chance,
            storyId,
            bullet1Id,
            bullet2Id,
        );

        const ronpa = Ronpa.rebuild(originalRecords);

        expect(ronpa).to.be.lengthOf(2);

        const username: string = chance.string();
        const content: string = chance.string();

        const change: AddThesisChange = draftAddThesisChange({

            by: username,
            content,
            type: RECORD_TYPE.TEXT,
            insiders: [],
        });

        ronpa.apply(change);

        expect(ronpa).to.be.lengthOf(3);
        expect(ronpa.getThesisStories()).to.be.lengthOf(2);
        expect(ronpa.flat()).to.be.not.deep.equal(originalRecords);
    });

    it('should be able to apply bullet add reply change', (): void => {

        const storyId: string = chance.string();
        const bullet1Id: string = chance.string();
        const bullet2Id: string = chance.string();

        const originalRecords: FlatRecord[] = createMockSimpleRecords(
            chance,
            storyId,
            bullet1Id,
            bullet2Id,
        );

        const ronpa = Ronpa.rebuild(originalRecords);

        expect(ronpa).to.be.lengthOf(2);

        const username: string = chance.string();
        const content: string = chance.string();

        const change: AddReplyChange = draftAddReplyChange({

            by: username,
            content,
            type: RECORD_TYPE.TEXT,
            story: storyId,
        });

        ronpa.apply(change);

        expect(ronpa).to.be.lengthOf(3);
        expect(ronpa.getThesisStories()).to.be.lengthOf(1);
        expect(ronpa.flat()).to.be.not.deep.equal(originalRecords);
    });

    it('should be able to apply bullet add reaction change', (): void => {

        const storyId: string = chance.string();
        const bullet1Id: string = chance.string();
        const bullet2Id: string = chance.string();

        const originalRecords: FlatRecord[] = createMockSimpleRecords(
            chance,
            storyId,
            bullet1Id,
            bullet2Id,
        );

        const ronpa = Ronpa.rebuild(originalRecords);

        expect(ronpa).to.be.lengthOf(2);

        const reactionCreatUser: string = chance.string();
        const reaction: string = chance.string();

        const change: ChangeType<RONPA_ACTION.ADD_REACTION> = draftAddReactionChange({

            by: reactionCreatUser,
            bulletId: bullet1Id,
            reaction,
        });

        ronpa.apply(change);

        expect(ronpa).to.be.lengthOf(2);
        expect(ronpa.flat()).to.be.not.deep.equal(originalRecords);

        const reactions: Reaction[] = ronpa.assertBullet(bullet1Id).reactions;

        expect(reactions).to.be.lengthOf(1);
        expect((reactions[0]).by).to.be.equal(reactionCreatUser);
        expect((reactions[0]).type).to.be.equal(reaction);
    });

    it('should be able to apply bullet remove reaction change', (): void => {

        const storyId: string = chance.string();
        const bullet1Id: string = chance.string();
        const bullet2Id: string = chance.string();

        const originalRecords: FlatRecord[] = createMockSimpleRecords(
            chance,
            storyId,
            bullet1Id,
            bullet2Id,
        );

        const ronpa = Ronpa.rebuild(originalRecords);
        const bullet = ronpa.ensureBullet(bullet1Id);

        const reactionCreatUser: string = chance.string();
        const reaction: string = chance.string();

        bullet.addReaction(reactionCreatUser, reaction);

        expect(bullet.reactions).to.be.lengthOf(1);

        const change: ChangeType<RONPA_ACTION.REMOVE_REACTION> = draftRemoveReactionChange({

            by: reactionCreatUser,
            bulletId: bullet1Id,
            reaction,
        });

        ronpa.apply(change);

        expect(bullet.reactions).to.be.lengthOf(0);
    });
});
