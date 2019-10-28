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

    public get id(): string {
        return this._id;
    }
    public get at(): Date {
        return this._at;
    }
    public get by(): string {
        return this._by;
    }
    public get story(): string {
        return this._story;
    }
    public get content(): string {
        return this._content;
    }
    public get reactions(): Reaction[] {
        return this._reactions || [];
    }

    public record(): FlatRecord {

        const record: FlatRecord = {
            id: this._id,
            at: this._at,
            by: this._by,
            story: this._story,
            content: this._content,
        };

        if (this._reactions) {
            return {
                ...record,
                reactions: this._reactions,
            };
        }
        return record;
    }
}
