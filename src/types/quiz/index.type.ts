import IFile from "../file/index.type"
import { ITopic } from "../topic/index.type"

export interface ISegment {
    startTime: number
    endTime: number
    answer: string
}

export interface IQuiz {
    _id?: string
    quizName?: string
    quizScore?: number
    quizRecord?: IFile
    quizAnswer?: string
    quizType?: string
    quizTopic?: ITopic
    isSegmented?: boolean
    segments?: ISegment[]
}