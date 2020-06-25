import * as core from '@actions/core'
import * as path from 'path'
import * as installer from './installer'

const TOOL_NAME = 'antlr4'
const VERSION = '4.8'

async function run(): Promise<void> {
  try {
    await installer.getAntlr(TOOL_NAME, VERSION)
    const javaHome = process.env.JAVA_HOME
    const javaExecVar = 'JAVA_EXEC'
    const javaExec = process.env[javaExecVar]
    if (!javaExec && javaHome) {
      const javaBin = path.join(javaHome, 'bin', 'java')
      core.exportVariable(javaExecVar, javaBin)
      core.info(`Exporting ${javaExecVar} variable with reference to java binary: ${javaBin}`)
    } else {
      if (javaHome && javaExec) {
        core.info(
          `JAVA_HOME variable was found pointing at ${javaHome}, but ${javaExecVar} variable is already declared: ${javaExec}`
        )
      } else if (!javaHome) {
        core.info(`JAVA_HOME variable was not found, so there is no point in exporting ${javaExecVar} variable`)
      }
    }
  } catch (error) {
    core.setFailed(error)
  }
}

run()
