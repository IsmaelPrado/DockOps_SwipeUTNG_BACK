function apiResponse({success = false, message = '', data = null}){
    return {
        success,
        message,
        data
    };
}

module.exports = apiResponse
