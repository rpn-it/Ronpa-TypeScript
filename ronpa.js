"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ronpa = void 0;
const bullet_1 = require("./bullet");
const declare_1 = require("./declare");
const story_1 = require("./story");
class Ronpa {
    constructor() {
        this._storyMap = new Map();
        this._storyList = [];
    }
    static create() {
        return new Ronpa();
    }
    static rebuild(records) {
        const template = new Ronpa();
        template.addRecordList(records);
        return template;
    }
    get stories() {
        return this._storyList;
    }
    get length() {
        return this._storyList.reduce((previous, current) => {
            return previous + current.length;
        }, 0);
    }
    createStory(by, content, at) {
        this.createAndGetStory(by, content, at);
        return this;
    }
    createAndGetStory(by, content, at) {
        const story = story_1.Story.create();
        story.createThesisBullet(by, content, at);
        this.addStory(story);
        return story;
    }
    createFileStory(by, files, at) {
        this.createAndGetFileStory(by, files, at);
        return this;
    }
    createAndGetFileStory(by, files, at) {
        const story = story_1.Story.create();
        story.createFileThesisBullet(by, files, at);
        this.addStory(story);
        return story;
    }
    createAttachmentStory(by, text, files, at) {
        this.createAndGetAttachmentStory(by, text, files, at);
        return this;
    }
    createAndGetAttachmentStory(by, text, files, at) {
        const story = story_1.Story.create();
        story.createAttachmentThesisBullet(by, text, files, at);
        this.addStory(story);
        return story;
    }
    filterStories(func) {
        return this._storyList.filter(func);
    }
    addRecord(record) {
        const storyID = record.story;
        if (this._storyMap.has(storyID)) {
            const story = this._storyMap.get(storyID);
            story.addRecord(record);
        }
        else {
            const story = story_1.Story.withRecord(record);
            this._storyList.push(story);
            this._storyMap.set(storyID, story);
        }
        return this;
    }
    addRecordList(records) {
        for (const record of records) {
            this.addRecord(record);
        }
        return this;
    }
    addStory(story) {
        if (!this._storyMap.has(story.id)) {
            this._storyList.push(story);
            this._storyMap.set(story.id, story);
        }
        return this;
    }
    hasStory(id) {
        return this._storyMap.has(id);
    }
    getStory(id) {
        if (this.hasStory(id)) {
            return this._storyMap.get(id);
        }
        return null;
    }
    assertStory(id) {
        return this.getStory(id);
    }
    ensureStory(id) {
        const story = this.getStory(id);
        if (!story) {
            throw new Error('[Ronpa] Undefined Story');
        }
        return story;
    }
    getThesisStories() {
        return this.filterStories((story) => story.hasThesis());
    }
    hasBullet(id) {
        for (const story of this._storyList) {
            if (story.hasBullet(id)) {
                return true;
            }
        }
        return false;
    }
    getBullet(id) {
        for (const story of this._storyList) {
            if (story.hasBullet(id)) {
                return story.getBullet(id);
            }
        }
        return null;
    }
    assertBullet(id) {
        return this.getBullet(id);
    }
    ensureBullet(id) {
        const bullet = this.getBullet(id);
        if (!bullet) {
            throw new Error('[Ronpa] Undefined Bullet');
        }
        return bullet;
    }
    flat() {
        const records = [];
        this._storyList.forEach((story) => records.push(...story.flat()));
        return records;
    }
    flatSome(func) {
        const stories = this.filterStories(func);
        const records = [];
        stories.forEach((story) => records.push(...story.flat()));
        return records;
    }
    hash() {
        return this.flat().map((record) => record.id).join('::');
    }
    clone() {
        return Ronpa.rebuild(this.flat());
    }
    equals(another) {
        if (typeof another.hash !== 'function') {
            return false;
        }
        return another.hash() === this.hash();
    }
    apply(change) {
        switch (change.action) {
            case declare_1.RONPA_ACTION.ADD_THESIS: {
                const thesis = change;
                const story = story_1.Story.withRecord(thesis);
                this.addStory(story);
                return this;
            }
            case declare_1.RONPA_ACTION.ADD_REPLY: {
                const reply = change;
                const story = this.ensureStory(reply.story);
                const bullet = bullet_1.Bullet.fromRecord(reply);
                story.addBullet(bullet);
                return this;
            }
            case declare_1.RONPA_ACTION.ADD_REACTION: {
                const reaction = change;
                const bullet = this.ensureBullet(reaction.bulletId);
                bullet.addReaction(reaction.by, reaction.reaction, reaction.at);
                return this;
            }
            case declare_1.RONPA_ACTION.REMOVE_REACTION: {
                const reaction = change;
                const bullet = this.ensureBullet(reaction.bulletId);
                bullet.removeReaction(reaction.by, reaction.reaction);
                return this;
            }
        }
        return this;
    }
}
exports.Ronpa = Ronpa;
