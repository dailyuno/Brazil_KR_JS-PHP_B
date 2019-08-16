const UserLoginView = {
    template: `
        <div class="layouts">
            <main class="content h-100">
                <div class="form-container d-flex h-100">
                    <div class="col-lg-6 form-content h-100">
                        <h1 class="pb-5">Sign In</h1>
                        <form @submit.prevent="login">
                            <div class="form-group">
                                <label for="username">Username <span>*</span></label>
                                <input type="text" id="username" v-model="form.username" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="password">Password <span>*</span></label>
                                <input type="password" id="password" v-model="form.password" class="form-control" />
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-danger send-btn">Login</button>
                            </div>
                            <div class="form-group">
                                <p>Don't you have an account? <router-link :to="{name: 'user.join'}">Sign up</router-link></p>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-6 form-bg h-100">
                        <div class="form-bg-item">
                            <div class="form-bg-img">
                                <img src="images/bg.png" alt="bg" title="bg">
                            </div>
                            <div class="form-bg-content text-center">
                                <h1 class="pb-3">Welcome Back!</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis laudantium maxime odit veniam. Delectus eius, ex magni minus odio ratione similique? Cumque cupiditate error ipsum, quaerat quasi tempore tenetur veritatis.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    `,
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            api
                .post(`login`, this.form)
                .then(res => {
                    if (res.status === 200) {
                        store.setAuth(this.form.username, res.data.token);
                        store.toast('login success', 'success');
                        this.$router.push({name: 'course.list'});
                    } else {
                        store.toast(res.data.message, 'error');
                    }
                });
        }
    }
};