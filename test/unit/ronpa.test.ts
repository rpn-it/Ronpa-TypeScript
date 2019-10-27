/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Ronpa
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { Ronpa } from '../../src';

describe('Given {Ronpa} Class', (): void => {

    const chance: Chance.Chance = new Chance('ronpa-ronpa');

    it('should be able to create ronpa instance', (): void => {

        const ronpa = Ronpa.create();

        expect(ronpa).to.be.instanceOf(Ronpa);
    });
});
