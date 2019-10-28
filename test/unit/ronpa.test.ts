/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Ronpa
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { FlatRecord, Ronpa } from '../../src';
import { createMockRecords } from '../mock/records';

describe('Given {Ronpa} Class', (): void => {

    const chance: Chance.Chance = new Chance('ronpa-ronpa');

    it('should be able to create ronpa instance', (): void => {

        const ronpa = Ronpa.create();

        expect(ronpa).to.be.instanceOf(Ronpa);
    });

    it('should be able to reproduce flat reactions', (): void => {

        const records: FlatRecord[] = createMockRecords(chance);
        const ronpa = Ronpa.rebuild(records);

        expect(ronpa.flat()).to.be.deep.equal(records);
        expect(ronpa).to.be.lengthOf(records.length);
    });
});
