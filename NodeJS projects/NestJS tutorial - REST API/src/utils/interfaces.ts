export interface MovieInterface{
    _id?: string,// optional because_id missing in Movie Schema but required in MovieInterface
    title?: string,//optional because select or populate can be used for specific fields
    genre?: string,
    year?:number,
    imgUrl?:string,
    rating?:number,
    description?:string,
    country?: string,
    language?: string
}

