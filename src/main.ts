import core from '@actions/core'
import {getAntlr} from './installer'

async function run(): Promise<void> {
  try {
    await getAntlr()
  } catch (error) {
    core.setFailed(error)
  }
}

run()
