import { ipcMain } from 'electron'

type WsState = 'idle' | 'connecting' | 'open' | 'closed' | 'error'

type ConnectResult = {
  success: boolean
  state: WsState
  error?: string
}

type SendResult = {
  success: boolean
  error?: string
}

type WsStatus = {
  connected: boolean
  state: WsState
  url: string | null
}

type WsClient = {
  readyState: number
  send: (data: string) => void
  close: (code?: number, reason?: string) => void
  addEventListener: (
    type: 'open' | 'close' | 'error' | 'message',
    listener: (event: unknown) => void,
    options?: { once?: boolean }
  ) => void
}

let socket: WsClient | null = null

let wsState: WsState = 'idle'
let currentUrl: string | null = null

const READY_STATE_OPEN = 1

const isConnected = (): boolean => socket !== null && socket.readyState === READY_STATE_OPEN

const getWebSocketCtor = (): new (url: string) => WsClient => {
  const ctor = (globalThis as { WebSocket?: new (url: string) => WsClient }).WebSocket
  if (!ctor) {
    throw new Error('WebSocket is not available in main process')
  }
  return ctor
}

const normalizeError = (error: unknown): string =>
  error instanceof Error ? error.message : String(error)

export async function connectWebSocket(url: string): Promise<ConnectResult> {
  try {
    if (!url || typeof url !== 'string') {
      return { success: false, state: 'error', error: 'Invalid WebSocket URL' }
    }

    // 既存接続がある場合は作り直す
    if (socket) {
      try {
        socket.close(1000, 'reconnect')
      } catch {
        // no-op
      }
    }

    const WebSocketCtor = getWebSocketCtor()
    wsState = 'connecting'
    currentUrl = url
    socket = new WebSocketCtor(url)
    const ws = socket

    ws.addEventListener('open', () => {
      wsState = 'open'
    })

    ws.addEventListener('close', () => {
      wsState = 'closed'
    })

    ws.addEventListener('error', () => {
      wsState = 'error'
    })

    return await new Promise<ConnectResult>((resolve) => {
      ws.addEventListener(
        'open',
        () => resolve({ success: true, state: 'open' }),
        { once: true }
      )

      ws.addEventListener(
        'error',
        () => resolve({ success: false, state: 'error', error: 'Failed to open WebSocket' }),
        { once: true }
      )
    })
  } catch (error) {
    wsState = 'error'
    return { success: false, state: wsState, error: normalizeError(error) }
  }
}

export function registerWebSocketIPC(): void {
  ipcMain.handle('ws:connect', async (_event, url: string): Promise<ConnectResult> => {
    return await connectWebSocket(url)
  })

  ipcMain.handle('ws:send', async (_event, payload: unknown): Promise<SendResult> => {
    try {
      if (!isConnected() || !socket) {
        return { success: false, error: 'WebSocket is not connected' }
      }

      const message = typeof payload === 'string' ? payload : JSON.stringify(payload)
      socket.send(message)
      return { success: true }
    } catch (error) {
      return { success: false, error: normalizeError(error) }
    }
  })

  ipcMain.handle('ws:disconnect', async (): Promise<SendResult> => {
    try {
      if (!socket) {
        wsState = 'closed'
        return { success: true }
      }
      socket.close(1000, 'manual disconnect')
      wsState = 'closed'
      socket = null
      currentUrl = null
      return { success: true }
    } catch (error) {
      return { success: false, error: normalizeError(error) }
    }
  })

  ipcMain.handle('ws:status', async (): Promise<WsStatus> => {
    return {
      connected: isConnected(),
      state: wsState,
      url: currentUrl
    }
  })
}
