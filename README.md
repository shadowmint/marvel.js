# Marvel

Frontend awesomeness framework

## Depednencies

- libn

## Quick start

    <!-- Marvel & deps -->
    <script src="/js/libn.js"></script>
    <script src="/js/marvel.js"></script>

    <!-- Editable content -->
    <div id='blah' data-marvel='text' data-marvel-id='Page#334::title'> My Old Title </div>
    <a href="#" onclick="var e = document.getElementById('blah'); marvel.edit(e); return false;">Edit</a>

    <div id='blah2' data-marvel='text' data-marvel-id='Page#334::name'> Mr Dee Door </div>
    <a href="#" onclick="var e = document.getElementById('blah2'); marvel.edit(e); return false;">Edit</a>

    <div id='blah3' data-marvel='text' data-marvel-id='Page#334::value'> This is a teapot </div>
    <a href="#" onclick="var e = document.getElementById('blah3'); marvel.edit(e); return false;">Edit</a>

    <!-- Save page changes -->
    <a href="#" onclick="marvel.save(); return false;">Save Page</a>

    <!-- Register marvel editors and providers -->
    <script>marvel.register(mv.std.Standard);</script>

In a real application rather than using mv.std.Standard a framework of UI widgets
would be used, and a customized backend service would be created to persist
changes.

## How does it work

Marvel lets you edit content dynamically using javascript editing providers.

Marvel does not provide an interface for doing this; just an api.
You must implement the api to use marvel or use a separate module
that does this.

## Concepts

Marvel is a low level editing provider.

To trigger editing of a page element:

    marvel.edit(element)

To trigger a save of all edited elements on the page:

    marvel.save()

Marvel will only edit elements which are correctly tagged.
See 'tagging' for details, but broadly speaking an element is
tagged if it contains the data attributes 'data-marvel' and
'data-marvel-id':

    <div data-marvel='string' data-marvel-id='Model#32422:name'/>

The content of the id tag is important only to the data service implementation
that marvel is connected to; it may be useful in some cases to use hashed
id, etc.

It is important to note that Marvel is a field based editing system,
not an element based one. For example with the model:

    - Shark
    -- name
    -- species
    -- length
    -- image

You cannot use marvel to edit a 'Shark' on a page full of shark
data. You can only use Marvel to edit particular fields of particular
shark records.

Calling marvel.edit() on a valid element will trigger javascript
that opens an editing widget for that field. The widget implementation
is determined by the widget itself. Marvel merely connects the
framework elements; it does not contain any native editing widgets.

The loaded widget is responsible for eventually calling save() on
the edited data, and rendering the field back to the page. This is
saved as a local change only, like a live preview.

To flush field changes to the database (or other data backend)
save() must be invoked. This will dispatch a series of commit
messages to the data service to update the data records as
appropriate.

### Authentication and change control

Flushing updates to various arbitrary fields is obviously
prone to abuse.

Marvel overcomes this by using authentication tokens.

Broadly speaking this works as follows:

    <editing widget> --> Request validation -----> <data service>
    <editing widget> <-- Auth token <------------- <data service>

    ... later ...

    <scheduler> -------> Request update, token --> <data service>
    <scheduler> -------> Request update, token --> <data service>
    <scheduler> -------> Request update, token --> <data service>
    <scheduler> -------> Request update, token --> <data service>

Its irritating to force the data service to maintain a hot list
of validatable tokens for various reasons, so the update requests
also contain all of the original details of the requested change.

A data service implementation can choose to:

- Maintain an internal token list:
  - Generate unique validation tokens for each validation request
  - Maintain an interval list of pending tokens
  - On update request, match the token id and perform the update.

- Hash valid requests and return the hash
  - Generate a hashed auth token from field,id,change,etc.
  - On update request, hatch the requested change and commit it if valid.

- Perform validation every time
  - Return a null authentication token
  - On update request, re-validate the request and commit it if valid.

Or any other combination of these; Marvel does not have an specific
requirements on the data service implementation other than that it
can accept update and validation requests.

