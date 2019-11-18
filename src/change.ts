/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Change
 */

import { CHANGE_TYPE } from "./declare";

export class Change<T extends CHANGE_TYPE = any> {

    public static thesis(): Change<CHANGE_TYPE.THESIS> {

        return new Change<CHANGE_TYPE.THESIS>(CHANGE_TYPE.THESIS);
    }

    private readonly _type: T;

    private constructor(type: T) {

        this._type = type;
    }

    public get type(): T {

        return this._type;
    }
}
