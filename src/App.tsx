import { useState, useCallback, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import Toolbar from './components/Toolbar'
import { StickerData } from './types'
import {
  loadStickersFromStorage,
  saveStickersToStorage,
  clearStickersStorage,
} from './utils/storage'
import './App.css'

function App() {
  // Initialize state from localStorage or defaults
  const [stickers, setStickers] = useState<StickerData[]>(() => {
    const stored = loadStickersFromStorage()
    return stored?.stickers ?? []
  })
  const [nextId, setNextId] = useState<number>(() => {
    const stored = loadStickersFromStorage()
    return stored?.nextId ?? 1
  })

  // Save to localStorage whenever stickers or nextId changes
  useEffect(() => {
    if (stickers.length > 0 || nextId > 1) {
      saveStickersToStorage(stickers, nextId)
    }
  }, [stickers, nextId])

  const handleAddSticker = useCallback(() => {
    const newSticker: StickerData = {
      id: nextId,
      x: Math.random() * (window.innerWidth - 300) + 50,
      y: Math.random() * (window.innerHeight - 300) + 50,
      width: 250,
      height: 200,
      text: '',
      color: getRandomColor(),
    }
    setStickers((prev) => [...prev, newSticker])
    setNextId((prev) => prev + 1)
  }, [nextId])

  const handleUpdateSticker = useCallback((id: number, updates: Partial<StickerData>) => {
    setStickers((prev) =>
      prev.map((sticker) => (sticker.id === id ? { ...sticker, ...updates } : sticker))
    )
  }, [])

  const handleDeleteSticker = useCallback((id: number) => {
    setStickers((prev) => prev.filter((sticker) => sticker.id !== id))
  }, [])

  const handleClearAll = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all stickers? This action cannot be undone.')) {
      setStickers([])
      setNextId(1)
      clearStickersStorage()
    }
  }, [])

  return (
    <div className="app">
      <Toolbar
        onAddSticker={handleAddSticker}
        onClearAll={handleClearAll}
        hasStickers={stickers.length > 0}
      />
      <Dashboard
        stickers={stickers}
        onUpdateSticker={handleUpdateSticker}
        onDeleteSticker={handleDeleteSticker}
      />
    </div>
  )
}

function getRandomColor(): string {
  const colors = [
    '#FFE5B4', // Peach
    '#B4E5FF', // Sky Blue
    '#B4FFB4', // Mint Green
    '#FFB4E5', // Pink
    '#E5B4FF', // Lavender
    '#FFFFB4', // Yellow
    '#FFD4B4', // Apricot
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export default App
