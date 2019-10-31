/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Story
 */

import { unique } from "@sudoo/random";
import { Bullet } from "./bullet";
import { FlatRecord, RECORD_TYPE, Thesis } from "./declare";

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

    public static fromThesis(bullet: Bullet, thesis: Thesis): Story {

        const story: Story = this.create(bullet.story);
        story.setThesis(bullet, thesis);
        return story;
    }

    private readonly _identifier: string;

    private _thesisBullet: Bullet | null;
    private _thesis: Thesis | null;

    private readonly _bulletMap: Map<string, Bullet>;
    private readonly _bulletList: Bullet[];

    private constructor(identifier: string) {

        this._identifier = identifier;

        this._bulletMap = new Map<string, Bullet>();
        this._bulletList = [];

        this._thesisBullet = null;
        this._thesis = null;
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
    public get thesisBullet(): Bullet | null {
        return this._thesisBullet;
    }
    public get thesis(): Thesis | null {
        return this._thesis;
    }

    public hasThesis(): boolean {

        return Boolean(this._thesisBullet) && Boolean(this._thesis);
    }

    public assertThesis(): Thesis {

        return this._thesis as Thesis;
    }

    public assertThesisBullet(): Bullet {

        return this._thesisBullet as Bullet;
    }

    public createThesisBullet(by: string, content: string): this {

        const bullet: Bullet = Bullet.create(by, content, this._identifier);
        this.setThesis(bullet, {
            insiders: [],
        });
        return this;
    }

    public createBullet(by: string, content: string): this {

        const bullet: Bullet = Bullet.create(by, content, this._identifier);
        this.addBullet(bullet);
        return this;
    }

    public createFileBullet(by: string, filePath: string, originalName: string): this {

        const bullet: Bullet<RECORD_TYPE.FILE> = Bullet.createFile(by, filePath, originalName, this._identifier);
        this.addBullet(bullet);
        return this;
    }

    public addRecord(record: FlatRecord): this {

        if (record.story !== this._identifier) {
            throw new Error('Wrong Collection');
        }

        const bullet: Bullet = Bullet.fromRecord(record);
        if (record.thesis) {
            return this.setThesis(bullet, record.thesis);
        }
        return this.addBullet(bullet);
    }

    public addBullet(bullet: Bullet<any>): this {

        if (bullet.story !== this._identifier) {
            throw new Error('Wrong Collection');
        }

        if (!this._bulletMap.has(bullet.id)) {
            this._bulletList.push(bullet);
        }
        this._bulletMap.set(bullet.id, bullet);
        return this;
    }

    public setThesis(bullet: Bullet, thesis: Thesis): this {

        this._thesisBullet = bullet;
        this._thesis = thesis;
        return this;
    }

    public hasBullet(id: string): boolean {

        return this._bulletMap.has(id);
    }

    public getBullet(id: string): Bullet | null {

        if (this.hasBullet(id)) {
            return this._bulletMap.get(id) as Bullet;
        }
        return null;
    }

    public getThesisRecord(): FlatRecord | undefined {

        if (this._thesisBullet && this._thesis) {
            return {
                ...this._thesisBullet.record(),
                thesis: this._thesis,
            };
        }
        return undefined;
    }

    public flat(): FlatRecord[] {

        const bulletRecordList: FlatRecord[] = this._bulletList.map((bullet: Bullet) => bullet.record());
        const thesisRecord: FlatRecord | undefined = this.getThesisRecord();

        if (thesisRecord) {
            return [thesisRecord, ...bulletRecordList];
        }
        return bulletRecordList;
    }
}
