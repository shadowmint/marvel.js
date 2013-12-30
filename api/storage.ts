/// <reference path="__init__.ts"/>
module mv {
    export module api {
        export interface Storage {
            // Fetch model state for model, field
            // Validate model, return validation token or errors
            // Persist update
        }

        /* Runtime binding constant */
        export var STORAGE = 'storage';
    }
}
