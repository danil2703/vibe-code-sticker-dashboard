import { StickerData } from '../types'

const STORAGE_KEY = 'sticker-dashboard-data'
const STORAGE_KEY_NEXT_ID = 'sticker-dashboard-next-id'

export interface StoredData {
  stickers: StickerData[]
  nextId: number
}

/**
 * Load stickers data from localStorage
 * @returns Stored data or null if not found/invalid
 */
export function loadStickersFromStorage(): StoredData | null {
  try {
    const stickersJson = localStorage.getItem(STORAGE_KEY)
    const nextIdJson = localStorage.getItem(STORAGE_KEY_NEXT_ID)

    if (!stickersJson || !nextIdJson) {
      return null
    }

    const stickers = JSON.parse(stickersJson) as StickerData[]
    const nextId = parseInt(nextIdJson, 10)

    // Validate data structure
    if (
      !Array.isArray(stickers) ||
      !Number.isInteger(nextId) ||
      nextId < 1
    ) {
      return null
    }

    // Validate each sticker has required fields
    const isValid = stickers.every(
      (sticker) =>
        typeof sticker.id === 'number' &&
        typeof sticker.x === 'number' &&
        typeof sticker.y === 'number' &&
        typeof sticker.width === 'number' &&
        typeof sticker.height === 'number' &&
        typeof sticker.text === 'string' &&
        typeof sticker.color === 'string'
    )

    if (!isValid) {
      return null
    }

    return { stickers, nextId }
  } catch (error) {
    console.error('Error loading stickers from localStorage:', error)
    return null
  }
}

/**
 * Save stickers data to localStorage
 * @param stickers - Array of stickers to save
 * @param nextId - Next ID to use for new stickers
 */
export function saveStickersToStorage(
  stickers: StickerData[],
  nextId: number
): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers))
    localStorage.setItem(STORAGE_KEY_NEXT_ID, nextId.toString())
  } catch (error) {
    console.error('Error saving stickers to localStorage:', error)
    // Handle quota exceeded error
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      console.warn('localStorage quota exceeded. Consider removing old data.')
    }
  }
}

/**
 * Clear all stored sticker data
 */
export function clearStickersStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(STORAGE_KEY_NEXT_ID)
  } catch (error) {
    console.error('Error clearing stickers from localStorage:', error)
  }
}
