import { memo, type FC } from "react";
import Button from "./shared/button";
import { OBJECT_LIST } from "../constants";

interface IObjectPanelProps {
    selectedObject: IAnnotateObject | null;
    handleSelectObject: (obj: IAnnotateObject | null) => void;
    onSaveAnnotations: () => void;
    onCancel: () => void;
}

const ObjectPanel: FC<IObjectPanelProps> = ({
    selectedObject,
    handleSelectObject,
    onSaveAnnotations,
    onCancel
}) => {

    return (
        <div className="w-[20%] h-full bg-white rounded-2xl p-8 flex flex-col gap-2">
            <h3 className="font-medium text-gray-600 text-start">Annotate</h3>
            <hr className="text-gray-200" />
            <ul className="flex flex-col flex-1 pt-4 gap-4 items-start">
                {OBJECT_LIST.map((obj) => (
                    <li
                        key={obj.id}
                        className={`cursor-pointer text-sm text-gray-700 hover:text-purple-900 ${selectedObject?.id === obj.id
                            ? "text-purple-950 font-bold"
                            : "font-medium"
                            }`}
                        onClick={() => handleSelectObject(obj)}
                    >
                        {obj.name}
                    </li>
                ))}
            </ul>
            <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                    <Button
                        className="btn-base bg-red-600"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSaveAnnotations}
                        className="btn-base bg-purple-900"
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default memo(ObjectPanel);
