import { Button, Drawer, Flex, Form, Input, Modal, Row, Table } from "antd"
import { learnVideoColumns } from "./columns"
import { useFetch } from "../../hooks/useFetch"
import { LearnVideoApis } from "../../apis/learn-video/index.api"
import { ILearnVideo } from "../../types/learn-video/index.type"
import { useState } from "react"
import { useAppContext } from "../../contexts/app"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import LearnVideoFormItems from "./services/FormItems"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDebounceCallback } from "usehooks-ts"
import { CiSearch } from "react-icons/ci"

const LearnVideoPage = () => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const { openNotiError, openNotiSuccess, setLoading } = useAppContext();
    const [modal, contextHolder] = Modal.useModal();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const navigate = useNavigate();
    const { data: learnVideos, refetchData } = useFetch<ILearnVideo[]>(LearnVideoApis.getAll, { search });
    const [learnVideoData, setLearnVideoData] = useState<ILearnVideo | undefined>();

    const handleOpenForm = (learnVideo?: ILearnVideo) => {
        setOpen(true);
        if (learnVideo) setLearnVideoData(learnVideo);
    }

    const handleCloseForm = () => {
        setOpen(false);
        setLearnVideoData(undefined);
        form.resetFields();
    }

    const handleConfirmDelete = (id?: string) => {
        modal.confirm({
            title: 'Delete quiz',
            content: <>
                <p>
                    Are you sure you want to delete quiz
                    <span className="font-bold"> {learnVideoData?.name} </span>?
                </p>
            </>,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            cancelText: 'Cancel',
            onOk: () => {
                setLoading(true);
                LearnVideoApis.remove(id).then(() => {
                    refetchData();
                    openNotiSuccess("Delete learn video");
                }).catch((error) => {
                    const { response } = error;
                    openNotiError("Delete learn video", response?.data?.message);
                }).finally(() => {
                    setLearnVideoData(undefined);
                    setLoading(false);
                });
            }
        });
    }

    const mapData = (data?: ILearnVideo[]) => {
        if (!data) return [];

        return data.map(item => ({
            ...item,
            key: item._id,
            actions: <Flex gap={12}>
                <p className="btn__update" onClick={() => handleOpenForm(item)}>Update</p>
                <p className="btn__delete" onClick={() => handleConfirmDelete(item._id)}>Delete</p>
            </Flex>
        }));
    }

    const onFinish = (values: ILearnVideo) => {
        console.log(values);

        if (!values.video) {
            openNotiError(learnVideoData?._id ? "Update learn video" : "Create learn video", "Please upload a video!");
            return;
        }

        setLoading(true);
        if (!learnVideoData?._id) {
            LearnVideoApis.create(values).then(() => {
                openNotiSuccess("Create learn video");
                handleCloseForm();
                refetchData();
            }).catch((error) => {
                const { response } = error;
                openNotiError("Create learn video", response?.data?.message);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            LearnVideoApis.update(learnVideoData?._id, values).then(() => {
                openNotiSuccess("Update learn video");
                handleCloseForm();
                refetchData();
            }).catch((error) => {
                const { response } = error;
                openNotiError("Update learn video", response?.data?.message);
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
                <Button type="primary" onClick={() => handleOpenForm()}>Create learn video</Button>

                <Input
                    placeholder="Search video by name"
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
                dataSource={mapData(learnVideos)}
                columns={learnVideoColumns}
                pagination={{
                    defaultCurrent: 1,
                    pageSize: 10,
                    defaultPageSize: 10
                }}
            />

            <Drawer
                open={open}
                title={learnVideoData?._id ? "Update learn video" : "Create learn video"}
                destroyOnClose
                onClose={handleCloseForm}
                width={700}
                extra={
                    <Flex gap={12}>
                        <Button type="primary" onClick={() => form.submit()}>Save</Button>
                        <Button onClick={handleCloseForm}>Cancel</Button>
                    </Flex>
                }
            >
                <Form form={form} onFinish={onFinish} layout="vertical">
                    <Row gutter={12}>
                        <LearnVideoFormItems
                            form={form}
                            learnVideoData={learnVideoData || {} as ILearnVideo}
                        />
                    </Row>
                </Form>
            </Drawer>

            {contextHolder}
        </div>
    )
}

export default LearnVideoPage