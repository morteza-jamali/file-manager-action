import {access, constants} from 'fs'
import mock from 'mock-fs'
import {copy} from '../src/main'

beforeEach(async () => {
  mock({
    '/test': {
      'note.md': 'hello world!'
    }
  })
})

afterEach(async () => {
  mock.restore()
})

test('Copy task test', async () => {
  await copy([
    {
      src: '/test/note.md',
      dest: '/test/another-note.md'
    }
  ])

  return access('/test/another-note.md', constants.F_OK, exist =>
    expect(exist).toBeFalsy()
  )
})
