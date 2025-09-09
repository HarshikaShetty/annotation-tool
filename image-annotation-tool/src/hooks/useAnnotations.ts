import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { imagesAtom, showWebCamAtom } from "../store/atom";

export function useAnnotations() {
  const [images, setImages] = useAtom(imagesAtom);
  const setShowWebCam = useSetAtom(showWebCamAtom);

  const [selectedObject, setSelectedObject] = useState<IAnnotateObject | null>(
    null
  );
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [activeAnnotations, setActiveAnnotations] = useState<IAnnotation[]>([]);

  const currentImage = useMemo(
    () => images.find((img) => img.id === selectedImageId) || null,
    [selectedImageId, images]
  );

  useEffect(() => {
    setActiveAnnotations(currentImage?.annotations || []);
  }, [currentImage]);

  const handleSelectImage = useCallback(
    (id: string | null) => {
      setSelectedImageId(id);
      setShowWebCam(false);
    },
    [setShowWebCam]
  );

  const handleSaveAnnotations = useCallback(() => {
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === selectedImageId
          ? { ...img, annotations: activeAnnotations }
          : img
      )
    );
    setActiveAnnotations([]);
  }, [activeAnnotations, selectedImageId, setImages]);

  const handleAnnotationChange = useCallback((annotation: IAnnotation) => {
    setActiveAnnotations((prev) => [...prev, annotation]);
  }, []);

  const handleExitAnnotationMode = useCallback(() => {
    setShowWebCam(true);
    setSelectedImageId(null);
    setSelectedObject(null);
  }, [setShowWebCam]);

  return {
    selectedObject,
    setSelectedObject,
    selectedImageId,
    activeAnnotations,
    currentImage,
    handleSelectImage,
    handleSaveAnnotations,
    handleAnnotationChange,
    handleExitAnnotationMode,
  };
}
