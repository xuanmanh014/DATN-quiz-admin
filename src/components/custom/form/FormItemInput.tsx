import { Col, Form, FormItemProps, Input, InputProps } from 'antd'
import { FC } from 'react'

interface IFormItemInputProps extends FormItemProps {
    inputProps?: InputProps,
    colSpan?: number
}

const FormItemInput: FC<IFormItemInputProps> = ({ inputProps, colSpan = 24, ...rest }) => {
    return (
        <Col span={colSpan}>
            <Form.Item {...rest}>
                <Input
                    {...inputProps}
                    allowClear
                    size='large'
                />
            </Form.Item>
        </Col>
    )
}

export default FormItemInput