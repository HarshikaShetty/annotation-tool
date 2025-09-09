# Image Annotation Tool

A React-based web application for annotating images with webcam capture support.

## How to Run Project

```bash
# Clone the repository
git clone <repository-url>
cd image-annotation-tool

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser at http://localhost:5173

# Build for production
npm run build
```

## Component Structure

```
App.tsx (Main container)
├── ImageGallery.tsx (Image carousel with live feed option)
├── CaptureView.tsx (Webcam capture interface)
├── Annotator.tsx (Main annotation workspace)
└── ObjectPanel.tsx (Annotation management sidebar)

Hooks:
├── useAnnotations.ts (Annotation state logic)
└── useWebcamCapture.ts (Camera functionality)

State Management:
└── atom.ts (Global state with Jotai)
```

## Functionality

### Core Features

- **Live Feed Mode**: Access webcam for real-time capture and annotation
- **Image Gallery**: Carousel slider showing captured images with annotations preview
- **Image Capture**: Take photos directly from webcam interface
- **Annotation Tools**: Draw and label objects on images
- **Object Management**: View, edit and organize annotations in dedicated panel

### User Workflow

1. Start with Live Feed or select existing image from gallery
2. Capture new image using webcam if needed
3. Switch to annotation mode to mark objects
4. Add labels and descriptions to annotations
5. Review all annotations in object panel
6. Save annotated images for future reference

### Technical Features

- Real-time webcam integration
- Image carousel with responsive design
- State persistence across sessions
- TypeScript for type safety
- Tailwind CSS for styling

---

Built with React and TypeScript for modern web annotation needs.
