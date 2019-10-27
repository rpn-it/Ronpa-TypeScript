/**
 * @author WMXPY
 * @namespace Ronpa
 * @description Ronpa
 */

import { RonpaConfig, Story } from "./declare";

export class Ronpa {

    public static create(): Ronpa {

        return new Ronpa();
    }

    public static rebuild(stories: Story[], config: RonpaConfig) {

        return new Ronpa(stories, config);
    }

    private readonly _stories: Story[];
    private readonly _config: RonpaConfig;

    private constructor(stories: Story[] = [], config: RonpaConfig = {}) {

        this._stories = stories;
        this._config = config;
    }
}
