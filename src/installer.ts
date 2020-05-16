import * as core from '@actions/core'
import * as path from 'path'
import * as tc from '@actions/tool-cache'

export async function getAntlr(toolName: 'antlr' | 'antlr4', version: string): Promise<void> {
  let toolPath: string = tc.find(toolName, version)
  const file = `antlr-${version}-complete.jar`
  const downloadPath = `https://www.antlr.org/download/${file}`

  if (toolPath) {
    core.info(`Tool found in cache ${toolPath}`)
  } else {
    core.info(`Downloading ANTLR ${version} from official site: ${downloadPath}`)
    const antlr4 = await tc.downloadTool(downloadPath)
    toolPath = await tc.cacheFile(antlr4, file, toolName, version)
  }

  const antlr4ToolPath = path.join(toolPath, file)
  core.exportVariable('Antlr4ToolPath', antlr4ToolPath)
  core.addPath(toolPath)
}
