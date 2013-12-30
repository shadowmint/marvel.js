/// <reference path="__init__.ts"/>
module mv {
    export module std {

        /* ... */
        export class LocalStorage implements mv.api.Binding, mv.api.Storage {

            public bindings():any[] {
                return [[mv.api.Storage, mv.std.LocalStorage]];
            }
        }
    }
}
