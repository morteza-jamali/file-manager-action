import mock from 'mock-fs'
import {access, constants} from 'fs'
import {copyTask, removeTask, ITasks} from '../src/tasks'
import {getTasks} from '../src/helpers'

const mockFsRoot: string = '/test'
let tasks: Required<ITasks>

const fixTasks = (prop: Required<ITasks>): Required<ITasks> => {
  prop.copy = prop.copy.map(({src, dest}) => ({
    src: `${mockFsRoot}/${src}`,
    dest: `${mockFsRoot}/${dest}`
  }))

  prop.remove = prop.remove.map(path => `${mockFsRoot}/${path}`)

  return prop
}

const getRequiredFiles = (prop: Required<ITasks>): {[key: string]: string} => {
  let paths: string[] = []
  let result: {[key: string]: string} = {}

  prop.copy.forEach(({src}) => paths.push(src))
  prop.remove.forEach(path => {
    if (paths.indexOf(path) === -1) {
      paths.push(path)
    }
  })

  for (const path of paths) {
    result[path] = 'This is testing content'
  }

  return result
}

describe('File tasks test', () => {
  beforeAll(async () => {
    await getTasks('./__tests__/fileManagerTasks.yml').then(task => {
      tasks = task as Required<ITasks>
    })

    mock({
      [mockFsRoot]: getRequiredFiles(tasks)
    })

    tasks = fixTasks(tasks)
  })

  afterAll(async () => {
    mock.restore()
  })

  test('Copy task test', async () => {
    const {copy} = tasks

    await copyTask(copy)

    copy.forEach(({dest}) =>
      access(dest, constants.F_OK, error => expect(error).toBeFalsy())
    )
  })

  test('Remove task test', async () => {
    const {remove} = tasks

    await removeTask(remove)

    remove.forEach(path =>
      access(path, constants.F_OK, error => expect(error).toBeTruthy())
    )
  })
})
