/// <reference path="__init__.ts"/>
module mv {
    export module service {

        /* Look after all the registered type states */
        export class Factory {

            /* Set of known editor types */
            private _editors:any = {};

            /* Set of known service types */
            private _services:any = {};

            /* If true, raise an error when rebinding a key */
            private _lock:boolean = false;

            /*
             * Return a singleton for a service
             * @param api The type of the service to resolve.
             * @return A service implementation or null.
             */
            public resolve(api:any):any {
            }

            /*
             * Return an instance for a named editor instance
             * @param type The field type to get an editor for.
             * @param return An editor instance or null.
             */
            public editor(type:any):any {
            }

            /*
             * Register an editor type
             * @param type The field type for the editor
             * @param editor The editor type.
             */
            public registerEditor(type:string, editor:any):void {
            }

            /*
             * Register a service type
             * @param api The interface type.
             * @param impl The implementation type.
             */
            public registerService(api:any, impl:any):void {
            }

            /*
             * Lock the factory so attempting to bind a new duplicate value
             * causes an error to be raised.
             */
            public lock():void {
                this._lock = true;
            }
        }
    }
}
