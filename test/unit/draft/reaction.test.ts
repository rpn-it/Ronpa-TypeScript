/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Reaction
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { RONPA_ACTION } from '../../../src/declare';
import { AddReactionChange, draftAddReactionChange, draftRemoveReactionChange, RemoveReactionChange } from '../../../src/draft/import';

describe('Given [Reaction] Change Creation Method', (): void => {

    const chance: Chance.Chance = new Chance('ronpa-draft-reaction');

    it('should be able to draft add reaction change', (): void => {

        const from: string = chance.string();

        const change: AddReactionChange = draftAddReactionChange({

            by: from,
            reaction: chance.string(),
            bulletId: chance.string(),
        });

        expect(change.action).to.be.equal(RONPA_ACTION.ADD_REACTION);
    });

    it('should be able to draft remove reaction change', (): void => {

        const from: string = chance.string();

        const change: RemoveReactionChange = draftRemoveReactionChange({

            by: from,
            reaction: chance.string(),
            bulletId: chance.string(),
        });

        expect(change.action).to.be.equal(RONPA_ACTION.REMOVE_REACTION);
    });
});
