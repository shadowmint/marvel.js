/// <reference path="__init__.ts"/>
module mv {
    export module api {

        /* Interface for anything callable by marvel.register() */
        export interface Binding {

            /*
             * Returns a set of implementation bindings.
             *
             * The most basic return from this call is:
             *
             *      return [[mv.api.STORAGE, SoAndSoType]];
             *
             * If the binder type is mv.api.EDITOR an additional field type
             * value is required:
             *
             *      return [[mv.api.EDITOR, TxtEdit, 'text']];
             *
             * To provide a recursive set of bindings, use:
             *
             *      return [[mv.api.BINDING, ThisOtherBinder]];
             *
             * The returned array can be of arbitrary length and content
             * so long as these rules are observed, eg:
             *
             *      return [
             *          [mv.api.STORAGE, MyStorage],
             *          [mv.api.EDITOR, LabelEditor, 'label'],
             *          [mv.api.EDITOR, TextEditor, 'text'],
             *          [mv.api.EDITOR, ImageEditor, 'image']
             *      ];
             *
             * An instance of this type will be created if register() is not
             * passed an object that already has one; that means it needs a
             * default constructor.
             */
             bindings():any[];
        }

        /* Runtime binding constant */
        export var BINDING = 'binding';
    }
}
