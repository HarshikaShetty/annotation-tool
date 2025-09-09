import { useCallback, useRef } from "react";
import type Webcam from "react-webcam";
import { useSetAtom } from "jotai";

import { imagesAtom } from "../store/atom";

export function useWebcamCapture() {
  const webcamRef = useRef<Webcam>(null);
  const setImages = useSetAtom(imagesAtom);

  const handleCaptureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const newImage: IImage = {
        id: Date.now().toString(),
        src: imageSrc,
        name: `image-${Date.now()}.jpeg`,
        annotations: [],
      };
      setImages((prevImages) => [...prevImages, newImage]);
    }
  }, [setImages]);

  return { webcamRef, handleCaptureImage };
}
