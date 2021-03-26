# Add Path Aliases

Follow the steps below to add your own path alias.

### 1. Determine the name and the destination to point to for your path alias

The name of the path alias should be in UpperCamelCase and it should be as short and concise as possible.

The destination to point to should not coincide with the destination that an already existing path alias points to. We don't want multiple path aliases pointing to the same place.

### 2. Navigate to ./tsconfig.paths.json and add your path alias

Go to the `paths` property of `compilerOptions` and add a new key-value pair

- `"@YourPathAlias": ["DestinationPathToReplace"]`

Example: `"@Pages": ["src/pages"]`

### 3. Navigate to ./config-overrides.js and add your path alias

Go to the line starting with `module.exports` (should be at the end of the file) then look at `addWebpackAlias`. Add your path alias as a parameter to `addWebpackAlias`

- `'@YourPathAlias': path.resolve(__dirname, 'DestinationPathToReplace')`

Example: `'@Images': path.resolve(__dirname, './src/images')`

### 4. Navigate to ./eslintrc and add your path alias

Go to the `rules` property of the config JSON object, then to the `import/order` property of `rules`. Then, go to the `pathGroups` property and add your path alias

```
  {
    "pattern": "@YourPathAlias/*",
    "group": "internal"
  }
```

Example:

```
{
  "pattern": "@Constants/*",
  "group": "internal"
}
```

### 5. Restart VSCode to start using the path alias

Now you can use the path aliases whenever you need to, making import statements much cleaner and easier to read!

**Please make sure that your path alias string and destination path string all match up across all three files mentioned**
