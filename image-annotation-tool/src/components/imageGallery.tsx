import { useAtomValue } from "jotai";
import { memo, type FC } from "react";
import { imagesAtom } from "../store/atom";

interface ImageGalleryProps {
    handleSelectImage: (id: string | null) => void;
    selectedImageId: string | null;
}

const ImageGallery: FC<ImageGalleryProps> = ({
    handleSelectImage,
    selectedImageId,
}) => {
    const images = useAtomValue(imagesAtom);

    if (images.length === 0) return null;

    return (
        <div className="flex gap-4 overflow-x-auto w-full px-4">
            <div
                className={`w-48 h-64 flex items-center justify-center bg-blue-500 rounded-xl`}
                onClick={() => handleSelectImage(null)}
            >
                <span className="text-white text-lg font-medium">Live Feed</span>
            </div>
            {images?.map((image: IImage) => (
                <div
                    key={image.id}
                    className={`flex-none flex flex-col gap-2 bg-white rounded-md shadow-md p-2 w-48 h-64 cursor-pointer border-4 ${selectedImageId === image.id ? " border-blue-500" : "border-white"
                        }`}
                    onClick={() => handleSelectImage(image.id)}
                >
                    <div className="w-full h-[80%]">
                        <img
                            src={image.src}
                            alt={image.name}
                            className="w-full h-full object-cover rounded"
                        />
                    </div>
                    <span>{image.name}</span>
                </div>
            ))}
        </div>
    );
};

export default memo(ImageGallery);
