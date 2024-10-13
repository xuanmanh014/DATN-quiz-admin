import { Button } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import "./styles.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppContext } from "../../contexts/app";
import IFile from "../../types/file/index.type";
import { UploadApis } from "../../apis/upload/index.api";

interface UploadImageProps {
    imageUpdate: IFile,
    isUpdate?: boolean,
    handleAppendImage?: (image?: IFile) => void,
    handleRemoveImage?: (imageId?: string) => void,
}

const UploadImage: FC<UploadImageProps> = ({
    imageUpdate,
    isUpdate = false,
    handleAppendImage = (_: IFile) => { },
    handleRemoveImage = (_?: string) => { },
}) => {
    const [image, setImage] = useState<IFile | null>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const { openNotiError } = useAppContext();

    useEffect(() => {
        if (isUpdate && imageUpdate) {
            setImage(imageUpdate);
        }
    }, [isUpdate, imageUpdate])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);

            UploadApis.uploadFile(formData)
                .then((response) => {
                    setImage(response?.data);
                    handleAppendImage(response?.data);
                })
                .catch((error) => {
                    const { response } = error;
                    openNotiError("Upload image", response?.data?.message);
                });
        }
    };

    const handleDeleteFile = (imageId?: string) => {
        UploadApis.deleteFile(imageId).then(() => {
            setImage(null);
            handleRemoveImage(imageId);
        }).catch((error) => {
            const { response } = error;
            openNotiError("Delete image", response?.data?.message);
        })
    }

    return image?.filePath ? (
        <div className="upload_preview w-full h-[200px]">
            <img
                src={image?.filePath}
                alt="File"
                className="w-full h-full rounded-lg"
            />

            <div className="upload__actions flex items-center justify-center gap-4">
                <AiOutlineDelete
                    className="text-[30px]"
                    onClick={() => handleDeleteFile(image?._id)}
                />
            </div>
        </div>
    ) : (
        <div className="upload__area rounded-lg p-4 flex items-center justify-center flex-col gap-3 w-full h-[200px]">
            <input
                type="file"
                style={{ display: "none" }}
                ref={imageInputRef}
                onChange={handleFileSelect}
            />
            <BsUpload className="text-[30px]" />
            <Button
                type="primary"
                onClick={() => imageInputRef.current?.click()}
            >
                Tải ảnh
            </Button>
        </div>
    );
};

export default UploadImage;