import core from '@actions/core'
import path from 'path'
import tc from '@actions/tool-cache'

const TOOL_NAME = 'antlr4'
const VERSION = '4.8'

export async function getAntlr(): Promise<void> {
  let toolPath: string | null | undefined = tc.find(TOOL_NAME, VERSION)

  if (toolPath) {
    core.debug(`Tool found in cache ${toolPath}`)
  } else {
    core.debug(`Downloading ANTLR ${VERSION} from official site`)
    const antlr4 = await tc.downloadTool(
      `https://www.antlr.org/download/antlr-${VERSION}-complete.jar`
    )
    toolPath = await tc.cacheFile(
      antlr4,
      `antlr-${VERSION}-complete.jar`,
      TOOL_NAME,
      VERSION
    )
  }

  core.exportVariable('Antlr4ToolPath', toolPath)
  core.addPath(path.join(toolPath, 'bin'))
}
