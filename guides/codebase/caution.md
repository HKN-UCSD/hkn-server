# Things To Watch Out For When Working On The Codebase

## Circular Dependency

### Problem

For example, if you have a service file and you import another service file from the same folder (both are in ./src/services), that imported service file's filepath has to be a regular relative file path (./src/services/importedService or in our case ./src/services) instead of using the path alias for the services folder (which is @Services in our case). There are three reasons for this:

- We use path aliases for the immediate subfolders of ./src (check tsconfig.json for the path aliases).
- We export services/middlewares/mappers/etc. via a top-level index file in those subfolders.
- JavaScript import has to be resolved/loaded for the whole file.

Because we use the top-level index file to import from a subfolder, if a file (f1) within that subfolder uses another file (f2) in the same subfolder, then f1 has an import statement akin to `import { f2Service } from '@Services'`. The problem is, since the top-level index
file already contains things imported from f1 and f2, if the import statement for f1 is before that of f2 in the top-level index file and
f1 imports things from f2 via @Services, then f2's import statement in f1 will try to resolve the top-level index file, which imports f1,
so f1's import statement in the top-level index file will try to resolve f1, but since f1 isn't resolved because it's still trying to resolve the top-level index file, it will go back to the top-level index file. This goes on and on, creating a circular dependency.

### Solutions

1. Make the imported service file's filepath in the original service file a regular relative file path. (Recommended)
2. Use '@Services/importedService' instead of '@Services'. (Not Recommended)
3. Put the import statement for the imported service file before in the top-level index file. (**Not** Recommended)
