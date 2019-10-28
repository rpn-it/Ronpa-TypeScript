/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Ronpa
 */

import { FlatRecord } from "./declare";

export class Ronpa {

    public static create(): Ronpa {

        return new Ronpa();
    }

    public static rebuild(records: FlatRecord[]) {

        return new Ronpa(records);
    }

    private constructor(records: FlatRecord[] = []) {

    }
}
