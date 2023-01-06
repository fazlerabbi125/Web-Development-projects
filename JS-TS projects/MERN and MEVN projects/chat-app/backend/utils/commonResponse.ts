const success = (message: string, data: any = null) => {
    return {
        success: true,
        message: message,
        results: data
    }
}


const failure = (message: string, error: Record<string, any> = {}) => {
    return {
        success: false,
        message: message,
        errors: error
    }
}

export { success, failure }