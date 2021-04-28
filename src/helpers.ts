import {readFile} from 'fs'
import {load} from 'js-yaml'
import {getInput} from '@actions/core'
import type {ITasks} from './tasks'

export const getTasks = async (
  path: string = getInput('tasks')
): Promise<ITasks> =>
  new Promise((resolve, reject) => {
    readFile(path, {encoding: 'utf8'}, (error, data) => {
      if (error) reject(error)

      resolve((load(data) as {tasks: ITasks})['tasks'])
    })
  })
