/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Change
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Change } from '../../src/change';

describe('Given {Change} Class', (): void => {

    const chance: Chance.Chance = new Chance('ronpa-change');

    it('should be able to create instance', (): void => {

        const change = Change.thesis();

        expect(change).to.be.instanceOf(Change);
    });
});
