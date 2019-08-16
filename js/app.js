api.baseURL = `http://192.168.100.10:8001/api/v1`;

const app = new Vue({
    el: '#app',
    data() {
        return {
            status: store.status
        }
    },
    computed: {
        toast() {
            return this.status.toast;
        }
    },
    router
});