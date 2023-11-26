export type TApiMetaInfo = 
{
    version: string
    type: 'object' | 'list' | 'none'
    count: number
}

export type TApiResponse<T> = 
{
    results?: T[] | T
    info: TApiMetaInfo
}