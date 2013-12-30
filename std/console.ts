/// <reference path="__init__.ts"/>
module mv {
    export module std {

        /* ... */
        export class Console implements mv.api.Binding, mv.api.Notice {

            public bindings():any[] {
                return [[mv.api.NOTICE, mv.std.Console]];
            }
        }
    }
}
