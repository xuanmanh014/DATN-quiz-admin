import { Button, Col, Form, FormListFieldData, Row } from 'antd'
import FormItemNumber from '../../../components/custom/form/FormItemNumber'
import { validateMessage } from '../../../utils'
import FormItemInput from '../../../components/custom/form/FormItemInput'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { FC } from 'react'

interface ISegmentFormItemsProps {
    formListFieldData: FormListFieldData
}

const SegmentFormItems: FC<ISegmentFormItemsProps> = ({ formListFieldData }) => {
    return (
        <>
            <p style={{ marginBottom: 10, paddingLeft: 10 }}>Segments</p>
            <Col span={24} className='form-list__wrapper'>
                <Form.List {...formListFieldData} name={[formListFieldData.name, "segments"]} initialValue={[{}]} >
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
                                    <FormItemInput
                                        {...restField}
                                        name={[name, 'text']}
                                        colSpan={8}
                                        label="Text"
                                        rules={[
                                            { required: true, message: validateMessage("Text") }
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

export default SegmentFormItems