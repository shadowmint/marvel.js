/// <reference path="__init__.ts"/>
module mv {
    export module std {

        /* Registers all the standard editors */
        export class Widgets implements mv.api.Binding {
            public bindings():any[] {
                return [
                    [mv.api.EDITOR, mv.std.widgets.Label, 'label']
                    [mv.api.EDITOR, mv.std.widgets.Text, 'text'],
                    [mv.api.EDITOR, mv.std.widgets.Date, 'date'],
                    [mv.api.EDITOR, mv.std.widgets.Time, 'time'],
                    [mv.api.EDITOR, mv.std.widgets.DateTime, 'datetime']
                ];
            }
        }
    }
}
