import { useAtomValue } from "jotai";
import { memo, type FC } from "react";
import { imagesAtom } from "../store/atom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageGalleryProps {
    handleSelectImage: (id: string | null) => void;
    selectedImageId: string | null;
}

const settings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    variableWidth: false,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
            },
        },
    ],
};

const ImageGallery: FC<ImageGalleryProps> = ({
    handleSelectImage,
    selectedImageId,
}) => {
    const images = useAtomValue(imagesAtom);

    return (
        <div className="flex gap-4 items-center w-full px-4">
            <div
                className={`w-48 h-48 flex items-center justify-center bg-purple-900 rounded-xl cursor-pointer`}
                onClick={() => handleSelectImage(null)}
            >
                <span className="text-white text-lg font-medium">Live Feed</span>
            </div>
            {images?.length > 0 ? (
                <div className="flex-1 min-w-0">
                    <Slider {...settings}>
                        {images?.map((image: IImage) => (
                            <div
                                key={image.id}
                                className={`flex-none !flex flex-col gap-2 items-center rounded-xl shadow-md p-2 !w-48 !h-48 cursor-pointer ${selectedImageId === image.id ? " bg-purple-900" : "bg-white"
                                    }`}
                                onClick={() => handleSelectImage(image.id)}
                            >
                                <div className="w-full h-[80%] rounded-xl">
                                    <img
                                        src={image.src}
                                        alt={image.name}
                                        className="w-full h-full object-cover rounded-xl"
                                    />
                                </div>
                                <span
                                    className={`text-sm w-[80%] font-medium truncate block ${image?.annotations?.[0]?.label &&
                                        selectedImageId === image.id
                                        ? "text-white"
                                        : "text-gray-900"
                                        }`}
                                >
                                    {image?.annotations?.[0]?.label || "No observation..."}
                                </span>
                            </div>
                        ))}{" "}
                    </Slider>
                </div>
            ) : (
                <span className="text-sm font-medium text-gray-600">
                    No images captured yet
                </span>
            )}
        </div>
    );
};

export default memo(ImageGallery);
