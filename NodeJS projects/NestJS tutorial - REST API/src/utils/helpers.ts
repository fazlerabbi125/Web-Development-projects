interface commonResponse{
    success:boolean,
    message:string,
    results?:any,
    errors?:any
}


export function successResponse(message:string, data:any = null):commonResponse {
        return {
            success: true,
            message: message,
            results: data
        }
    }

export function failureResponse(message:string, error:any = {}):commonResponse {
        return {
            success: false,
            message: message,
            errors: error
        }
    }

export function getPagination(page:number,itemPerPage:number):{skip:number,limit:number}{
    return {skip: (page-1)*itemPerPage, limit: itemPerPage}
}
    
