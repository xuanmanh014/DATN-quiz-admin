import { Col, Form, FormItemProps, Input } from 'antd'
import { TextAreaProps } from 'antd/es/input'
import { FC } from 'react'

interface IFormItemTextareaProps extends FormItemProps {
    inputProps?: TextAreaProps,
    colSpan?: number
}

const FormItemTextarea: FC<IFormItemTextareaProps> = ({ inputProps, colSpan = 24, ...rest }) => {
    return (
        <Col span={colSpan}>
            <Form.Item {...rest}>
                <Input.TextArea
                    {...inputProps}
                    style={{
                        ...inputProps?.style,
                        width: "100%"
                    }}
                    size='large'
                    autoSize={{
                        minRows: 4,
                        maxRows: 6,
                    }}
                />
            </Form.Item>
        </Col>
    )
}

export default FormItemTextarea