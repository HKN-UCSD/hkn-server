# Path Aliases

## Definition

A path alias is a string mapped to a specific file/folder path that can be either relative or absolute.

A path alias still represents the actual file/folder path and has the option of reaching to the subfolder(s) and subfile(s) of the path it replaces (if that path leads to a folder).

## Rationale

Writing the filepaths for import statements can be a big pain. An example of this is:

- The folder **src/pages/EventDetailsPage/components/EventDetails** has an index.tsx file. This index file imports components Tag, Card and Button from **src/components**.
- This means that to import Tag, Card and Button from **src/components** to index.tsx without using path aliases, a developer would have to write an import statement like this: `import { Tag, Card, Button } from '../../../../components';`.
- This is rather cumbersome to write and unclean to look at, which will multiply even more if there are multiple files/folders to import from.

To greatly alleviate this issue, path aliases were onboarded. They help make the import paths a lot less burdensome to write and to look at.

## Available Path Aliases

Currently in this codebase, there are 8 path aliases in total. They are:

- `@Pages` - Points to **src/pages**
- `@Constants` - Points to **src/constants**
- `@SharedComponents` - Points to **src/components**
- `@Services` - Points to **src/services**
- `@HOCs` - Points to **src/HOCs**
- `@Images` - Points to **src/images**
- `@Contexts` - Points to **src/contexts**
- `@Config` - Points to **src/config**

## Usage

`import <Stuff being imported from file/folder> from '<Path alias>';`

To use the example elaborated earlier in the _Rationale_ paragraph, using path aliases would give:
`import { Tag, Card, Button } from '@SharedComponents';`

## Add More Path Aliases

Refer to this [doc](./add_path_alias.md).