User authentication is left to the data service; this is unremarkable
and should be done as per normal authentication practices for the
implementation type.

### Customization

When building an application that uses Marvel (or a Marvel framework)
the behaviour of Marvel is controlled by how bind() has been called.

A typical framework will provide a pre-made set of editor widgets,
and set of field types it supports. When generating markup the
framework would say, using one of the following fieldtypes for
each editable node:

- mjqui-string
- mjqui-text
- mjqui-number
- mjqui-bool
- mjqui-image
- etc.

To customize on top of this, use the marvel.bind() api to bind a
new custom field type:

   marvel.bind('custom-shark-size', myeditor);

...and generate the appropriate markup:

    <div data-marvel="custom-shark-type" data-marvel-id="Shark-32422-name"/>

### Adding new data

Marvel does not support adding new content, or changing page
layouts. It is strictly for editing content that already exists
on a site.

However, to implement this functionality is trivial if required;
simply add a marvel tag to the page body and register a custom
editor type that can perform various editing operations:

    <body data-marvel="custom-page-toolbar" data-marvel-id="213"/>

    ...

    <script>
      marvel.model.bind('custom-page-toolbar', mytoolbar);
      marvel.edit(document.body);
    </script>

### Reloading

It may sometimes be useful to dynamically update the value for an
element, for example, flash messages, rotating values, or simply
because a bad editor widget has resulted in a bad state of the page.

To reload a tagged element, use marvel.reload(e) on the element;
the storage api will be used to fetch the current state and the
local renderer will be invoked to update the dom with that content.

This is not designed to be templating system to generate pages dynmically,
and may be quite slow depending on the storage implementation.

## Tagging

All marvel tags are done via adding the 'data-marvel' attribute
to a document node for the editor type, and the 'data-marvel-id'
with context information for the storage implementation.

These tags are only checked when edit() called on a node,
typically via:

    <div id="blah" data-marvel="custom-1" data-marvel-id="32422:name"/>

    ...

    <script>
      var e = document.getElemenyById('blah');
      marvel.edit(e);
    </script>

...and it can also be passed directly via the edit call if required:

    <div id="blah"/>

    ...

    <script>
      var e = document.getElemenyById('blah');
      marvel.edit(e, 'custom-type', '32422:name');
    </script>

The id value is arbitrary and used by the storage provider to perform
various operations on the data like persistence and validation.

Typically the format of this may have to imclude various information
like model type, id, field name, etc.

    ModelType#233:myFieldName

This is up to the storage implementation.

The field type is used to determine what editor widget to load.

Complex content values (hashed, json blocks, etc.) are all valid.

## Implementing an editor widget

An editor widget is responsible for providing:

- A UI for editing the field
- Any client side validation
- Submitting the field to the storage api for validation
- Rendering the changed field to the document
- Submitting validated update to the scheduler api

The value passed to the marvel.bind() call should be a
factory that returns elements that implement the
mv.api.Editor api, note that if the editor is a class,
the factory passed to the api found be a closure that
returns an instance, eg.

    marvel.bind(function() {
      return new MyEditorType();
    });

The full details of writing an editor are not covered
here; see the mv.api.Editor class for details on how
to implement the api.

## Implementing an API provider framework

To actually use Marvel an implementation of the core apis
are required.

- Storage
-- Required to implement dispatching and validating model changes.

- Transport
-- Required to implement communication with the storage api.

- Reporting
-- Required to dispatch notices and logging.

All the other services are implemented in marvel already.

Marvel ships by default with dummy 'no op' implementations of
these services; to actually use Marvel real implementations
must be used set using marvel.register()

### Supporting drafts with the Storage api

...?????

## Debugging

You can gain programmatic access to the list of open editors,
list of pending operations and list of modified elements
using marvel.debug().

No UI is provided for this; framework implementations may choose
to implement various things on top of it if desired.

## Api

- marvel.register(type)
-- Register a service implementation

- marvel.bind(key, factory)
-- Bind an editor implementation

- marvel.edit(element)
-- Edit a specific element if possible

- marvel.save()
-- Save the changes to the current page, as much as possible
