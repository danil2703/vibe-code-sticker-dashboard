import './Toolbar.css'

interface ToolbarProps {
  onAddSticker: () => void
  onClearAll: () => void
  hasStickers: boolean
}

function Toolbar({ onAddSticker, onClearAll, hasStickers }: ToolbarProps) {
  return (
    <div className="toolbar">
      <button className="toolbar-button toolbar-button-primary" onClick={onAddSticker} aria-label="Add sticker">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Sticker
      </button>
      {hasStickers && (
        <button
          className="toolbar-button toolbar-button-danger"
          onClick={onClearAll}
          aria-label="Clear all stickers"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Clear All
        </button>
      )}
    </div>
  )
}

export default Toolbar
