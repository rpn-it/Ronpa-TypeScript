import { Bullet } from "./bullet";
import { FileContent, FlatRecord, RECORD_TYPE, Thesis } from "./declare";
export declare class Story {
    static create(identifier?: string): Story;
    static withRecord(record: FlatRecord): Story;
    static fromRecords(records: FlatRecord[]): Story;
    static fromThesis(bullet: Bullet<any>, thesis: Thesis): Story;
    private readonly _identifier;
    private _thesisBullet;
    private _thesis;
    private _read;
    private readonly _bulletMap;
    private readonly _bulletList;
    private constructor();
    get id(): string;
    get bullets(): Array<Bullet<any>>;
    get length(): number;
    get thesisBullet(): Bullet<any> | null;
    get thesis(): Thesis | null;
    get read(): boolean;
    setRead(read: boolean): void;
    hasThesis(): boolean;
    assertThesis(): Thesis;
    assertThesisBullet(): Bullet<any>;
    createThesisBullet(by: string, content: string, at?: Date): this;
    createFileThesisBullet(by: string, files: FileContent[], at?: Date): this;
    createAttachmentThesisBullet(by: string, text: string, files: FileContent[], at?: Date): this;
    createBullet(by: string, content: string, at?: Date): this;
    createAndGetBullet(by: string, content: string, at?: Date): Bullet<RECORD_TYPE.TEXT>;
    createAndGetReplyBullet(by: string, content: string, reply: string, at?: Date): Bullet<RECORD_TYPE.TEXT>;
    createFileBullet(by: string, files: FileContent[], at?: Date): this;
    createAndGetFileBullet(by: string, files: FileContent[], at?: Date): Bullet<RECORD_TYPE.FILE>;
    createAndGetReplyFileBullet(by: string, files: FileContent[], reply: string, at?: Date): Bullet<RECORD_TYPE.FILE>;
    createAttachmentBullet(by: string, text: string, files: FileContent[], at?: Date): this;
    createAndGetAttachmentBullet(by: string, text: string, files: FileContent[], at?: Date): Bullet<RECORD_TYPE.ATTACHMENT>;
    createAndGetReplyAttachmentBullet(by: string, text: string, files: FileContent[], reply: string, at?: Date): Bullet<RECORD_TYPE.ATTACHMENT>;
    createHtmlBullet(by: string, content: string, at?: Date): this;
    createAndGetHtmlBullet(by: string, content: string, at?: Date): Bullet<RECORD_TYPE.HTML>;
    createAndGetReplyHtmlBullet(by: string, content: string, reply: string, at?: Date): Bullet<RECORD_TYPE.HTML>;
    addRecord(record: FlatRecord): this;
    addBullet(bullet: Bullet<any>): this;
    getInsiders(): string[];
    removeInsider(insider: string): this;
    removeInsiders(...insiders: string[]): this;
    removeInsiderList(insiderList: string[]): this;
    addInsider(insider: string): this;
    addInsiders(...insiders: string[]): this;
    addInsiderList(insiderList: string[]): this;
    getThesis(): Thesis;
    setThesis<T extends RECORD_TYPE = RECORD_TYPE.TEXT>(bullet: Bullet<T>, thesis: Thesis): this;
    updateThesis(thesis: Thesis): this;
    hasBullet(id: string): boolean;
    getBullet(id: string): Bullet<any> | null;
    assertBullet(id: string): Bullet<any>;
    filterBullets(func: (bullet: Bullet<any>, index: number, array: Array<Bullet<any>>) => boolean): Array<Bullet<any>>;
    getThesisRecord(): FlatRecord<any> | undefined;
    setExtra(key: string, value: any): this;
    updateExtras(extras: Record<string, any>): this;
    getExtras(): Record<string, any>;
    getExtra(key: string): any;
    flat(): FlatRecord[];
    flatSome(func: (bullet: Bullet, index: number, array: Bullet[]) => boolean): FlatRecord[];
    hash(): string;
    clone(): Story;
    equals(another: Story): boolean;
}
