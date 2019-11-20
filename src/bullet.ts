/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Bullet
 */

import { randomUnique } from "@sudoo/random";
import { ContentType, FlatRecord, Reaction, RECORD_TYPE } from "./declare";

export class Bullet<T extends RECORD_TYPE = RECORD_TYPE.TEXT> {

    public static create(
        from: string,
        content: string,
        story: string,
        at: Date = new Date(),
        reactions?: Reaction[],
        extras?: Record<string, any>,
    ): Bullet<RECORD_TYPE.TEXT> {

        return new Bullet<RECORD_TYPE.TEXT>({
            id: randomUnique(),
            at,
            by: from,
            content,
            story,
            reactions,
            extras,
        });
    }

    public static createReply(
        from: string,
        content: string,
        story: string,
        reply: string,
        at: Date = new Date(),
        reactions?: Reaction[],
        extras?: Record<string, any>,
    ): Bullet<RECORD_TYPE.TEXT> {

        return new Bullet<RECORD_TYPE.TEXT>({
            id: randomUnique(),
            at,
            by: from,
            content,
            reply,
            story,
            reactions,
            extras,
        });
    }

    public static createFile(
        from: string,
        filePath: string,
        originalName: string,
        story: string,
        at: Date = new Date(),
        reactions?: Reaction[],
        extras?: Record<string, any>,
    ): Bullet<RECORD_TYPE.FILE> {

        return new Bullet<RECORD_TYPE.FILE>({
            id: randomUnique(),
            at,
            by: from,
            content: {
                path: filePath,
                originalName,
            },
            type: RECORD_TYPE.FILE,
            story,
            reactions,
            extras,
        });
    }

    public static createReplyFile(
        from: string,
        filePath: string,
        originalName: string,
        story: string,
        reply: string,
        at: Date = new Date(),
        reactions?: Reaction[],
        extras?: Record<string, any>,
    ): Bullet<RECORD_TYPE.FILE> {

        return new Bullet<RECORD_TYPE.FILE>({
            id: randomUnique(),
            at,
            by: from,
            content: {
                path: filePath,
                originalName,
            },
            reply,
            type: RECORD_TYPE.FILE,
            story,
            reactions,
            extras,
        });
    }

    public static createHtml(
        from: string,
        content: string,
        story: string,
        at: Date = new Date(),
        reactions?: Reaction[],
        extras?: Record<string, any>,
    ): Bullet<RECORD_TYPE.HTML> {

        return new Bullet<RECORD_TYPE.HTML>({
            id: randomUnique(),
            at,
            by: from,
            content,
            story,
            reactions,
            extras,
        });
    }

    public static createReplyHtml(
        from: string,
        content: string,
        story: string,
        reply: string,
        at: Date = new Date(),
        reactions?: Reaction[],
        extras?: Record<string, any>,
    ): Bullet<RECORD_TYPE.HTML> {

        return new Bullet<RECORD_TYPE.HTML>({
            id: randomUnique(),
            at,
            by: from,
            content,
            reply,
            story,
            reactions,
            extras,
        });
    }

    public static fromRecord<T extends RECORD_TYPE = any>(record: FlatRecord<T>): Bullet<T> {

        return new Bullet<T>(record);
    }

    private readonly _id: string;
    private readonly _at: Date;
    private readonly _by: string;
    private readonly _story: string;
    private readonly _content: ContentType<T>;

    private readonly _type: RECORD_TYPE;
    private _reactions?: Reaction[];
    private _reply?: string;
    private _extras?: Record<string, any>;

    private constructor(record: FlatRecord<T>) {

        this._id = record.id;
        this._at = new Date(record.at);
        this._by = record.by;
        this._story = record.story;
        this._content = record.content;

        this._type = record.type || RECORD_TYPE.TEXT;
        this._reactions = record.reactions;
        this._reply = record.reply;
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
    public get content(): ContentType<T> {
        return this._content;
    }
    public get type(): RECORD_TYPE {
        return this._type;
    }
    public get reactions(): Reaction[] {
        return this._reactions || [];
    }
    public get reply(): string | undefined {
        return this._reply;
    }
    public get extras(): Record<string, any> {
        return this._extras || {};
    }

    public hasReaction(by: string, type: string): boolean {

        if (!this._reactions) {
            return false;
        }

        for (const reaction of this._reactions) {
            if (reaction.by === by && reaction.type === type) {
                return true;
            }
        }
        return false;
    }

    public addReaction(by: string, type: string, at: Date = new Date()): this {

        if (this.hasReaction(by, type)) {
            return this;
        }

        if (this._reactions) {
            this._reactions.push({
                at,
                by,
                type,
            });
            return this;
        }
        this._reactions = [{
            at,
            by,
            type,
        }];
        return this;
    }

    public removeReaction(by: string, type: string): this {

        if (!this.hasReaction(by, type)) {
            return this;
        }

        if (!this._reactions) {
            return this;
        }

        this._reactions = this._reactions.reduce((previous: Reaction[], current: Reaction) => {
            if (current.by === by && current.type === type) {
                return previous;
            }
            return previous.concat([current]);
        }, [] as Reaction[]);
        return this;
    }

    public setExtra(key: string, value: any): this {

        if (this._extras) {
            return this.updateExtras({
                ...this._extras,
                [key]: value,
            });
        }

        return this.updateExtras({
            [key]: value,
        });
    }

    public setReply(reply: string): this {

        this._reply = reply;
        return this;
    }

    public updateExtras(extras: Record<string, any>): this {

        this._extras = extras;
        return this;
    }

    public getExtras(): Record<string, any> {

        return this._extras || {};
    }

    public getExtra(key: string): any {

        return this.extras[key];
    }

    public record(): FlatRecord<T> {

        const record: FlatRecord<T> = {
            id: this._id,
            at: this._at,
            by: this._by,
            story: this._story,
            content: this._content,
        };

        if (this._reactions) {
            (record as any).reactions = this._reactions;
        }
        if (this._type !== RECORD_TYPE.TEXT) {
            (record as any).type = this._type;
        }
        if (this._extras) {
            (record as any).extras = this._extras;
        }
        return record;
    }

    public hash(): string {

        return this._id;
    }

    public clone(): Bullet<T> {

        return new Bullet<T>(this.record());
    }

    public equals(another: Bullet): boolean {

        if (typeof another.hash !== 'function') {
            return false;
        }

        return another.hash() === this.hash();
    }
}
