/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Bullet
 */

import { unique } from "@sudoo/random";
import { FlatRecord, Reaction } from "./declare";

export class Bullet {

    public static create(
        from: string,
        content: string,
        story: string,
    ): Bullet {

        return new Bullet({
            id: unique(),
            at: new Date(),
            by: from,
            content,
            story,
        });
    }

    public static fromRecord(record: FlatRecord): Bullet {

        return new Bullet(record);
    }

    private readonly _id: string;
    private readonly _at: Date;
    private readonly _by: string;
    private readonly _story: string;
    private readonly _content: string;
    private readonly _reactions?: Reaction[];

    private constructor(record: FlatRecord) {

        this._id = record.id;
        this._at = record.at;
        this._by = record.by;
        this._story = record.story;
        this._content = record.content;
        this._reactions = record.reactions;
    }
}
