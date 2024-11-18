import { Col, Form, FormInstance } from "antd";
import { FC, useEffect } from "react";
import { ITopic } from "../../../types/topic/index.type";
import FormItemInput from "../../../components/custom/form/FormItemInput";
import FormItemTextarea from "../../../components/custom/form/FormItemTextarea";
import { commonPlaceholderInput, commonPlaceholderSelect, validateMessage } from "../../../utils";
import FormItemSelect from "../../../components/custom/form/FormItemSelect";
import UploadImage from "../../../components/upload/Image";
import IFile from "../../../types/file/index.type";

interface ITopicFormItemsProps {
    form: FormInstance
    topicData: ITopic
}

const TopicFormItems: FC<ITopicFormItemsProps> = ({ form, topicData = {} }) => {

    useEffect(() => {
        if (topicData) {
            form.setFieldsValue({
                ...topicData,
            });
        }
    }, [topicData]);

    const handleAppendImage = (image?: IFile) => {
        form.setFieldValue("topicImage", image?._id);
    }

    return (
        <>
            <FormItemInput
                colSpan={24}
                name={"topicName"}
                label={"Topic name"}
                inputProps={{
                    placeholder: commonPlaceholderInput("topic name")
                }}
                rules={[
                    { required: true, message: validateMessage("Topic name") }
                ]}
            />

            <FormItemSelect
                label={"Topic's level"}
                name={"topicLevel"}
                selectProps={{
                    options: [
                        { label: "Easy", value: "Easy" },
                        { label: "Medium", value: "Medium" },
                        { label: "Hard", value: "Hard" },
                    ],
                    placeholder: commonPlaceholderSelect("topic level")
                }}
                rules={[
                    { required: true, message: validateMessage("Topic level") }
                ]}
            />

            <Col span={24} style={{ marginBottom: 20 }}>
                <Form.Item name={"topicImage"} noStyle hidden />
                <p style={{ marginBottom: 10 }}><span style={{ color: "#ff4d4f", fontSize: 16 }}>*</span><span>Topic's image</span></p>
                <UploadImage
                    imageUpdate={topicData?.topicImage || {}}
                    isUpdate={!!topicData}
                    handleAppendImage={handleAppendImage}
                />
            </Col>

            <FormItemTextarea
                colSpan={24}
                name={"topicDescriptions"}
                label="Topic descriptions"
                inputProps={{
                    placeholder: commonPlaceholderInput("topic descriptions")
                }}
            />
        </>
    )
}

export default TopicFormItems