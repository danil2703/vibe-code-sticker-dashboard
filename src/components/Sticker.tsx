import { useState, useRef, useCallback, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { StickerData } from '../types'
import './Sticker.css'

interface StickerProps {
  sticker: StickerData
  onMove: (id: number, x: number, y: number) => void
  onUpdate: (id: number, updates: Partial<StickerData>) => void
  onDelete: (id: number) => void
}

function Sticker({ sticker, onMove, onUpdate, onDelete }: StickerProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'sticker',
    item: { id: sticker.id, x: sticker.x, y: sticker.y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset()
      if (delta) {
        const newX = Math.max(0, Math.min(window.innerWidth - sticker.width, sticker.x + delta.x))
        const newY = Math.max(0, Math.min(window.innerHeight - sticker.height, sticker.y + delta.y))
        onMove(sticker.id, newX, newY)
      }
    },
  })

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onUpdate(sticker.id, { text: e.target.value })
    },
    [sticker.id, onUpdate]
  )

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsEditing(false)
  }, [])

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onDelete(sticker.id)
    },
    [sticker.id, onDelete]
  )

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.select()
    }
  }, [isEditing])

  return (
    <div
      ref={drag}
      className={`sticker ${isDragging ? 'dragging' : ''}`}
      style={{
        left: `${sticker.x}px`,
        top: `${sticker.y}px`,
        width: `${sticker.width}px`,
        height: `${sticker.height}px`,
        backgroundColor: sticker.color,
        opacity: isDragging ? 0.5 : 1,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={handleDoubleClick}
    >
      {isHovered && (
        <button
          className="sticker-delete-button"
          onClick={handleDelete}
          aria-label="Delete sticker"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
      <div className="sticker-header">
        <div className="sticker-handle">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="12" r="1"></circle>
            <circle cx="9" cy="5" r="1"></circle>
            <circle cx="9" cy="19" r="1"></circle>
            <circle cx="15" cy="12" r="1"></circle>
            <circle cx="15" cy="5" r="1"></circle>
            <circle cx="15" cy="19" r="1"></circle>
          </svg>
        </div>
      </div>
      <div className="sticker-content">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            className="sticker-textarea"
            value={sticker.text}
            onChange={handleTextChange}
            onBlur={handleBlur}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              height: '100%',
              resize: 'none',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'inherit',
              fontSize: '14px',
              lineHeight: '1.5',
              padding: '8px',
            }}
          />
        ) : (
          <div className="sticker-text" onClick={handleDoubleClick}>
            {sticker.text || (
              <span className="sticker-placeholder">Double-click to edit</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sticker
