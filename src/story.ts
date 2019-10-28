/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Story
 */

import { unique } from "@sudoo/random";
import { Bullet } from "./bullet";
import { FlatRecord } from "./declare";

export class Story {

    public static create(): Story {

        return new Story(unique());
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

    public addRecord(record: FlatRecord): this {

        if (record.story !== this._identifier) {
            throw new Error('Wrong Collection');
        }

        const bullet: Bullet = Bullet.fromRecord(record);
        this._bulletMap.set(record.id, bullet);

        return this;
    }
}
