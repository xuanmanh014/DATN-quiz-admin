import { Col, Form, FormItemProps, Input } from 'antd'
import { PasswordProps } from 'antd/es/input'
import { FC } from 'react'

interface IFormItemPasswordProps extends FormItemProps {
    inputProps?: PasswordProps,
    colSpan?: number
}

const FormItemPassword: FC<IFormItemPasswordProps> = ({ inputProps, colSpan = 24, ...rest }) => {
    return (
        <Col span={colSpan}>
            <Form.Item {...rest}>
                <Input.Password
                    {...inputProps}
                    allowClear
                    size='large'
                />
            </Form.Item>
        </Col>
    )
}

export default FormItemPassword