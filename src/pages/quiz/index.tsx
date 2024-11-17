import { Button, Drawer, Flex, Form, Input, Modal, Row, Table } from "antd"
import { quizColumns } from "./columns"
import { useFetch } from "../../hooks/useFetch"
import { QuizApis } from "../../apis/quiz/index.api"
import { IQuiz } from "../../types/quiz/index.type"
import { useState } from "react"
import QuizFormItems from "./services/FormItems"
import { useAppContext } from "../../contexts/app"
import { CiSearch } from "react-icons/ci";
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useDebounceCallback } from "usehooks-ts"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

const QuizPage = () => {
    const [open, setOpen] = useState(false);
    const [quizData, setQuizData] = useState<IQuiz>({});
    const [form] = Form.useForm();
    const { openNotiError, openNotiSuccess, setLoading } = useAppContext();
    const [modal, contextHolder] = Modal.useModal();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { data: quizs, refetchData } = useFetch<IQuiz[]>(QuizApis.getAll, { search });

    const handleOpenForm = (quiz?: IQuiz) => {
        setOpen(true);
        if (quiz) setQuizData(quiz);
    }

    const handleCloseForm = () => {
        setOpen(false);
        setQuizData({});
        form.resetFields();
    }

    const handleConfirmDelete = (id?: string) => {
        modal.confirm({
            title: 'Delete quiz',
            content: <>
                <p>
                    Are you sure you want to delete quiz
                    <span className="font-bold"> {quizData?.quizName} </span>?
                </p>
            </>,
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            cancelText: 'Cancel',
            onOk: () => {
                setLoading(true);
                QuizApis.remove(id).then(() => {
                    refetchData();
                    openNotiSuccess("Delete quiz");
                }).catch((error) => {
                    const { response } = error;
                    openNotiError("Delete quiz", response?.data?.message);
                }).finally(() => {
                    setQuizData({});
                    setLoading(false);
                });
            }
        });
    }

    const mapData = (data?: IQuiz[]) => {
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

    const onFinish = (values: IQuiz) => {
        if (values.quizType === "listen" && !values.quizRecord) {
            openNotiError(quizData._id ? "Update quiz" : "Create quiz", "Please upload a record!");
            return;
        }

        setLoading(true);
        if (!quizData._id) {
            QuizApis.create(values).then(() => {
                openNotiSuccess("Create quiz");
                handleCloseForm();
                refetchData();
            }).catch((error) => {
                const { response } = error;
                openNotiError("Create quiz", response?.data?.message);
            }).finally(() => {
                setLoading(false);
            });
        } else {
            QuizApis.update(quizData._id, values).then(() => {
                openNotiSuccess("Update quiz");
                handleCloseForm();
                refetchData();
            }).catch((error) => {
                const { response } = error;
                openNotiError("Update quiz", response?.data?.message);
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
                <Button type="primary" onClick={() => handleOpenForm()}>Create quiz</Button>

                <Input
                    placeholder="Search quiz by name"
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
                dataSource={mapData(quizs)}
                columns={quizColumns}
            />

            <Drawer
                open={open}
                title={quizData._id ? "Update quiz" : "Create quiz"}
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
                        <QuizFormItems
                            form={form}
                            quizData={quizData}
                        />
                    </Row>
                </Form>
            </Drawer>

            {contextHolder}
        </div>
    )
}

export default QuizPage