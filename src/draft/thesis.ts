/**
 * @author WMXPY
 * @namespace Ronpa_Draft
 * @description Thesis
 */

import { CHANGE_TYPE, ContentType, RECORD_TYPE } from "../declare";

export type ThesisConfig<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {

    readonly by: string;
    readonly content: ContentType<T>;
    readonly insiders: string[];
};

export type ThesisChange<T extends RECORD_TYPE = RECORD_TYPE.TEXT> = {

    readonly type: CHANGE_TYPE.THESIS;
} & ThesisConfig<T>;

export const createThesisChange = () => {

};
