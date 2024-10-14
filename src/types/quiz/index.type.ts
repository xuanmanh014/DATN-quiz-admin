import IFile from "../file/index.type"

export interface IQuiz {
    _id?: string
    quizName?: string
    quizScore?: number
    quizRecord?: IFile
    quizAnswer?: string
    quizType?: string
}