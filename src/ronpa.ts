/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Ronpa
 */

import { Bullet } from "./bullet";
import { FileContent, FlatRecord, RONPA_ACTION } from "./declare";
import { ChangeType } from "./draft/import";
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

    public createStory(by: string, content: string, at?: Date): this {

        this.createAndGetStory(by, content, at);
        return this;
    }

    public createAndGetStory(by: string, content: string, at?: Date): Story {

        const story: Story = Story.create();
        story.createThesisBullet(by, content, at);
        this.addStory(story);
        return story;
    }

    public createFileStory(by: string, files: FileContent[], at?: Date): this {

        this.createAndGetFileStory(by, files, at);
        return this;
    }

    public createAndGetFileStory(by: string, files: FileContent[], at?: Date): Story {

        const story: Story = Story.create();
        story.createFileThesisBullet(by, files, at);
        this.addStory(story);
        return story;
    }

    public createAttachmentStory(by: string, text: string, files: FileContent[], at?: Date): this {

        this.createAndGetAttachmentStory(by, text, files, at);
        return this;
    }

    public createAndGetAttachmentStory(by: string, text: string, files: FileContent[], at?: Date): Story {

        const story: Story = Story.create();
        story.createAttachmentThesisBullet(by, text, files, at);
        this.addStory(story);
        return story;
    }

    public filterStories(func: (stroy: Story, index: number, array: Story[]) => boolean): Story[] {

        return this._storyList.filter(func);
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

    public assertStory(id: string): Story {

        return this.getStory(id) as Story;
    }

    public ensureStory(id: string): Story {

        const story: Story | null = this.getStory(id);
        if (!story) {
            throw new Error('[Ronpa] Undefined Story');
        }
        return story;
    }

    public getThesisStories(): Story[] {

        return this.filterStories((story: Story) => story.hasThesis());
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

    public assertBullet(id: string): Bullet {

        return this.getBullet(id) as Bullet;
    }

    public ensureBullet(id: string): Bullet {

        const bullet: Bullet | null = this.getBullet(id);
        if (!bullet) {
            throw new Error('[Ronpa] Undefined Bullet');
        }
        return bullet;
    }

    public flat(): FlatRecord[] {

        const records: FlatRecord[] = [];
        this._storyList.forEach((story: Story) => records.push(...story.flat()));

        return records;
    }

    public flatSome(func: (story: Story, index: number, array: Story[]) => boolean): FlatRecord[] {

        const stories: Story[] = this.filterStories(func);
        const records: FlatRecord[] = [];
        stories.forEach((story: Story) => records.push(...story.flat()));

        return records;
    }

    public hash(): string {

        return this.flat().map((record: FlatRecord) => record.id).join('::');
    }

    public clone(): Ronpa {

        return Ronpa.rebuild(this.flat());
    }

    public equals(another: Ronpa): boolean {

        if (typeof another.hash !== 'function') {
            return false;
        }

        return another.hash() === this.hash();
    }

    public apply(change: ChangeType<any>): this {

        switch (change.action) {
            case RONPA_ACTION.ADD_THESIS: {

                const thesis: ChangeType<RONPA_ACTION.ADD_THESIS> = change;
                const story: Story = Story.withRecord(thesis);

                this.addStory(story);
                return this;
            }
            case RONPA_ACTION.ADD_REPLY: {

                const reply: ChangeType<RONPA_ACTION.ADD_REPLY> = change;
                const story: Story = this.ensureStory(reply.story);
                const bullet: Bullet = Bullet.fromRecord(reply);

                story.addBullet(bullet);
                return this;
            }
            case RONPA_ACTION.ADD_REACTION: {

                const reaction: ChangeType<RONPA_ACTION.ADD_REACTION> = change;
                const bullet: Bullet = this.ensureBullet(reaction.bulletId);

                bullet.addReaction(reaction.by, reaction.reaction, reaction.at);
                return this;
            }
            case RONPA_ACTION.REMOVE_REACTION: {

                const reaction: ChangeType<RONPA_ACTION.REMOVE_REACTION> = change;
                const bullet: Bullet = this.ensureBullet(reaction.bulletId);

                bullet.removeReaction(reaction.by, reaction.reaction);
                return this;
            }
        }
        return this;
    }
}
