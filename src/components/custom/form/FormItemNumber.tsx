import { Col, Form, FormItemProps, InputNumber, InputNumberProps } from 'antd'
import { FC } from 'react'

interface IFormItemNumberProps extends FormItemProps {
    inputProps?: InputNumberProps,
    colSpan?: number
}

const FormItemNumber: FC<IFormItemNumberProps> = ({ inputProps, colSpan = 24, ...rest }) => {
    return (
        <Col span={colSpan}>
            <Form.Item {...rest}>
                <InputNumber
                    {...inputProps}
                    style={{
                        ...inputProps?.style,
                        width: "100%"
                    }}
                    size='large'
                    min={0}
                />
            </Form.Item>
        </Col>
    )
}

export default FormItemNumber