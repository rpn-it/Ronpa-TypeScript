/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Story
 */

import { unique } from "@sudoo/random";
import { Bullet } from "./bullet";
import { FlatRecord } from "./declare";

export class Story {

    public static create(identifier: string = unique()): Story {

        return new Story(identifier);
    }

    public static withRecord(record: FlatRecord): Story {

        const story: Story = new Story(record.story);
        return story.addRecord(record);
    }

    public static fromRecords(records: FlatRecord[]): Story {

        if (records.length <= 0) {
            return this.create();
        }

        const story: Story = this.withRecord(records[0] as FlatRecord);
        for (const record of records.slice(1)) {
            story.addRecord(record);
        }
        return story;
    }

    private readonly _identifier: string;

    private readonly _thesis: Bullet;

    private readonly _bulletMap: Map<string, Bullet>;
    private readonly _bulletList: Bullet[];

    private constructor(identifier: string) {

        this._identifier = identifier;

        this._bulletMap = new Map<string, Bullet>();
        this._bulletList = [];
    }

    public get id(): string {
        return this._identifier;
    }
    public get bullets(): Bullet[] {
        return this._bulletList;
    }
    public get length(): number {
        return this._bulletList.length;
    }

    public createBullet(by: string, content: string): this {

        const bullet: Bullet = Bullet.create(by, content, this._identifier);
        this.addBullet(bullet);
        return this;
    }

    public addRecord(record: FlatRecord): this {

        if (record.story !== this._identifier) {
            throw new Error('Wrong Collection');
        }
        const bullet: Bullet = Bullet.fromRecord(record);
        return this.addBullet(bullet);
    }

    public addBullet(bullet: Bullet): this {

        if (!this._bulletMap.has(bullet.id)) {
            this._bulletList.push(bullet);
        }
        this._bulletMap.set(bullet.id, bullet);
        return this;
    }

    public flat(): FlatRecord[] {

        return this._bulletList.map((bullet: Bullet) => bullet.record());
    }
}
