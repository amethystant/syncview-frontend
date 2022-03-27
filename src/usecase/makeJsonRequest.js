export default function () {
    return (method, url, headers, jsonPayload) => {
        const defaultHeaders = {
            'Content-Type': 'application/json'
        }

        return fetch(url, {
            method: method,
            headers: {...defaultHeaders, ...headers},
            body: JSON.stringify(jsonPayload)
        }).then(response => {
            if (!response.ok) {
                const error = new Error('Request failed')
                if ([401, 404].includes(response.status)) {
                    error.isAuthorization = true
                }
                throw error
            }
            return response.json()
        })
    }
}
