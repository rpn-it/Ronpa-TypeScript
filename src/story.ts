/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Story
 */

import { randomUnique } from "@sudoo/random";
import { Bullet } from "./bullet";
import { FileContent, FlatRecord, RECORD_TYPE, Thesis } from "./declare";

export class Story {

    public static create(identifier: string = randomUnique()): Story {

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

        const story: Story = this.withRecord(records[0]);
        for (const record of records.slice(1)) {
            story.addRecord(record);
        }
        return story;
    }

    public static fromThesis(bullet: Bullet<any>, thesis: Thesis): Story {

        const story: Story = this.create(bullet.story);
        story.setThesis(bullet, thesis);
        return story;
    }

    private readonly _identifier: string;

    private _thesisBullet: Bullet<any> | null;
    private _thesis: Thesis | null;

    private readonly _bulletMap: Map<string, Bullet<any>>;
    private readonly _bulletList: Array<Bullet<any>>;

    private constructor(identifier: string) {

        this._identifier = identifier;

        this._bulletMap = new Map<string, Bullet<any>>();
        this._bulletList = [];

        this._thesisBullet = null;
        this._thesis = null;
    }

    public get id(): string {
        return this._identifier;
    }
    public get bullets(): Array<Bullet<any>> {
        return this._bulletList;
    }
    public get length(): number {
        if (this._thesisBullet) {
            return this._bulletList.length + 1;
        }
        return this._bulletList.length;
    }
    public get thesisBullet(): Bullet<any> | null {
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

    public assertThesisBullet(): Bullet<any> {

        return this._thesisBullet as Bullet<any>;
    }

    public createThesisBullet(by: string, content: string, at?: Date): this {

        const bullet: Bullet = Bullet.create(by, content, this._identifier, at);
        this.setThesis(bullet, {
            insiders: [],
        });
        return this;
    }

    public createFileThesisBullet(by: string, files: FileContent[], at?: Date): this {

        const bullet: Bullet<RECORD_TYPE.FILE> = Bullet.createFile(by, files, this._identifier, at);
        this.setThesis(bullet, {
            insiders: [],
        });
        return this;
    }

    public createAttachmentThesisBullet(by: string, text: string, files: FileContent[], at?: Date): this {

        const bullet: Bullet<RECORD_TYPE.ATTACHMENT> = Bullet.createAttachment(by, text, files, this._identifier, at);
        this.setThesis(bullet, {
            insiders: [],
        });
        return this;
    }

    public createBullet(by: string, content: string, at?: Date): this {

        const bullet: Bullet<RECORD_TYPE.TEXT> = Bullet.create(by, content, this._identifier, at);
        return this.addBullet(bullet);
    }

    public createAndGetBullet(by: string, content: string, at?: Date): Bullet<RECORD_TYPE.TEXT> {

        const bullet: Bullet<RECORD_TYPE.TEXT> = Bullet.create(by, content, this._identifier, at);
        this.addBullet(bullet);
        return bullet;
    }

    public createAndGetReplyBullet(by: string, content: string, reply: string, at?: Date): Bullet<RECORD_TYPE.TEXT> {

        const bullet: Bullet<RECORD_TYPE.TEXT> = Bullet.createReply(by, content, this._identifier, reply, at);
        this.addBullet(bullet);
        return bullet;
    }

    public createFileBullet(by: string, files: FileContent[], at?: Date): this {

        const bullet: Bullet<RECORD_TYPE.FILE> = Bullet.createFile(by, files, this._identifier, at);
        return this.addBullet(bullet);
    }

    public createAndGetFileBullet(by: string, files: FileContent[], at?: Date): Bullet<RECORD_TYPE.FILE> {

        const bullet: Bullet<RECORD_TYPE.FILE> = Bullet.createFile(by, files, this._identifier, at);
        this.addBullet(bullet);
        return bullet;
    }

    public createAndGetReplyFileBullet(by: string, files: FileContent[], reply: string, at?: Date): Bullet<RECORD_TYPE.FILE> {

        const bullet: Bullet<RECORD_TYPE.FILE> = Bullet.createReplyFile(by, files, this._identifier, reply, at);
        this.addBullet(bullet);
        return bullet;
    }

    public createAttachmentBullet(by: string, text: string, files: FileContent[], at?: Date): this {

        const bullet: Bullet<RECORD_TYPE.ATTACHMENT> = Bullet.createAttachment(by, text, files, this._identifier, at);
        return this.addBullet(bullet);
    }

    public createAndGetAttachmentBullet(by: string, text: string, files: FileContent[], at?: Date): Bullet<RECORD_TYPE.ATTACHMENT> {

        const bullet: Bullet<RECORD_TYPE.ATTACHMENT> = Bullet.createAttachment(by, text, files, this._identifier, at);
        this.addBullet(bullet);
        return bullet;
    }

    public createAndGetReplyAttachmentBullet(by: string, text: string, files: FileContent[], reply: string, at?: Date): Bullet<RECORD_TYPE.ATTACHMENT> {

        const bullet: Bullet<RECORD_TYPE.ATTACHMENT> = Bullet.createReplyAttachment(by, text, files, this._identifier, reply, at);
        this.addBullet(bullet);
        return bullet;
    }

    public createHtmlBullet(by: string, content: string, at?: Date): this {

        const bullet: Bullet<RECORD_TYPE.HTML> = Bullet.createHtml(by, content, this._identifier, at);
        return this.addBullet(bullet);
    }

    public createAndGetHtmlBullet(by: string, content: string, at?: Date): Bullet<RECORD_TYPE.HTML> {

        const bullet: Bullet<RECORD_TYPE.HTML> = Bullet.createHtml(by, content, this._identifier, at);
        this.addBullet(bullet);
        return bullet;
    }

    public createAndGetReplyHtmlBullet(by: string, content: string, reply: string, at?: Date): Bullet<RECORD_TYPE.HTML> {

        const bullet: Bullet<RECORD_TYPE.HTML> = Bullet.createReplyHtml(by, content, this._identifier, reply, at);
        this.addBullet(bullet);
        return bullet;
    }

    public addRecord(record: FlatRecord): this {

        if (record.story !== this._identifier) {
            throw new Error('[Ronpa] Wrong Collection');
        }

        const bullet: Bullet<any> = Bullet.fromRecord(record);
        if (record.thesis) {
            return this.setThesis(bullet, record.thesis);
        }
        return this.addBullet(bullet);
    }

    public addBullet(bullet: Bullet<any>): this {

        if (bullet.story !== this._identifier) {
            throw new Error('[Ronpa] Wrong Collection');
        }

        if (!this._bulletMap.has(bullet.id)) {
            this._bulletList.push(bullet);
            this._bulletMap.set(bullet.id, bullet);
        }
        return this;
    }

    public getInsiders(): string[] {

        const thesis: Thesis = this.getThesis();
        return thesis.insiders;
    }

    public removeInsider(insider: string): this {

        return this.removeInsiders(insider);
    }

    public removeInsiders(...insiders: string[]): this {

        return this.removeInsiderList(insiders);
    }

    public removeInsiderList(insiderList: string[]): this {

        const thesis: Thesis = this.getThesis();
        this._thesis = {
            ...this._thesis,
            insiders: thesis.insiders.reduce((previous: string[], current: string) => {
                if (insiderList.includes(current)) {
                    return previous;
                }
                return [...previous, current];
            }, []),
        };
        return this;
    }

    public addInsider(insider: string): this {

        return this.addInsiders(insider);
    }

    public addInsiders(...insiders: string[]): this {

        return this.addInsiderList(insiders);
    }

    public addInsiderList(insiderList: string[]): this {

        const thesis: Thesis = this.getThesis();
        for (const insider of insiderList) {
            if (!thesis.insiders.includes(insider)) {
                thesis.insiders.push(insider);
            }
        }
        return this;
    }

    public getThesis(): Thesis {

        if (this._thesis) {
            return this._thesis;
        }

        throw new Error('[Ronpa] Thesis Does Not Exist');
    }

    public setThesis<T extends RECORD_TYPE = RECORD_TYPE.TEXT>(bullet: Bullet<T>, thesis: Thesis): this {

        if (this._thesisBullet) {
            throw new Error('[Ronpa] Thesis Already Exist');
        }

        this._thesisBullet = bullet;
        this._thesis = thesis;
        return this;
    }

    public updateThesis(thesis: Thesis): this {

        this._thesis = thesis;
        return this;
    }

    public hasBullet(id: string): boolean {

        if (this._thesisBullet && this._thesisBullet.id === id) {
            return true;
        }
        return this._bulletMap.has(id);
    }

    public getBullet(id: string): Bullet<any> | null {

        if (this._thesisBullet && this._thesisBullet.id === id) {
            return this._thesisBullet;
        }
        if (this.hasBullet(id)) {
            return this._bulletMap.get(id) as Bullet<any>;
        }
        return null;
    }

    public assertBullet(id: string): Bullet<any> {

        return this.getBullet(id) as Bullet<any>;
    }

    public filterBullets(func: (bullet: Bullet<any>, index: number, array: Array<Bullet<any>>) => boolean): Array<Bullet<any>> {

        return this._bulletList.filter(func);
    }

    public getThesisRecord(): FlatRecord<any> | undefined {

        if (this._thesisBullet && this._thesis) {
            return {
                ...this._thesisBullet.record(),
                thesis: this._thesis,
            };
        }
        return undefined;
    }

    public setExtra(key: string, value: any): this {

        const thesis: Thesis = this.getThesis();
        if (thesis.extras) {

            return this.updateExtras({
                ...thesis.extras,
                [key]: value,
            });
        }

        return this.updateExtras({
            [key]: value,
        });
    }

    public updateExtras(extras: Record<string, any>): this {

        const thesis: Thesis = this.getThesis();
        return this.updateThesis({
            ...thesis,
            extras,
        });
    }

    public getExtras(): Record<string, any> {

        const thesis: Thesis = this.getThesis();
        return thesis.extras || {};
    }

    public getExtra(key: string): any {

        const thesis: Thesis = this.getThesis();
        if (thesis.extras) {
            return thesis.extras[key];
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

    public flatSome(func: (bullet: Bullet, index: number, array: Bullet[]) => boolean): FlatRecord[] {

        const bullets: Bullet[] = this.filterBullets(func);
        const bulletRecordList: FlatRecord[] = bullets.map((bullet: Bullet) => bullet.record());
        const thesisRecord: FlatRecord | undefined = this.getThesisRecord();

        if (thesisRecord) {
            return [thesisRecord, ...bulletRecordList];
        }
        return bulletRecordList;
    }

    public hash(): string {

        return this.flat().map((record: FlatRecord) => record.id).join('::');
    }

    public clone(): Story {

        return Story.fromRecords(this.flat());
    }

    public equals(another: Story): boolean {

        if (typeof another.hash !== 'function') {
            return false;
        }

        return another.hash() === this.hash();
    }
}
