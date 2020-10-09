"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bullet = void 0;
const random_1 = require("@sudoo/random");
const declare_1 = require("./declare");
class Bullet {
    constructor(record) {
        this._id = record.id;
        this._at = new Date(record.at);
        this._by = record.by;
        this._story = record.story;
        this._content = record.content;
        this._type = record.type || declare_1.RECORD_TYPE.TEXT;
        this._reactions = record.reactions;
        this._editHistories = record.editHistories;
        this._reply = record.reply;
        this._isRobot = record.isRobot;
        this._isGenerated = record.isGenerated;
        this._extras = record.extras;
    }
    static create(from, content, story, at = new Date(), reactions, extras) {
        return new Bullet({
            id: random_1.randomUnique(),
            at,
            by: from,
            content,
            story,
            reactions,
            extras,
        });
    }
    static createReply(from, content, story, reply, at = new Date(), reactions, extras) {
        return new Bullet({
            id: random_1.randomUnique(),
            at,
            by: from,
            content,
            reply,
            story,
            reactions,
            extras,
        });
    }
    static createFile(from, files, story, at = new Date(), reactions, extras) {
        return new Bullet({
            id: random_1.randomUnique(),
            at,
            by: from,
            content: files,
            type: declare_1.RECORD_TYPE.FILE,
            story,
            reactions,
            extras,
        });
    }
    static createReplyFile(from, files, story, reply, at = new Date(), reactions, extras) {
        return new Bullet({
            id: random_1.randomUnique(),
            at,
            by: from,
            content: files,
            reply,
            type: declare_1.RECORD_TYPE.FILE,
            story,
            reactions,
            extras,
        });
    }
    static createAttachment(from, text, files, story, at = new Date(), reactions, extras) {
        return new Bullet({
            id: random_1.randomUnique(),
            at,
            by: from,
            content: {
                text,
                files,
            },
            type: declare_1.RECORD_TYPE.FILE,
            story,
            reactions,
            extras,
        });
    }
    static createReplyAttachment(from, text, files, story, reply, at = new Date(), reactions, extras) {
        return new Bullet({
            id: random_1.randomUnique(),
            at,
            by: from,
            content: {
                text,
                files,
            },
            reply,
            type: declare_1.RECORD_TYPE.FILE,
            story,
            reactions,
            extras,
        });
    }
    static createHtml(from, content, story, at = new Date(), reactions, extras) {
        return new Bullet({
            id: random_1.randomUnique(),
            at,
            by: from,
            content,
            story,
            reactions,
            extras,
        });
    }
    static createReplyHtml(from, content, story, reply, at = new Date(), reactions, extras) {
        return new Bullet({
            id: random_1.randomUnique(),
            at,
            by: from,
            content,
            reply,
            story,
            reactions,
            extras,
        });
    }
    static fromRecord(record) {
        return new Bullet(record);
    }
    get id() {
        return this._id;
    }
    get at() {
        return this._at;
    }
    get by() {
        return this._by;
    }
    get story() {
        return this._story;
    }
    get content() {
        return this._content;
    }
    get type() {
        return this._type;
    }
    get reactions() {
        return this._reactions || [];
    }
    get reply() {
        return this._reply;
    }
    get isRobot() {
        return Boolean(this._isRobot);
    }
    get isGenerated() {
        return Boolean(this._isGenerated);
    }
    get extras() {
        return this._extras || {};
    }
    get editHistories() {
        return this._editHistories || [];
    }
    editContent(newContent, by, at) {
        this.pushEditHistory(newContent, by, at);
        this._content = newContent;
        return this;
    }
    pushEditHistory(newContent, by, at = new Date()) {
        const oldContent = this._content;
        if (!this._editHistories) {
            this._editHistories = [
                {
                    at,
                    by,
                    before: oldContent,
                    after: newContent,
                },
            ];
            return this;
        }
        this._editHistories = [
            ...this._editHistories,
            {
                at,
                by,
                before: oldContent,
                after: newContent,
            },
        ];
        return this;
    }
    hasReaction(by, type) {
        if (!this._reactions) {
            return false;
        }
        for (const reaction of this._reactions) {
            if (reaction.by === by && reaction.type === type) {
                return true;
            }
        }
        return false;
    }
    addReaction(by, type, at = new Date()) {
        if (this.hasReaction(by, type)) {
            return this;
        }
        if (this._reactions) {
            this._reactions.push({
                at,
                by,
                type,
            });
            return this;
        }
        this._reactions = [{
                at,
                by,
                type,
            }];
        return this;
    }
    removeReaction(by, type) {
        if (!this.hasReaction(by, type)) {
            return this;
        }
        if (!this._reactions) {
            return this;
        }
        this._reactions = this._reactions.reduce((previous, current) => {
            if (current.by === by && current.type === type) {
                return previous;
            }
            return previous.concat([current]);
        }, []);
        return this;
    }
    setExtra(key, value) {
        if (this._extras) {
            return this.updateExtras(Object.assign(Object.assign({}, this._extras), { [key]: value }));
        }
        return this.updateExtras({
            [key]: value,
        });
    }
    setReply(reply) {
        this._reply = reply;
        return this;
    }
    updateExtras(extras) {
        this._extras = extras;
        return this;
    }
    setIsRobot(isRobot = true) {
        this._isRobot = isRobot;
        return this;
    }
    setIsGenerated(isGenerated = true) {
        this._isGenerated = isGenerated;
        return this;
    }
    getExtras() {
        return this._extras || {};
    }
    getExtra(key) {
        return this.extras[key];
    }
    record() {
        const record = {
            id: this._id,
            at: this._at,
            by: this._by,
            story: this._story,
            content: this._content,
        };
        if (this._reactions) {
            record.reactions = this._reactions;
        }
        if (this._editHistories) {
            record.editHistories = this._editHistories;
        }
        if (this._type !== declare_1.RECORD_TYPE.TEXT) {
            record.type = this._type;
        }
        if (this._extras) {
            record.extras = this._extras;
        }
        if (this._isRobot) {
            record.isRobot = this._isRobot;
        }
        if (this._isGenerated) {
            record.isGenerated = this._isGenerated;
        }
        return record;
    }
    hash() {
        return [
            this._id,
            this._by,
            JSON.stringify(this._content),
        ].join('::');
    }
    clone() {
        return new Bullet(this.record());
    }
    equals(another) {
        if (typeof another.hash !== 'function') {
            return false;
        }
        return another.hash() === this.hash();
    }
}
exports.Bullet = Bullet;
