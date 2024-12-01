import { Button, Col, Form, FormInstance, FormListFieldData, Row } from 'antd'
import FormItemNumber from '../../../components/custom/form/FormItemNumber'
import { validateMessage } from '../../../utils'
import FormItemInput from '../../../components/custom/form/FormItemInput'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { FC } from 'react'

interface ISegmentFormItemsProps {
    form: FormInstance
    formListFieldData: FormListFieldData
    sectionStartTime: number
}

const SegmentFormItems: FC<ISegmentFormItemsProps> = ({ form, formListFieldData, sectionStartTime }) => {
    const segmentEndTimes = Form.useWatch(['videoSections', formListFieldData.name, 'segments'], form);
    const isAddButtonDisabled = segmentEndTimes?.[segmentEndTimes.length - 1]?.end === undefined;

    return (
        <>
            <p style={{ marginBottom: 10, paddingLeft: 10 }}>Segments</p>
            <Col span={24} className='form-list__wrapper'>
                <Form.List {...formListFieldData} name={[formListFieldData.name, 'segments']} initialValue={[{}]}>
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                {fields.map(({ key, name, ...restField }) => {
                                    const prevSegmentEndTime = name > 0 ? form.getFieldValue(['videoSections', formListFieldData.name, 'segments', name - 1, 'end']) : sectionStartTime;

                                    return (
                                        <Row gutter={12} className="form-list__wrapper-inner" key={key}>
                                            <FormItemNumber
                                                {...restField}
                                                name={[name, 'start']}
                                                colSpan={8}
                                                label="Start time"
                                                initialValue={prevSegmentEndTime}
                                                inputProps={{
                                                    disabled: true
                                                }}
                                            />

                                            <FormItemNumber
                                                {...restField}
                                                name={[name, 'end']}
                                                colSpan={8}
                                                label="End time"
                                                rules={[
                                                    { required: true, message: validateMessage('End time') },
                                                    {
                                                        validator(_, value) {
                                                            const startTime = form.getFieldValue(['videoSections', formListFieldData.name, 'segments', name, 'start']);
                                                            if (value <= startTime) {
                                                                return Promise.reject(new Error('End time must be greater than start time.'));
                                                            }
                                                            return Promise.resolve();
                                                        },
                                                    },
                                                ]}
                                            />

                                            <FormItemInput
                                                {...restField}
                                                name={[name, 'text']}
                                                colSpan={8}
                                                label="Text"
                                                rules={[{ required: true, message: validateMessage("Text") }]}
                                            />

                                            {fields.length > 1 && (
                                                <Col span={1}>
                                                    <MinusCircleOutlined
                                                        onClick={() => remove(name)}
                                                        style={{ marginTop: 10, fontSize: 20 }}
                                                    />
                                                </Col>
                                            )}
                                        </Row>
                                    );
                                })}

                                <Button
                                    shape="circle"
                                    onClick={() => add()}
                                    icon={<PlusOutlined />}
                                    disabled={isAddButtonDisabled}
                                />
                            </>
                        )
                    }}
                </Form.List>
            </Col>
        </>
    )
}

export default SegmentFormItems