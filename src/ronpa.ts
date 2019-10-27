/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Ronpa
 */

import { RonpaElement } from "./declare";

export class Ronpa {

    public static create(): Ronpa {

        return new Ronpa();
    }

    public static rebuild(elements: RonpaElement[]) {

        return new Ronpa(elements);
    }

    private constructor(elements: RonpaElement[] = []) {

    }
}
