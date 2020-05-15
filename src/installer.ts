import * as core from '@actions/core'
import * as path from 'path'
import * as tc from '@actions/tool-cache'

const TOOL_NAME = 'antlr4'
const VERSION = '4.8'

export async function getAntlr(): Promise<void> {
  let toolPath: string = tc.find(TOOL_NAME, VERSION)
  const toolFile = `antlr-${VERSION}-complete.jar`

  if (toolPath) {
    core.debug(`Tool found in cache ${toolPath}`)
  } else {
    core.debug(`Downloading ANTLR ${VERSION} from official site`)
    const antlr4 = await tc.downloadTool(`https://www.antlr.org/download/antlr-${VERSION}-complete.jar`)
    toolPath = await tc.cacheFile(antlr4, toolFile, TOOL_NAME, VERSION)
  }

  const antlr4ToolPath = path.join(toolPath, toolFile)
  core.exportVariable('Antlr4ToolPath', antlr4ToolPath)
  core.addPath(toolPath)
}
