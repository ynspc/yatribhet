/*
*  urlFormat = {
    url: '',
    params: ['','',''],
    queryString: [
        { key: 'value' }
    ]
}*/
const urlHandler = (url) => {
    let processedUrl = '';
    if ( Array.isArray(url) && url.length > 0 ) {
        //handle for the url send in the form of array
    }
    else {
        processedUrl = url.url;

        for (let param of url.params) {
            processedUrl = `${processedUrl}/${param}`;
        }
    }

    console.log(processedUrl)
    return processedUrl;

};

const getRoute = ( prefix = null, path = null ) => {
    let baseUrl = '';
    if ( !prefix && !path )
        return `${baseUrl}/`;

    if (prefix)
        baseUrl = `${baseUrl}/${prefix}`;
    if (path)
        baseUrl = `${baseUrl}/${path}`;

    return baseUrl;
};

export {
    urlHandler,
    getRoute
};
