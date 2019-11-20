/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Reply
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { RECORD_TYPE, RONPA_ACTION } from '../../../src/declare';
import { AddReplyChange, draftAddReplyChange } from '../../../src/draft/reply';

describe('Given [Reply] Change Creation Method', (): void => {

    const chance: Chance.Chance = new Chance('ronpa-draft-reply');

    it('should be able to draft change', (): void => {

        const from: string = chance.string();
        const story: string = chance.string();
        const content: string = chance.string();

        const change: AddReplyChange = draftAddReplyChange({

            by: from,
            content,
            type: RECORD_TYPE.TEXT,
            story,
        });

        expect(change.action).to.be.equal(RONPA_ACTION.ADD_REPLY);
    });
});
