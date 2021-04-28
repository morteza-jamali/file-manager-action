# File Manager action

Use this action for file management in workflow .

## Inputs

### `tasks`

**Required** {string} Action tasks file path. Default `"./fileManagerTasks.yml"`.

## Example usage

First create `fileManagerTasks.yml` file in the root of the repository with the following syntax:

```yaml
tasks:
  copy:
    - src: '[source file path]'
      dest: '[destination file path]'
  remove: ['file path']
```

then in your workflow use action.

```yaml
name: 'file-management'

on: ['push']

jobs:
  copy:
    runs-on: ubuntu-latest
    steps:
      - uses: morteza-jamali/file-manager-action@latest
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Maintainers

[@morteza-jamali](https://github.com/morteza-jamali)

## License

This project is released under the [MIT License](./LICENSE).
