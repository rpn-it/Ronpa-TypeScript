/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Ronpa
 */

import { Bullet } from "./bullet";
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
    private readonly _storyList: Story[];

    private constructor() {

        this._storyMap = new Map<string, Story>();
        this._storyList = [];
    }

    public get stories(): Story[] {
        return this._storyList;
    }
    public get length(): number {
        return this._storyList.reduce((previous: number, current: Story) => {
            return previous + current.length;
        }, 0);
    }

    public createStory(by: string, content: string): this {

        const story: Story = Story.create();
        story.createThesisBullet(by, content);
        this.addStory(story);
        return this;
    }

    public addRecord(record: FlatRecord): this {

        const storyID: string = record.story;
        if (this._storyMap.has(storyID)) {

            const story: Story = this._storyMap.get(storyID) as Story;
            story.addRecord(record);
        } else {

            const story: Story = Story.withRecord(record);
            this._storyList.push(story);
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

    public addStory(story: Story): this {

        if (!this._storyMap.has(story.id)) {
            this._storyList.push(story);
        }
        this._storyMap.set(story.id, story);
        return this;
    }

    public hasStory(id: string): boolean {

        return this._storyMap.has(id);
    }

    public getStory(id: string): Story | null {

        if (this.hasStory(id)) {
            return this._storyMap.get(id) as Story;
        }
        return null;
    }

    public hasBullet(id: string): boolean {

        for (const story of this._storyList) {
            if (story.hasBullet(id)) {
                return true;
            }
        }
        return false;
    }

    public getBullet(id: string): Bullet | null {

        for (const story of this._storyList) {
            if (story.hasBullet(id)) {
                return story.getBullet(id);
            }
        }
        return null;
    }

    public flat(): FlatRecord[] {

        const records: FlatRecord[] = [];
        this._storyList.forEach((story: Story) => records.push(...story.flat()));

        return records;
    }
}
