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
        reactions?: Reaction[],
        extras?: Record<string, any>,
    ): Bullet {

        return new Bullet({
            id: unique(),
            at: new Date(),
            by: from,
            content,
            story,
            reactions,
            extras,
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

    private _reactions?: Reaction[];
    private _extras?: Record<string, any>;

    private constructor(record: FlatRecord) {

        this._id = record.id;
        this._at = record.at;
        this._by = record.by;
        this._story = record.story;
        this._content = record.content;
        this._reactions = record.reactions;
        this._extras = record.extras;
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
    public get extras(): Record<string, any> {
        return this._extras || {};
    }

    public setExtra(key: string, value: any): this {

        if (this._extras) {
            this._extras = {
                ...this._extras,
                [key]: value,
            };
            return this;
        }

        this._extras = {
            [key]: value,
        };
        return this;
    }

    public getExtra(key: string): any {

        return this.extras[key];
    }

    public record(): FlatRecord {

        const record: FlatRecord = {
            id: this._id,
            at: this._at,
            by: this._by,
            story: this._story,
            content: this._content,
        };

        if (this._reactions && this._extras) {
            return {
                ...record,
                reactions: this._reactions,
                extras: this._extras,
            };
        }

        if (this._reactions) {
            return {
                ...record,
                reactions: this._reactions,
            };
        }

        if (this._extras) {
            return {
                ...record,
                extras: this._extras,
            };
        }
        return record;
    }
}
