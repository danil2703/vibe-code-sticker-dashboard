# Sticker Dashboard

A modern React application for managing stickers on dashboards with drag-and-drop functionality, text editing, and deletion capabilities.

## Features

- ✨ **Add Stickers**: Create new stickers with a single click
- 🖱️ **Drag & Drop**: Move stickers around the dashboard by dragging
- ✏️ **Text Editing**: Double-click any sticker to edit its text content
- 🗑️ **Delete Stickers**: Hover over a sticker and click the delete button
- 💾 **Auto-Save**: All stickers are automatically saved to localStorage
- 🔄 **Persistent Data**: Your stickers persist across page refreshes
- 🧹 **Clear All**: Clear all stickers with a confirmation dialog
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 📱 **Responsive**: Works on different screen sizes

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React DnD** - Drag and drop functionality
- **CSS3** - Modern styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Usage

1. **Add a Sticker**: Click the "Add Sticker" button in the toolbar
2. **Move a Sticker**: Click and drag any sticker to move it around
3. **Edit Text**: Double-click on a sticker to edit its text content
4. **Delete a Sticker**: Hover over a sticker and click the X button in the top-right corner
5. **Clear All**: Click the "Clear All" button in the toolbar to remove all stickers (with confirmation)
6. **Auto-Save**: All changes are automatically saved to your browser's localStorage

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx      # Main dashboard container
│   ├── Sticker.tsx        # Individual sticker component
│   └── Toolbar.tsx        # Top toolbar with add/clear buttons
├── utils/
│   └── storage.ts         # localStorage utilities
├── types.ts               # TypeScript type definitions
├── App.tsx                # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## Best Practices Implemented

- ✅ TypeScript for type safety
- ✅ Functional components with hooks
- ✅ Proper state management
- ✅ Memoization with useCallback
- ✅ Accessibility (ARIA labels)
- ✅ Responsive design
- ✅ Clean component structure
- ✅ Modern CSS with animations
- ✅ Error boundaries ready
- ✅ Performance optimizations

## License

MIT
