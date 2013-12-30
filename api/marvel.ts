/// <reference path="__init__.ts"/>
module marvel {

    /* Register a binding */
    export function register(type:mv.api.Binding):void {
    }

    /* Bind a specific editor key */
    export function bind(key, factory):void {
    }

    /* Trigger an edit on a given element */
    export function edit(element):void {
    }

    /* Reload */
    export function reload(element):void {
    }

    /* Attempt to save pending operations */
    export function save():void {
    }

    /* Current state of the marvel api */
    export var state:any = {};
}
