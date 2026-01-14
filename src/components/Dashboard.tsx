import { useCallback } from 'react'
import Sticker from './Sticker'
import { StickerData } from '../types'
import './Dashboard.css'

interface DashboardProps {
  stickers: StickerData[]
  onUpdateSticker: (id: number, updates: Partial<StickerData>) => void
  onDeleteSticker: (id: number) => void
}

function Dashboard({ stickers, onUpdateSticker, onDeleteSticker }: DashboardProps) {
  const handleMoveSticker = useCallback(
    (id: number, x: number, y: number) => {
      onUpdateSticker(id, { x, y })
    },
    [onUpdateSticker]
  )

  return (
    <div className="dashboard">
      {stickers.map((sticker) => (
        <Sticker
          key={sticker.id}
          sticker={sticker}
          onMove={handleMoveSticker}
          onUpdate={onUpdateSticker}
          onDelete={onDeleteSticker}
        />
      ))}
    </div>
  )
}

export default Dashboard
