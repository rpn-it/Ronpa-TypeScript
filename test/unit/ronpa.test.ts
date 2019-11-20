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

    it('should be able to create story', (): void => {

        const by: string = chance.string();
        const content: string = chance.string();

        const ronpa = Ronpa.create();

        ronpa.createStory(by, content);

        expect(ronpa.flat()).to.be.lengthOf(1);
        expect((ronpa.flat()[0] as any).thesis.insiders).to.be.lengthOf(0);
    });

    it('should be able to compare ronpa - sad', (): void => {

        const by: string = chance.string();
        const content: string = chance.string();

        const ronpa = Ronpa.create();
        ronpa.createStory(by, content);

        const another = Ronpa.create();
        ronpa.createStory(by, content);

        // tslint:disable-next-line: no-unused-expression
        expect(another.equals(ronpa)).to.be.false;
    });

    it('should be able to compare ronpa - happy', (): void => {

        const by: string = chance.string();
        const content: string = chance.string();

        const ronpa = Ronpa.create();
        ronpa.createStory(by, content);

        const another = ronpa.clone();

        // tslint:disable-next-line: no-unused-expression
        expect(another.equals(ronpa)).to.be.true;
    });
});
