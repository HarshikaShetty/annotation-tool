import { useAtomValue } from "jotai";
import React, { memo, type FC } from "react";
import { FaCamera } from "react-icons/fa";
import Webcam from "react-webcam";

import Button from "./shared/button";

import { showWebCamAtom } from "../store/atom";

interface ICaptureViewProps {
    onCapture: () => void;
    webcamRef: React.RefObject<Webcam | null>;
}

const CaptureView: FC<ICaptureViewProps> = ({ onCapture, webcamRef }) => {
    const showWebCam = useAtomValue(showWebCamAtom);
    if (!showWebCam) return null;
    return (
        <div className="media-panel gap-2">
            <div className="w-full h-full">
                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full"
                />
            </div>
            <div className="flex gap-4">
                <Button
                    className="bg-purple-700 hover:bg-purple-600 p-8 rounded-full flex items-center justify-center"
                    onClick={onCapture}
                >
                    <FaCamera size={30} fill="#fff" />
                </Button>
            </div>
        </div>
    );
};

export default memo(CaptureView);
