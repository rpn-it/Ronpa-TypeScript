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
        to?: string[],
        reply?: string,
        reactions?: Reaction[],
        extras?: Record<string, any>,
    ): Bullet {

        return new Bullet({
            id: unique(),
            at: new Date(),
            by: from,
            content,
            story,
            to,
            reply,
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

    private _to?: string[];
    private _reply?: string;

    private _reactions?: Reaction[];
    private _extras?: Record<string, any>;

    private constructor(record: FlatRecord) {

        this._id = record.id;
        this._at = new Date(record.at);
        this._by = record.by;
        this._story = record.story;
        this._content = record.content;
        this._to = record.to;
        this._reply = record.reply;
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
    public get to(): string[] {
        return this._to || [];
    }
    public get reply(): string | undefined {
        return this._reply;
    }
    public get reactions(): Reaction[] {
        return this._reactions || [];
    }
    public get extras(): Record<string, any> {
        return this._extras || {};
    }

    public setReply(to: string): this {

        this._reply = to;
        return this;
    }

    public addReceiver(name: string): this {

        if (this._to) {
            this._to.push(name);
            return this;
        }
        this._to = [name];
        return this;
    }

    public addReaction(by: string, type: string): this {

        if (this._reactions) {
            this._reactions.push({
                at: new Date(),
                by,
                type,
            });
            return this;
        }
        this._reactions = [{
            at: new Date(),
            by,
            type,
        }];
        return this;
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

        if (this._to) {
            (record as any).to = this._to;
        }
        if (this._reply) {
            (record as any).reply = this._reply;
        }
        if (this._reactions) {
            (record as any).reactions = this._reactions;
        }
        if (this._extras) {
            (record as any).extras = this._extras;
        }
        return record;
    }
}
