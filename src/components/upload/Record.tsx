import { Button } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import "./styles.scss";
import { AiOutlineDelete } from "react-icons/ai";
import { useAppContext } from "../../contexts/app";
import IFile from "../../types/file/index.type";
import { UploadApis } from "../../apis/upload/index.api";

interface UploadRecordProps {
    recordUpdate: IFile,
    isUpdate?: boolean,
    handleAppendRecord?: (record?: IFile) => void,
    handleRemoveRecord?: (recordId?: string) => void,
}

const UploadRecord: FC<UploadRecordProps> = ({
    recordUpdate,
    isUpdate = false,
    handleAppendRecord = (_: IFile) => { },
    handleRemoveRecord = (_?: string) => { },
}) => {
    const [record, setRecord] = useState<IFile | null>(null);
    const recordInputRef = useRef<HTMLInputElement>(null);
    const { openNotiError } = useAppContext();

    useEffect(() => {
        if (isUpdate && recordUpdate) {
            setRecord(recordUpdate);
        }
    }, [isUpdate, recordUpdate])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);

            UploadApis.uploadFile(formData)
                .then((response) => {
                    setRecord(response?.data);
                    handleAppendRecord && handleAppendRecord(response?.data);
                })
                .catch((error) => {
                    const { response } = error;
                    openNotiError("Upload record", response?.data?.message);
                });
        }
    };

    const handleDeleteFile = (recordId?: string) => {
        UploadApis.deleteFile(recordId).then(() => {
            setRecord(null);
            handleRemoveRecord && handleRemoveRecord(recordId);
        }).catch((error) => {
            const { response } = error;
            openNotiError("Delete record", response?.data?.message);
        })
    }

    return record?.filePath ? (
        <div className="upload_preview">
            <AiOutlineDelete
                className="text-[20px]"
                onClick={() => handleDeleteFile(record?._id)}
            />

            <audio
                src={record?.filePath}
                controls
            />
        </div>
    ) : (
        <div className="upload__area">
            <input
                type="file"
                style={{ display: "none" }}
                ref={recordInputRef}
                onChange={handleFileSelect}
                accept="audio/*"
            />
            <BsUpload style={{ fontSize: 30, marginBottom: 20 }} />
            <Button
                type="primary"
                onClick={() => recordInputRef.current?.click()}
            >
                Upload record
            </Button>
        </div>
    );
};

export default UploadRecord;