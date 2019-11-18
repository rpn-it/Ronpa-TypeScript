/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Thesis
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { CHANGE_TYPE, RECORD_TYPE } from '../../../src/declare';
import { draftThesisChange, ThesisChange } from '../../../src/draft/thesis';

describe('Given [Thesis] Change Creation Method', (): void => {

    const chance: Chance.Chance = new Chance('ronpa-draft-thesis');

    it('should be able to draft change', (): void => {

        const from: string = chance.string();
        const content: string = chance.string();

        const change: ThesisChange = draftThesisChange({

            by: from,
            content,
            type: RECORD_TYPE.TEXT,
            insiders: [],
        });

        expect(change.action).to.be.equal(CHANGE_TYPE.THESIS);
    });
});
