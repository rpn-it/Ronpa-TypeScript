/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Ronpa
 */

import { FlatRecord } from "./declare";
import { Story } from "./story";

export class Ronpa {

    public static create(): Ronpa {

        return new Ronpa();
    }

    public static rebuild(records: FlatRecord[]): Ronpa {

        const template: Ronpa = new Ronpa();
        template.addRecordList(records);
        return template;
    }

    private readonly _storyMap: Map<string, Story>;

    private constructor() {

        this._storyMap = new Map<string, Story>();
    }

    public get stories(): Story[] {
        return [...this._storyMap.values()];
    }
    public get length(): number {
        let length: number = 0;
        for (const story of this._storyMap.values()) {
            length += story.length;
        }
        return length;
    }

    public addRecord(record: FlatRecord): this {

        const storyID: string = record.story;
        if (this._storyMap.has(storyID)) {

            const story: Story = this._storyMap.get(storyID) as Story;
            story.addRecord(record);
        } else {

            const story: Story = Story.withRecord(record);
            this._storyMap.set(storyID, story);
        }

        return this;
    }

    public addRecordList(records: FlatRecord[]): this {

        for (const record of records) {
            this.addRecord(record);
        }

        return this;
    }

    public flat(): FlatRecord[] {

        const records: FlatRecord[] = [];
        for (const story of this._storyMap.values()) {
            records.push(...story.flat());
        }

        return records;
    }
}
