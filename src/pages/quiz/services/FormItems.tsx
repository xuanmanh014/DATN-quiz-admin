import { FC, useEffect, useState } from 'react'
import { IQuiz } from '../../../types/quiz/index.type'
import FormItemInput from '../../../components/custom/form/FormItemInput'
import FormItemSelect from '../../../components/custom/form/FormItemSelect'
import { commonPlaceholderInput, commonPlaceholderSelect, validateMessage } from '../../../utils'
import FormItemNumber from '../../../components/custom/form/FormItemNumber'
import FormItemTextarea from '../../../components/custom/form/FormItemTextarea'
import UploadRecord from '../../../components/upload/Record'
import { Col, Form, FormInstance } from 'antd'
import IFile from '../../../types/file/index.type'

interface IQuizFormItemsProps {
    form: FormInstance
    quizData: IQuiz
}

const QuizFormItems: FC<IQuizFormItemsProps> = ({ form, quizData }) => {
    const [quizType, setQuizType] = useState("listen");

    useEffect(() => {
        if (quizData) {
            form.setFieldsValue(quizData);
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
        </>
    )
}

export default QuizFormItems