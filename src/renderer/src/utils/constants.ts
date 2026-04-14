// アプリケーション全体の定数

// レイアウト関連
export const LAYOUT_CONSTANTS = {
  HEADER_HEIGHT: 49,
  SIDEBAR_WIDTH: 70,
  SIDEBAR_COLLAPSED_WIDTH: 0,
  CHAT_SIDEBAR_WIDTH: 240,
  CHAT_HEADER_HEIGHT: 55,
  CHAT_FOOTER_HEIGHT: 190
} as const

// カラーテーマ
export const COLORS = {
  PRIMARY: '#328E6E',
  PRIMARY_LIGHT: '#67AE6E',
  BACKGROUND_GRAY: '#e0e0e0',
  BACKGROUND_LIGHT: '#FBFBFB',
  BACKGROUND_WHITE: '#FFFFFF',
  SIDEBAR_GRAY: '#e9e9e9',
  BORDER_GRAY: '#E5E5E5',
  TEXT_PRIMARY: '#000000',
  TEXT_SECONDARY: '#494949',
  TEXT_SELECTED: '#328E6E',
  MYMESSAGE: '#BCF9C4',
  OTHERMESSAGE: '#F3F3F3'
} as const

// ナビゲーション関連
export const NAVIGATION_ITEMS = [
  { path: '/', name: 'Home' },
  { path: '/activity', name: 'Activity' },
  { path: '/chat', name: 'Chat' },
  { path: '/team', name: 'Team' },
  { path: '/quest', name: 'Quest' },
  { path: '/setting', name: 'Setting' },
  { path: '/otherapp', name: '' },
  { path: '/appstore', name: 'App' }
] as const

// チャット関連
export const CHAT_CONSTANTS = {
  DEFAULT_TAB: '1',
  TABS: {
    CHAT: '1',
    FILES: '2',
    SETTINGS: '3'
  },
  TAB_LABELS: {
    '1': 'チャット',
    '2': 'ファイル',
    '3': '設定'
  }
} as const
