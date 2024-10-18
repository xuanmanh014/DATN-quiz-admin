import IFile from "../file/index.type"
import { ITopic } from "../topic/index.type"

export interface IQuiz {
    _id?: string
    quizName?: string
    quizScore?: number
    quizRecord?: IFile
    quizAnswer?: string
    quizType?: string
    quizTopic?: ITopic
}