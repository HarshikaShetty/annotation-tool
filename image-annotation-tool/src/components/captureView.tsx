import { useAtomValue } from "jotai";
import React, { memo, type FC } from "react";
import { FaCamera } from "react-icons/fa";
import Webcam from "react-webcam";
import { showWebCamAtom } from "../store/atom";

interface ICaptureViewProps {
    onCapture: () => void;
    webcamRef: React.RefObject<Webcam | null>;
}

const CaptureView: FC<ICaptureViewProps> = ({ onCapture, webcamRef }) => {
    const showWebCam = useAtomValue(showWebCamAtom);
    if (!showWebCam) return null;
    return (
        <div className="flex items-center gap-8 w-full h-[60%] px-4">
            <div className="w-full h-full">
                <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full"
                />
            </div>
            <div className="flex gap-4">
                <button
                    className="bg-blue-500 hover:bg-blue-600 p-4 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={onCapture}
                >
                    <FaCamera size={20} fill="#fff" />
                </button>
            </div>
        </div>
    );
};

export default memo(CaptureView);
