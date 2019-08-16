const store = {
    status: {
        username: localStorage.getItem('KR-username') || null,
        token: localStorage.getItem('KR-token') || null,
        toast: {
            msg: null,
            msgType: null,
            timer: null
        }
    },
    setAuth(username, token) {
        const status = this.status;
        status.username = username;
        status.token = token;
        localStorage.setItem('KR-username', username);
        localStorage.setItem('KR-token', token);
    },
    removeAuth() {
        const status = this.status;
        status.username = null;
        status.token = null;
        localStorage.removeItem('KR-username');
        localStorage.removeItem('KR-token');
    },
    toast(msg, msgType) {
        const { toast } = this.status;
        clearTimeout(toast.timer);
        toast.msg = msg;
        toast.msgType = msgType;
        toast.timer = setTimeout(_ => {
            toast.msg = null;
            toast.msgType = null;
        }, 3000);
    },
    isAuth() {
        return this.status.token ? true : false;
    }
};