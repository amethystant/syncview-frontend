export default function () {
    return (url, headers, jsonPayload) => {
        const defaultHeaders = {
            'Content-Type': 'application/json'
        }

        return fetch(url, {
            method: 'POST',
            headers: {...defaultHeaders, ...headers},
            body: JSON.stringify(jsonPayload)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Request failed')
            }
            return response.json()
        })
    }
}
