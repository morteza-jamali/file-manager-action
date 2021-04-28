import {readFileSync, copyFile} from 'fs'
import {load} from 'js-yaml'
import {getInput, setFailed, info} from '@actions/core'

interface ITasks {
  copy?: {src: string; dest: string}[]
}

interface IRunProps {
  input: string
}

export const copy = async (prop: Required<ITasks>['copy']): Promise<void> => {
  for (const {src, dest} of prop) {
    copyFile(src, dest, error => {
      if (error) {
        throw error
      }

      info(`'${src}' file copied to '${dest}'`)
    })
  }
}

export const run = async ({input}: IRunProps): Promise<void> => {
  try {
    const {tasks} = load(readFileSync(input, 'utf8')) as {
      tasks: ITasks
    }

    if (tasks.copy) copy(tasks.copy)
  } catch (error) {
    setFailed(error.message)
  }
}

run({input: getInput('tasks')})
