const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const errorObject = {
    data: null,
    success: false,
    message: '',
    status: 500,
}

const methods = { post: 'POST', get: 'GET', put: 'PUT' }

let headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Accept', 'application/json');
headers.append('Origin','http://localhost:3000');

export const fetchData = async (method, endpoint, body) => {
    const options = { method: methods[method], headers }
    if (method != 'get') options.body = typeof body === "string" ? body : JSON.stringify(body)
    
    try {
        const endpointURL = `${API_BASE_URL}/${endpoint}`
        const response = await fetch(endpointURL, options);
        return response
    } catch (e) {
        errorObject.message = `Error: ${e}`
        return errorObject
    }
}
