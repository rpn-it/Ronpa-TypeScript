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

    private readonly _identifier: string;
    private readonly _bulletMap: Map<string, Bullet>;

    private constructor(identifier: string) {

        this._identifier = identifier;
        this._bulletMap = new Map<string, Bullet>();
    }

    public get id(): string {
        return this._identifier;
    }
    public get bullets(): Bullet[] {
        return [...this._bulletMap.values()];
    }
    public get length(): number {
        return this._bulletMap.size;
    }

    public addRecord(record: FlatRecord): this {

        if (record.story !== this._identifier) {
            throw new Error('Wrong Collection');
        }

        const bullet: Bullet = Bullet.fromRecord(record);
        this._bulletMap.set(record.id, bullet);

        return this;
    }

    public flat(): FlatRecord[] {

        const records: FlatRecord[] = [];
        for (const bullet of this._bulletMap.values()) {
            records.push(bullet.record());
        }

        return records;
    }
}
