import { FC, useEffect, useState } from 'react'
import { IQuiz } from '../../../types/quiz/index.type'
import FormItemInput from '../../../components/custom/form/FormItemInput'
import FormItemSelect from '../../../components/custom/form/FormItemSelect'
import { commonPlaceholderInput, commonPlaceholderSelect, validateMessage } from '../../../utils'
import FormItemNumber from '../../../components/custom/form/FormItemNumber'
import FormItemTextarea from '../../../components/custom/form/FormItemTextarea'
import UploadRecord from '../../../components/upload/Record'
import { Button, Col, Form, FormInstance, Row } from 'antd'
import IFile from '../../../types/file/index.type'
import { useFetch } from '../../../hooks/useFetch'
import { ITopic } from '../../../types/topic/index.type'
import { TopicApis } from '../../../apis/topic/index.api'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

interface IQuizFormItemsProps {
    form: FormInstance
    quizData: IQuiz
}

const QuizFormItems: FC<IQuizFormItemsProps> = ({ form, quizData }) => {
    const [quizType, setQuizType] = useState(quizData.quizType || "listen");
    const { data: topics } = useFetch<ITopic[]>(TopicApis.getAll);

    useEffect(() => {
        if (quizData) {
            form.setFieldsValue({
                ...quizData,
                quizTopic: quizData.quizTopic?._id,
                segments: quizData.segments
            });
        }
    }, [quizData])

    const handleAppendRecord = (record?: IFile) => {
        form.setFieldValue("quizRecord", record?._id);
    }

    const renderQuizType = (quizType?: string) => {
        switch (quizType) {
            case "listen":
                return (
                    <Col span={24} style={{ marginBottom: 20 }}>
                        <Form.Item
                            noStyle
                            hidden
                            name={"quizRecord"}
                        >
                        </Form.Item>
                        <UploadRecord
                            recordUpdate={quizData.quizRecord || {}}
                            isUpdate={!!quizData}
                            handleAppendRecord={handleAppendRecord}
                        />
                    </Col>
                )
            default:
                break;
        }
    }

    return (
        <>
            <FormItemInput
                colSpan={12}
                name={"quizName"}
                label="Quiz name"
                inputProps={{
                    placeholder: commonPlaceholderInput("quiz name")
                }}
                rules={[
                    { required: true, message: validateMessage("Quiz name") }
                ]}
            />

            <FormItemNumber
                colSpan={12}
                name={"quizScore"}
                label="Quiz score"
                inputProps={{
                    placeholder: commonPlaceholderInput("quiz score")
                }}
                rules={[
                    { required: true, message: validateMessage("Quiz score") }
                ]}
            />

            <FormItemSelect
                colSpan={12}
                name={"quizTopic"}
                label="Quiz topic"
                selectProps={{
                    options: topics?.map(topic => ({ value: topic._id, label: topic.topicName })),
                    placeholder: commonPlaceholderSelect("Quiz topic"),
                }}
                rules={[
                    { required: true, message: validateMessage("quiz topic") }
                ]}
            />

            <FormItemSelect
                colSpan={12}
                name={"quizType"}
                label="Quiz type"
                selectProps={{
                    options: [
                        { value: "listen", label: "Listen" },
                        { value: "write", label: "Write" },
                    ],
                    placeholder: commonPlaceholderSelect("Quiz type"),
                    onChange: (value) => setQuizType(value)
                }}
                rules={[
                    { required: true, message: validateMessage("quiz type") }
                ]}
            />

            {renderQuizType(quizType)}

            <FormItemTextarea
                colSpan={24}
                name={"quizAnswer"}
                label="Quiz answer"
                inputProps={{
                    placeholder: commonPlaceholderInput("quiz answer")
                }}
                rules={[
                    { required: true, message: validateMessage("Quiz answer") }
                ]}
            />

            <p style={{ marginBottom: 10, paddingLeft: 10 }}>Segments</p>
            <Col span={24} className='form-list__wrapper'>
                <Form.List name={"segments"} initialValue={[{}]}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Row gutter={12} className='form-list__wrapper-inner'>
                                    <FormItemNumber
                                        {...restField}
                                        name={[name, 'startTime']}
                                        colSpan={8}
                                        label="Start time"
                                        rules={[
                                            { required: true, message: validateMessage("Start time") }
                                        ]}
                                    />
                                    <FormItemNumber
                                        {...restField}
                                        name={[name, 'endTime']}
                                        colSpan={8}
                                        label="End time"
                                        rules={[
                                            { required: true, message: validateMessage("End time") }
                                        ]}
                                    />
                                    <FormItemInput
                                        {...restField}
                                        name={[name, 'answer']}
                                        colSpan={8}
                                        label="Answer"
                                        rules={[
                                            { required: true, message: validateMessage("Answer") }
                                        ]}
                                    />

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

export default QuizFormItems