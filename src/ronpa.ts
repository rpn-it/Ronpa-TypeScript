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

    public addRecord(record: FlatRecord): this {

        if (this._storyMap.has(record.id)) {

            const story: Story = this._storyMap.get(record.id) as Story;
            story.addRecord(record);
        } else {

            const story: Story = Story.withRecord(record);
            this._storyMap.set(record.story, story);
        }

        return this;
    }

    public addRecordList(records: FlatRecord[]): this {

        for (const record of records) {
            this.addRecord(record);
        }

        return this;
    }
}
