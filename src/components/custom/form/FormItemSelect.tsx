import { Col, Form, FormItemProps, InputNumber, Select, SelectProps } from 'antd'
import { FC } from 'react'

interface IFormItemSelectProps extends FormItemProps {
    selectProps?: SelectProps,
    colSpan?: number
}

const FormItemSelect: FC<IFormItemSelectProps> = ({ selectProps, colSpan = 24, ...rest }) => {
    return (
        <Col span={colSpan}>
            <Form.Item {...rest}>
                <Select
                    {...selectProps}
                    style={{
                        ...selectProps?.style,
                        width: "100%"
                    }}
                    size='large'
                    allowClear
                />
            </Form.Item>
        </Col>
    )
}

export default FormItemSelect