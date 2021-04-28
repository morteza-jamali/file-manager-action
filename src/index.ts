import {setFailed} from '@actions/core'
import {ITasks, copyTask, removeTask} from './tasks'
import {getTasks} from './helpers'

export const run = async (): Promise<void> => {
  try {
    const {copy, remove}: ITasks = await getTasks()

    if (copy) copyTask(copy)
    if (remove) removeTask(remove)
  } catch (error) {
    setFailed(error.message)
  }
}

run()
