// electron/ipc/file.ts
import { ipcMain, app } from 'electron'
import { readFile, readdir } from 'fs/promises'
import * as fs from 'fs'
import { join } from 'path'
import { ChatMessage, dataTemplate } from '../../types/chat'

export function loadRoomData(): void {
  ipcMain.handle('load-room-talk', async (_, type: string, roomId: string) => {
    try {
      const dirPath = join(
        app.getPath('appData'),
        'TeamsAndMessenger',
        'data',
        'rooms',
        type,
        roomId
      )

      console.log('🔍 Searching directory:', dirPath)
      console.log('📁 Parameters:', { type, roomId })

      // ディレクトリ存在チェック なければ作成
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }


      const files = await readdir(dirPath)
      console.log('📂 Found files:', files)

      const jsonFiles = files
        .filter((file) => /^\d{4}-\d{2}-\d{2}-\d{2}\.json$/.test(file))
        .map((file) => ({
          filename: file,
          sortKey: (() => {
            const [year, month, day, seq] = file.replace('.json', '').split('-').map(Number)
            return new Date(year, month - 1, day).getTime() + seq / 100
          })()
        }))

      console.log('✅ Matching JSON files:', jsonFiles)

      if (jsonFiles.length === 0) {
        return { success: false, error: 'No matching files found.' }
      }

      // 最新ファイル = ソート降順の先頭
      jsonFiles.sort((a, b) => b.sortKey - a.sortKey)
      const latestFile = jsonFiles[0].filename
      const latestFilePath = join(dirPath, latestFile)
      const contentStr = await readFile(latestFilePath, 'utf-8')
      const content = JSON.parse(contentStr)

      return {
        success: true,
        filename: latestFile,
        data: content
      }
    } catch (e: unknown) {
      const error = e instanceof Error ? e.message : 'Unknown error'
      console.error('❌ File loading error:', error)
      return { success: false, error }
    }
  })
}
