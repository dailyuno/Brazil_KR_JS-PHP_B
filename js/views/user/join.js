const UserJoinView = {
    template: `
        <div class="layouts">
            <main class="content h-100">
                <div class="form-container d-flex h-100">
                    <div class="col-lg-6 form-content h-100">
                        <h1 class="pb-5">Sign Up</h1>
                        <form @submit.prevent="register">
                            <div class="form-group">
                                <label for="firstname">Firstname <span>*</span></label>
                                <input type="text" id="firstname" v-model="form.firstname" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="lastname">Lastname <span>*</span></label>
                                <input type="text" id="lastname" v-model="form.lastname" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="email">Email <span>*</span></label>
                                <input type="text" id="email" v-model="form.email" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="teacher_id">Teacher ID <span>*</span></label>
                                <input type="text" id="teacher_id" v-model="form.teacher_id" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="photo">Photo</label>
                                <input type="file" id="photo" @change="upload" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="username">Username <span>*</span></label>
                                <input type="text" id="username" v-model="form.username" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label for="password">Password <span>*</span></label>
                                <input type="password" id="password" v-model="form.password" class="form-control" />
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-danger send-btn">Create Profile</button>
                            </div>
                            <div class="form-group">
                                <p>Do you have an account? <router-link :to="{name: 'user.login'}">Sign In</router-link></p>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-6 form-bg h-100">
                        <div class="form-bg-item">
                            <div class="form-bg-img">
                                <img src="images/bg.png" alt="bg" title="bg">
                            </div>
                            <div class="form-bg-content text-center">
                                <h1 class="pb-3">Hello Friend!</h1>
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
                firstname: '',
                lastname: '',
                email: '',
                teacher_id: '71862479596',
                photo: '',
                username: '',
                password: ''
            }
        }
    },
    methods: {
        upload(ev) {
            const files = ev.target.files;

            if (files.length > 0) {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = (rs) => {
                    this.form.photo = rs.target.result.replace(/data:image\/[\w]+;base64,/, "");
                };
            } else {
                this.form.photo = '';
            }
        },
        register() {
            for (let key in this.form) {
                if (key !== 'photo' && this.form[key] === '') {
                    return store.toast('Missing fields', 'error');;
                }
            }

            if (!this.form.email.match(/[\w]+@[\w]+/)) {
                return store.toast('Wrong email address', 'error');;
            }

            api
                .post(`profile`, this.form)
                .then(res => {
                    if (res.status === 200) {
                        store.setAuth(this.form.username, res.data.token);
                        store.toast('Welcome Friend', 'success');
                        this.$router.push({name: 'course.list'});
                    } else {
                        store.toast(res.data.message, 'error');
                    }
                });
        }
    }
};