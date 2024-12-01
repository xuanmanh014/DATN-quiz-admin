import { FC, useEffect } from 'react'
import { ILearnVideo } from '../../../types/learn-video/index.type'
import FormItemInput from '../../../components/custom/form/FormItemInput'
import { commonPlaceholderInput, validateMessage } from '../../../utils'
import FormItemNumber from '../../../components/custom/form/FormItemNumber'
import FormItemTextarea from '../../../components/custom/form/FormItemTextarea'
import { Button, Col, Form, FormInstance, Row } from 'antd'
import IFile from '../../../types/file/index.type'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import UploadVideo from '../../../components/upload/Video'
import SegmentFormItems from './SegmentFormItems'

interface ILearnVideoFormItemsProps {
    form: FormInstance
    learnVideoData: ILearnVideo
}

const LearnVideoFormItems: FC<ILearnVideoFormItemsProps> = ({ form, learnVideoData }) => {

    useEffect(() => {
        if (learnVideoData) {
            form.setFieldsValue({
                ...learnVideoData,
            });
        }
    }, [learnVideoData])

    const handleAppendVideo = (video?: IFile) => {
        form.setFieldValue("video", video?._id);
    }

    return (
        <>
            <FormItemInput
                colSpan={24}
                name={"name"}
                label="Name"
                inputProps={{
                    placeholder: commonPlaceholderInput("name")
                }}
                rules={[
                    { required: true, message: validateMessage("Name") }
                ]}
            />

            <FormItemTextarea
                colSpan={24}
                name={"description"}
                label="Description"
                inputProps={{
                    placeholder: commonPlaceholderInput("description")
                }}
                rules={[
                    { required: true, message: validateMessage("Description") }
                ]}
            />

            <Col span={24} style={{ marginBottom: 20 }}>
                <Form.Item
                    noStyle
                    hidden
                    name={"video"}
                >
                </Form.Item>
                <UploadVideo
                    videoUpdate={learnVideoData.video || {}}
                    isUpdate={!!learnVideoData}
                    handleAppendVideo={handleAppendVideo}
                />
            </Col>

            <p style={{ marginBottom: 10, paddingLeft: 10 }}>Video's sections</p>
            <Col span={24} className='form-list__wrapper'>
                <Form.List name={"videoSections"} initialValue={[{}]}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row gutter={12} className='form-list__wrapper-inner'>
                                    <FormItemNumber
                                        {...restField}
                                        name={[name, 'start']}
                                        colSpan={8}
                                        label="Start time"
                                        rules={[
                                            { required: true, message: validateMessage("Start time") }
                                        ]}
                                    />
                                    <FormItemNumber
                                        {...restField}
                                        name={[name, 'end']}
                                        colSpan={8}
                                        label="End time"
                                        rules={[
                                            { required: true, message: validateMessage("End time") }
                                        ]}
                                    />
                                    <Col span={24}>
                                        <SegmentFormItems formListFieldData={{ key, name, ...restField }} />
                                    </Col>

                                    {fields.length > 1 && <Col span={1}>
                                        <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 10, fontSize: 20 }} />
                                    </Col>}
                                </Row>
                            ))}
                            <Button
                                shape='circle'
                                onClick={() => add()}
                                icon={<PlusOutlined />}
                            >
                            </Button>
                        </>
                    )}
                </Form.List>
            </Col>
        </>
    )
}

export default LearnVideoFormItems