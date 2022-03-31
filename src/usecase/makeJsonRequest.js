export default function () {
    return (method, url, headers, jsonPayload) => {
        const defaultHeaders = {
            'Content-Type': 'application/json'
        }

        const config = {
            method: method,
            headers: {...defaultHeaders, ...headers}
        }

        if (jsonPayload) {
            config.body = JSON.stringify(jsonPayload)
        }
        return fetch(url, config).then(response => {
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
