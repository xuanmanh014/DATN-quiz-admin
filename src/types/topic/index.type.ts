import IFile from "../file/index.type"

export interface ITopic {
    _id?: string
    topicName?: string
    topicLevel?: string
    topicImage?: IFile
}