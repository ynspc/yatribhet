export default parse = async (response) => {
    let returnObject = {
        message: '',
        data: {}
    };
    if ( response.status === 200 ) {
        returnObject.data = response.data;
    }

    returnObject.message = response.message;

    return returnObject;
};