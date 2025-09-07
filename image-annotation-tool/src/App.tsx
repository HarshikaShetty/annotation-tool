import { useCallback, useRef, useState } from 'react'
import type Webcam from 'react-webcam';
import { useSetAtom } from 'jotai';

import './App.css'
import './index.css'

import CaptureView from './components/captureView'
import ImageGallery from './components/imageGallery';
import { imagesAtom, showWebCamAtom } from './store/atom';


function App() {

  const webcamRef = useRef<Webcam>(null);
  const [selectedImageId, setSelectedImageId] = useState<string | null>('');
  const setImages = useSetAtom(imagesAtom);
  const setShowWebCam = useSetAtom(showWebCamAtom);

  const handleCaptureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const newImage: IImage = {
        id: Date.now().toString(),
        src: imageSrc,
        name: `image-${Date.now()}.jpeg`,
        annotations: []
      }
      setImages(prevImages => [...prevImages, newImage]);
    }
  }, [setImages])

  const handleSelectImage = useCallback((id: string | null) => {
    setSelectedImageId(id || null);
    setShowWebCam(!id);
  }, [setShowWebCam])

  return (
    <div className='w-full h-screen flex items-center justify-between p-4'>
      <div className='w-[70%] h-full flex flex-col gap-12 bg-gray-100 rounded-2xl'>
        <CaptureView webcamRef={webcamRef} onCapture={handleCaptureImage} />
        <ImageGallery handleSelectImage={handleSelectImage} selectedImageId={selectedImageId} />
      </div>
    </div>
  )
}

export default App
