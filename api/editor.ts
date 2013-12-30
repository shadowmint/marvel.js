/// <reference path="__init__.ts"/>
module mv {
    export module api {
        export interface Editor {
            // Display page editor UI
            // Generate model
            // Update model from storage
            // Validate model and get validation token
            // Display validation errors
            // Schedule page update
            // Remove page editor UI
            // Render model to page
        }

        /* Runtime binding constant */
        export var EDITOR = 'editor';
    }
}
