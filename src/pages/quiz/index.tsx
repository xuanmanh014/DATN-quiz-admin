import { Table } from "antd"
import { quizColumns } from "./columns"
import { useFetch } from "../../hooks/useFetch"
import { QuizApis } from "../../apis/quiz/index.api"
import { IQuiz } from "../../types/quiz/index.type"

const QuizPage = () => {
    const { data: quizs } = useFetch<IQuiz[]>(QuizApis.getAll);

    return (
        <div>
            <Table
                dataSource={quizs}
                columns={quizColumns}
            />
        </div>
    )
}

export default QuizPage