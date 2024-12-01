import { Button } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import "./styles.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppContext } from "../../contexts/app";
import IFile from "../../types/file/index.type";
import { UploadApis } from "../../apis/upload/index.api";

interface UploadVideoProps {
    videoUpdate: IFile,
    isUpdate?: boolean,
    handleAppendVideo?: (video?: IFile) => void,
    handleRemoveVideo?: (videoId?: string) => void,
}

const UploadVideo: FC<UploadVideoProps> = ({
    videoUpdate,
    isUpdate = false,
    handleAppendVideo = (_: IFile) => { },
    handleRemoveVideo = (_?: string) => { },
}) => {
    const [video, setVideo] = useState<IFile | null>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const { openNotiError } = useAppContext();

    useEffect(() => {
        if (isUpdate && videoUpdate) {
            setVideo(videoUpdate);
        }
    }, [isUpdate, videoUpdate])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);

            UploadApis.uploadFile(formData)
                .then((response) => {
                    setVideo(response?.data);
                    handleAppendVideo(response?.data);
                })
                .catch((error) => {
                    const { response } = error;
                    openNotiError("Upload video", response?.data?.message);
                });
        }
    };

    const handleDeleteFile = (videoId?: string) => {
        UploadApis.deleteFile(videoId).then(() => {
            setVideo(null);
            handleRemoveVideo(videoId);
        }).catch((error) => {
            const { response } = error;
            openNotiError("Delete video", response?.data?.message);
        })
    }

    return video?.filePath ? (
        <div className="upload_preview w-full overflow-hidden">
            <AiOutlineDelete
                className="text-[20px]"
                onClick={() => handleDeleteFile(video?._id)}
            />

            <video
                controls
                className="w-full h-[200px] object-cover rounded-lg"
            >
                <source
                    src={video?.filePath}
                    type="video/mp4"
                />
                Your browser does not support the video tag.
            </video>
        </div>
    ) : (
        <div className="upload__area rounded-lg p-4 flex items-center justify-center flex-col gap-3 w-full h-[200px]">
            <input
                type="file"
                style={{ display: "none" }}
                ref={videoInputRef}
                onChange={handleFileSelect}
                accept=".mp4"
            />
            <BsUpload className="text-[30px]" />
            <Button
                type="primary"
                onClick={() => videoInputRef.current?.click()}
            >
                Upload video
            </Button>
        </div>
    );
};

export default UploadVideo;