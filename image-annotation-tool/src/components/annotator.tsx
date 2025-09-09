import { memo, useCallback, useRef, type FC } from "react";
import { FaRegSquare } from "react-icons/fa";
import { GrFormSubtract } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { ImageAnnotator, Shape, useImageAnnotator } from "react-image-label";
import { IoCloseCircleOutline } from "react-icons/io5";

import Button from "./shared/button";

interface IAnnotatorProps {
    activeImageSrc: string | null;
    selectedObject: IAnnotateObject | null;
    onAnnotationChange: (annotation: IAnnotation) => void;
    activeAnnotations: IAnnotation[];
}

const ZOOM_IN_FACTOR = 1.25;
const ZOOM_OUT_FACTOR = 0.8;

const Annotator: FC<IAnnotatorProps> = ({
    selectedObject,
    activeImageSrc,
    activeAnnotations,
    onAnnotationChange,
}) => {
    const { setHandles, annotator } = useImageAnnotator();
    const zoomLevelRef = useRef<number>(1);

    const handleAnnotateChange = useCallback(
        (newAnnotation: IAnnotation) => {
            onAnnotationChange(newAnnotation);
        },
        [onAnnotationChange]
    );

    const handleAddShape = useCallback(
        (newShape: Shape) => {
            const labeledShape: IAnnotation = {
                ...newShape,
                label: selectedObject?.name ?? "",
                categories: [selectedObject?.name ?? ""],
            };
            handleAnnotateChange(labeledShape);
        },
        [selectedObject, handleAnnotateChange]
    );

    /*Zoom-related logic (zoomIn, zoomOut, resetZoom)*/
    const resetZoom = useCallback(() => {
        if (!annotator) return;
        const resetFactor = 1 / zoomLevelRef.current;
        annotator.zoom(resetFactor);
        zoomLevelRef.current = 1;
    }, [annotator]);

    const handleZoomIn = useCallback(() => {
        if (!annotator) return;
        const newZoom = Math.min(zoomLevelRef.current * ZOOM_IN_FACTOR, 5);
        annotator.zoom(ZOOM_IN_FACTOR);
        zoomLevelRef.current = newZoom;
    }, [annotator]);

    const handleZoomOut = useCallback(() => {
        if (!annotator) return;
        const newZoom = Math.max(zoomLevelRef.current * ZOOM_OUT_FACTOR, 0.2);
        annotator.zoom(ZOOM_OUT_FACTOR);
        zoomLevelRef.current = newZoom;
    }, [annotator]);

    const handleDrawRectangle = () => annotator?.drawRectangle();

    return (
        <div className="annotate-container media-panel gap-8">
            <ImageAnnotator
                setHandles={setHandles}
                imageUrl={activeImageSrc || ""}
                shapes={activeAnnotations}
                onAdded={handleAddShape}
            />

            {/* Zoom Control buttons */}
            <div className="self-end rounded-full bg-purple-900 flex flex-col gap-2 py-2 mb-4">
                <Button onClick={handleZoomIn} className="!py-2">
                    <IoMdAdd size={25} fill="#fff" />
                </Button>
                <Button onClick={handleZoomOut} className="!py-2">
                    <GrFormSubtract size={25} fill="#fff" stroke="#fff" />
                </Button>
                <Button onClick={resetZoom} className="!py-2">
                    <IoCloseCircleOutline size={25} fill="#fff" stroke="#fff" />
                </Button>
                {selectedObject && (
                    <Button onClick={handleDrawRectangle} className="!py-2">
                        <FaRegSquare size={20} fill="#fff" />
                    </Button>
                )}
            </div>
        </div>
    );
};

export default memo(Annotator);
