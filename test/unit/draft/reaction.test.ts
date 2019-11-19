/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Reaction
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { CHANGE_TYPE } from '../../../src/declare';
import { draftReactionChange, ReactionChange } from '../../../src/draft/import';

describe('Given [Reaction] Change Creation Method', (): void => {

    const chance: Chance.Chance = new Chance('ronpa-draft-reaction');

    it('should be able to draft change', (): void => {

        const from: string = chance.string();

        const change: ReactionChange = draftReactionChange({

            by: from,
            reaction: chance.string(),
            bulletId: chance.string(),
        });

        expect(change.action).to.be.equal(CHANGE_TYPE.REACTION);
    });
});
