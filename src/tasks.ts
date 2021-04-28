import {resolve} from 'path'
import {copyFile, unlink} from 'fs'
import {info} from '@actions/core'

export interface ITasks {
  copy?: {src: string; dest: string}[]
  remove?: string[]
}

export const copyTask = async (
  prop: Required<ITasks>['copy']
): Promise<void> => {
  for (const {src, dest} of prop) {
    copyFile(resolve(src), resolve(dest), error => {
      if (error) {
        throw error
      }

      info(`'${src}' file copied to '${dest}'`)
    })
  }
}

export const removeTask = async (
  prop: Required<ITasks>['remove']
): Promise<void> => {
  for (const path of prop) {
    unlink(path, error => {
      if (error) throw error

      info(`'${path}' removed`)
    })
  }
}
