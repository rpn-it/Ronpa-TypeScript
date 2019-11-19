/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Ronpa Apply
 * @override Scenario
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { ChangeType, draftReactionChange, FlatRecord, Reaction, Ronpa, RONPA_ACTION } from '../../src';
import { createMockSimpleRecords } from '../mock/simple';

describe('Given {Ronpa} Class Apply Scenarios', (): void => {

    const chance: Chance.Chance = new Chance('scenario-ronpa-ronpa-apply');

    it('should be able to apply bullet reaction change', (): void => {

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

        const change: ChangeType<RONPA_ACTION.REACTION> = draftReactionChange({

            by: reactionCreatUser,
            bulletId: bullet1Id,
            reaction,
        });

        ronpa.apply(change);

        expect(ronpa).to.be.lengthOf(2);
        expect(ronpa.flat()).to.be.not.deep.equal(originalRecords);

        const reactions: Reaction[] = ronpa.assertBullet(bullet1Id).reactions;

        expect(reactions).to.be.lengthOf(1);
        expect((reactions[0] as Reaction).by).to.be.equal(reactionCreatUser);
        expect((reactions[0] as Reaction).type).to.be.equal(reaction);
    });
});
