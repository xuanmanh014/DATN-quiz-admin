import { Button, Flex, Form, Input, Modal, Row, Table } from "antd"
import { topicColumns } from "./columns"
import { useFetch } from "../../hooks/useFetch"
import { ITopic } from "../../types/topic/index.type"
import { useState } from "react"
import { useAppContext } from "../../contexts/app"
import { CiSearch } from "react-icons/ci";
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { commonPlaceholderInput, validateMessage } from "../../utils"
import FormItemInput from "../../components/custom/form/FormItemInput"
import { TopicApis } from "../../apis/topic/index.api"
import FormItemTextarea from "../../components/custom/form/FormItemTextarea"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useDebounceCallback } from "usehooks-ts"

const TopicPage = () => {
    const [open, setOpen] = useState(false);
    const [topicData, setTopicData] = useState<ITopic>({});
    const [form] = Form.useForm();
    const { openNotiError, openNotiSuccess, setLoading } = useAppContext();
    const [modal, contextHolder] = Modal.useModal();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { data: topics, refetchData } = useFetch<ITopic[]>(TopicApis.getAll, { search });

    const handleOpenForm = (topic?: ITopic) => {
        setOpen(true);
        if (topic) {
            setTopicData(topic);
            form.setFieldsValue(topic);
        }
    }

    const handleCloseForm = () => {
        setOpen(false);
        setTopicData({});
        form.resetFields();
    }

    const handleConfirmDelete = (id?: string) => {
        modal.confirm({
            title: 'Delete topic',
            content: <>
                <p>
                    Are you sure you want to delete topic
                    <span className="font-bold"> {topicData?.topicName} </span>?
                </p>
            </>,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            cancelText: 'Cancel',
            onOk: () => {
                setLoading(true);
                TopicApis.remove(id).then(() => {
                    refetchData();
                    openNotiSuccess("Delete topic");
                }).catch((error) => {
                    const { response } = error;
                    openNotiError("Delete topic", response?.data?.message);
                }).finally(() => {
                    setTopicData({});
                    setLoading(false);
                });
            }
        });
    }

    const mapData = (data?: ITopic[]) => {
        if (!data) return [];

        return data.map(item => ({
            ...item,
            key: item._id,
            actions: <Flex gap={12}>
                <p className="btn__update" onClick={() => handleOpenForm(item)}>Update</p>
                <p className="btn__delete" onClick={() => handleConfirmDelete(item._id)}>Delete</p>
            </Flex>
        }))
    }

    const onFinish = (values: ITopic) => {
        setLoading(true);
        if (!topicData._id) {
            TopicApis.create(values).then(() => {
                openNotiSuccess("Create topic");
                handleCloseForm();
                refetchData();
            }).catch((error) => {
                const { response } = error;
                openNotiError("Create topic", response?.data?.message);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            TopicApis.update(topicData._id, values).then(() => {
                openNotiSuccess("Update topic");
                handleCloseForm();
                refetchData();
            }).catch((error) => {
                const { response } = error;
                openNotiError("Update topic", response?.data?.message);
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value) {
            searchParams.set("search", value);
        } else {
            searchParams.delete("search");
        }
        navigate(searchParams.toString());
    }

    const debounced = useDebounceCallback(onSearchChange, 500);

    return (
        <div>
            <Flex justify="space-between" style={{ marginBottom: 20 }}>
                <Button type="primary" onClick={() => handleOpenForm()}>Create topic</Button>

                <Input
                    placeholder="Search topic by name"
                    style={{
                        width: 300
                    }}
                    defaultValue={search}
                    onChange={(event) => debounced(event)}
                    allowClear
                    suffix={<CiSearch />}
                />
            </Flex>

            <Table
                dataSource={mapData(topics)}
                columns={topicColumns}
            />

            <Modal
                open={open}
                title={topicData._id ? "Update topic" : "Create topic"}
                destroyOnClose
                onCancel={handleCloseForm}
                width={500}
                footer={null}
                styles={{
                    body: {
                        paddingTop: 20
                    }
                }}
            >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Row gutter={12}>
                        <FormItemInput
                            colSpan={24}
                            name={"topicName"}
                            label={"Topic name"}
                            inputProps={{
                                placeholder: commonPlaceholderInput("topic name")
                            }}
                            rules={[
                                { required: true, message: validateMessage("Topic name") }
                            ]}
                        />

                        <FormItemTextarea
                            colSpan={24}
                            name={"topicDescriptions"}
                            label="Topic descriptions"
                            inputProps={{
                                placeholder: commonPlaceholderInput("topic descriptions")
                            }}
                        />
                    </Row>
                    <Flex gap={12}>
                        <Button style={{ height: 40 }} block type="primary" htmlType="submit">Save</Button>
                        <Button style={{ height: 40 }} block onClick={handleCloseForm}>Cancel</Button>
                    </Flex>
                </Form>
            </Modal>

            {contextHolder}
        </div>
    )
}

export default TopicPage