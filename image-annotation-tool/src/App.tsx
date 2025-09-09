import "./App.css";
import "./index.css";

import CaptureView from "./components/captureView";
import ImageGallery from "./components/imageGallery";
import Annotator from "./components/annotator";
import ObjectPanel from "./components/objectPanel";

import { useWebcamCapture } from "./hooks/useWebcamCapture";
import { useAnnotations } from "./hooks/useAnnotations";

function App() {

  const { webcamRef, handleCaptureImage } = useWebcamCapture();
  const {
    selectedObject,
    setSelectedObject,
    selectedImageId,
    activeAnnotations,
    currentImage,
    handleSelectImage,
    handleSaveAnnotations,
    handleAnnotationChange,
    handleExitAnnotationMode,
  } = useAnnotations();

  return (
    <div className="w-full h-screen flex items-center justify-between gap-4 p-4 bg-neutral-300">
      <div className="w-[80%] h-full flex flex-col justify-between rounded-2xl">
        <CaptureView webcamRef={webcamRef} onCapture={handleCaptureImage} />
        {selectedImageId && <Annotator
          selectedObject={selectedObject}
          activeImageSrc={currentImage?.src || null}
          onAnnotationChange={handleAnnotationChange}
          activeAnnotations={activeAnnotations}
        />}
        <ImageGallery
          handleSelectImage={handleSelectImage}
          selectedImageId={selectedImageId}
        />
      </div>
      {selectedImageId && (
        <ObjectPanel
          selectedObject={selectedObject}
          handleSelectObject={setSelectedObject}
          onSaveAnnotations={handleSaveAnnotations}
          onCancel={handleExitAnnotationMode}
        />
      )}
    </div>
  );
}

export default App;
