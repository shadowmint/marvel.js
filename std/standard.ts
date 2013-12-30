/// <reference path="__init__.ts"/>
module mv {
    export module std {

        /* Registers all the standard modules */
        export class Standard implements mv.api.Binding {
            public bindings():any[] {
                return [
                    [mv.api.BINDING, mv.std.Console],
                    [mv.api.BINDING, mv.std.LocalStorage],
                    [mv.api.BINDING, mv.std.widgets]
                ];
            }
        }
    }
}
