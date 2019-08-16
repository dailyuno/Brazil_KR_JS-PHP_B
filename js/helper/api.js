const api = {
    baseURL: '',
    status: null,
    request(url, method, data) {
        // const formData = new FormData();
        //
        // for (let key in data) {
        //     formData.append(key, data[key]);
        // }

        return fetch(`${this.baseURL}/${url}`, {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            this.status = res.status;
            return res.json();
        }).then(res => ({
            status: this.status,
            data: res
        }));
    },
    get(url, data) {
        return this.request(url, 'GET', data);
    },
    post(url, data) {
        return this.request(url, 'POST', data);
    },
    put(url, data) {
        return this.request(url, 'PUT', data);
    },
    delete(url, data) {
        return this.request(url, 'DELETE', data);
    }
};