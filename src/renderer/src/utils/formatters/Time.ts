export type ParsedTime = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
} | null

export const parseLastSendTime = (timeStr: string): ParsedTime => {
  const date = new Date(timeStr)
  if (isNaN(date.getTime())) return null

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // 0-based
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes()
  }
}

export const isToday = (t: ParsedTime): boolean => {
  if (!t) return false
  const now = new Date()
  return t.year === now.getFullYear() && t.month === now.getMonth() + 1 && t.day === now.getDate()
}

export const isThisYear = (t: ParsedTime): boolean => {
  if (!t) return false
  const now = new Date()
  return t.year === now.getFullYear()
}

// 追加のヘルパー関数
export const formatRelativeTime = (timeStr: string): string => {
  const parsed = parseLastSendTime(timeStr)
  if (!parsed) return timeStr

  if (isToday(parsed)) {
    return `${parsed.hour.toString().padStart(2, '0')}:${parsed.minute.toString().padStart(2, '0')}`
  }

  if (isThisYear(parsed)) {
    return `${parsed.month}/${parsed.day}`
  }

  return `${parsed.year}/${parsed.month}/${parsed.day}`
}
