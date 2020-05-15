import * as core from '@actions/core'
import * as installer from './installer'

async function run(): Promise<void> {
  try {
    await installer.getAntlr()
  } catch (error) {
    core.setFailed(error)
  }
}

run()
