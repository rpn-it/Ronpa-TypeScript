"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Story = void 0;
const random_1 = require("@sudoo/random");
const bullet_1 = require("./bullet");
class Story {
    constructor(identifier) {
        this._read = false;
        this._identifier = identifier;
        this._bulletMap = new Map();
        this._bulletList = [];
        this._thesisBullet = null;
        this._thesis = null;
    }
    static create(identifier = random_1.randomUnique()) {
        return new Story(identifier);
    }
    static withRecord(record) {
        const story = new Story(record.story);
        return story.addRecord(record);
    }
    static fromRecords(records) {
        if (records.length <= 0) {
            return this.create();
        }
        const story = this.withRecord(records[0]);
        for (const record of records.slice(1)) {
            story.addRecord(record);
        }
        return story;
    }
    static fromThesis(bullet, thesis) {
        const story = this.create(bullet.story);
        story.setThesis(bullet, thesis);
        return story;
    }
    get id() {
        return this._identifier;
    }
    get bullets() {
        return this._bulletList;
    }
    get length() {
        if (this._thesisBullet) {
            return this._bulletList.length + 1;
        }
        return this._bulletList.length;
    }
    get thesisBullet() {
        return this._thesisBullet;
    }
    get thesis() {
        return this._thesis;
    }
    get read() {
        return this._read;
    }
    setRead(read) {
        this._read = read;
    }
    hasThesis() {
        return Boolean(this._thesisBullet) && Boolean(this._thesis);
    }
    assertThesis() {
        return this._thesis;
    }
    assertThesisBullet() {
        return this._thesisBullet;
    }
    createThesisBullet(by, content, at) {
        const bullet = bullet_1.Bullet.create(by, content, this._identifier, at);
        this.setThesis(bullet, {
            insiders: [],
        });
        return this;
    }
    createFileThesisBullet(by, files, at) {
        const bullet = bullet_1.Bullet.createFile(by, files, this._identifier, at);
        this.setThesis(bullet, {
            insiders: [],
        });
        return this;
    }
    createAttachmentThesisBullet(by, text, files, at) {
        const bullet = bullet_1.Bullet.createAttachment(by, text, files, this._identifier, at);
        this.setThesis(bullet, {
            insiders: [],
        });
        return this;
    }
    createBullet(by, content, at) {
        const bullet = bullet_1.Bullet.create(by, content, this._identifier, at);
        return this.addBullet(bullet);
    }
    createAndGetBullet(by, content, at) {
        const bullet = bullet_1.Bullet.create(by, content, this._identifier, at);
        this.addBullet(bullet);
        return bullet;
    }
    createAndGetReplyBullet(by, content, reply, at) {
        const bullet = bullet_1.Bullet.createReply(by, content, this._identifier, reply, at);
        this.addBullet(bullet);
        return bullet;
    }
    createFileBullet(by, files, at) {
        const bullet = bullet_1.Bullet.createFile(by, files, this._identifier, at);
        return this.addBullet(bullet);
    }
    createAndGetFileBullet(by, files, at) {
        const bullet = bullet_1.Bullet.createFile(by, files, this._identifier, at);
        this.addBullet(bullet);
        return bullet;
    }
    createAndGetReplyFileBullet(by, files, reply, at) {
        const bullet = bullet_1.Bullet.createReplyFile(by, files, this._identifier, reply, at);
        this.addBullet(bullet);
        return bullet;
    }
    createAttachmentBullet(by, text, files, at) {
        const bullet = bullet_1.Bullet.createAttachment(by, text, files, this._identifier, at);
        return this.addBullet(bullet);
    }
    createAndGetAttachmentBullet(by, text, files, at) {
        const bullet = bullet_1.Bullet.createAttachment(by, text, files, this._identifier, at);
        this.addBullet(bullet);
        return bullet;
    }
    createAndGetReplyAttachmentBullet(by, text, files, reply, at) {
        const bullet = bullet_1.Bullet.createReplyAttachment(by, text, files, this._identifier, reply, at);
        this.addBullet(bullet);
        return bullet;
    }
    createHtmlBullet(by, content, at) {
        const bullet = bullet_1.Bullet.createHtml(by, content, this._identifier, at);
        return this.addBullet(bullet);
    }
    createAndGetHtmlBullet(by, content, at) {
        const bullet = bullet_1.Bullet.createHtml(by, content, this._identifier, at);
        this.addBullet(bullet);
        return bullet;
    }
    createAndGetReplyHtmlBullet(by, content, reply, at) {
        const bullet = bullet_1.Bullet.createReplyHtml(by, content, this._identifier, reply, at);
        this.addBullet(bullet);
        return bullet;
    }
    addRecord(record) {
        if (record.story !== this._identifier) {
            throw new Error('[Ronpa] Wrong Collection');
        }
        const bullet = bullet_1.Bullet.fromRecord(record);
        if (record.thesis) {
            return this.setThesis(bullet, record.thesis);
        }
        return this.addBullet(bullet);
    }
    addBullet(bullet) {
        if (bullet.story !== this._identifier) {
            throw new Error('[Ronpa] Wrong Collection');
        }
        if (!this._bulletMap.has(bullet.id)) {
            this._bulletList.push(bullet);
            this._bulletMap.set(bullet.id, bullet);
        }
        return this;
    }
    getInsiders() {
        const thesis = this.getThesis();
        return thesis.insiders;
    }
    removeInsider(insider) {
        return this.removeInsiders(insider);
    }
    removeInsiders(...insiders) {
        return this.removeInsiderList(insiders);
    }
    removeInsiderList(insiderList) {
        const thesis = this.getThesis();
        this._thesis = Object.assign(Object.assign({}, this._thesis), { insiders: thesis.insiders.reduce((previous, current) => {
                if (insiderList.includes(current)) {
                    return previous;
                }
                return [...previous, current];
            }, []) });
        return this;
    }
    addInsider(insider) {
        return this.addInsiders(insider);
    }
    addInsiders(...insiders) {
        return this.addInsiderList(insiders);
    }
    addInsiderList(insiderList) {
        const thesis = this.getThesis();
        for (const insider of insiderList) {
            if (!thesis.insiders.includes(insider)) {
                thesis.insiders.push(insider);
            }
        }
        return this;
    }
    getThesis() {
        if (this._thesis) {
            return this._thesis;
        }
        throw new Error('[Ronpa] Thesis Does Not Exist');
    }
    setThesis(bullet, thesis) {
        if (this._thesisBullet) {
            throw new Error('[Ronpa] Thesis Already Exist');
        }
        this._thesisBullet = bullet;
        this._thesis = thesis;
        return this;
    }
    updateThesis(thesis) {
        this._thesis = thesis;
        return this;
    }
    hasBullet(id) {
        if (this._thesisBullet && this._thesisBullet.id === id) {
            return true;
        }
        return this._bulletMap.has(id);
    }
    getBullet(id) {
        if (this._thesisBullet && this._thesisBullet.id === id) {
            return this._thesisBullet;
        }
        if (this.hasBullet(id)) {
            return this._bulletMap.get(id);
        }
        return null;
    }
    assertBullet(id) {
        return this.getBullet(id);
    }
    filterBullets(func) {
        return this._bulletList.filter(func);
    }
    getThesisRecord() {
        if (this._thesisBullet && this._thesis) {
            return Object.assign(Object.assign({}, this._thesisBullet.record()), { thesis: this._thesis });
        }
        return undefined;
    }
    setExtra(key, value) {
        const thesis = this.getThesis();
        if (thesis.extras) {
            return this.updateExtras(Object.assign(Object.assign({}, thesis.extras), { [key]: value }));
        }
        return this.updateExtras({
            [key]: value,
        });
    }
    updateExtras(extras) {
        const thesis = this.getThesis();
        return this.updateThesis(Object.assign(Object.assign({}, thesis), { extras }));
    }
    getExtras() {
        const thesis = this.getThesis();
        return thesis.extras || {};
    }
    getExtra(key) {
        const thesis = this.getThesis();
        if (thesis.extras) {
            return thesis.extras[key];
        }
        return undefined;
    }
    flat() {
        const bulletRecordList = this._bulletList.map((bullet) => bullet.record());
        const thesisRecord = this.getThesisRecord();
        if (thesisRecord) {
            return [thesisRecord, ...bulletRecordList];
        }
        return bulletRecordList;
    }
    flatSome(func) {
        const bullets = this.filterBullets(func);
        const bulletRecordList = bullets.map((bullet) => bullet.record());
        const thesisRecord = this.getThesisRecord();
        if (thesisRecord) {
            return [thesisRecord, ...bulletRecordList];
        }
        return bulletRecordList;
    }
    hash() {
        return this.flat().map((record) => record.id).join('::');
    }
    clone() {
        return Story.fromRecords(this.flat());
    }
    equals(another) {
        if (typeof another.hash !== 'function') {
            return false;
        }
        return another.hash() === this.hash();
    }
}
exports.Story = Story;
