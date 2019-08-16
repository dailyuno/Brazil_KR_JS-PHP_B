Vue.component('app-header', {
    template: `
        <header class="app-header fixed-top">
            <nav class="navbar navbar-expand-lg">
                <div class="navbar-brand">
                    <router-link :to="{name: 'course.list'}">CS Teachers Club</router-link>
                </div>
                <div class="collapse navbar-collapse justify-content-end">
                    <ul class="navbar-nav" role="menu" aria-label="menu" v-if="status.token">
                        <li class="nav-item" role="menuitem" aria-label="menuitem">
                            <router-link :to="{name: 'user.courses'}" class="nav-link">My courses</router-link>
                        </li>
                        <li class="nav-item" role="menuitem" aria-label="menuitem">
                            <router-link :to="{name: 'course.list'}" class="nav-link">Courses</router-link>
                        </li>
                        <li class="nav-item" role="menuitem" aria-label="menuitem">
                            <span class="nav-link">{{ username }}</span>
                        </li>
                        <li class="nav-item" role="menuitem" aria-label="menuitem">
                            <a href="#" class="nav-link" @click.prevent="logout">Logout</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav" role="menu" aria-label="menu" v-else>
                        <li class="nav-item" role="menuitem" aria-label="menuitem">
                            <router-link :to="{name: 'user.login'}" class="nav-link">Login</router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    `,
    data() {
        return {
            status: store.status,
            users: []
        }
    },
    methods: {
        logout() {
            api
                .post(`logout?token=${this.status.token}`)
                .then(res => {
                    if (res.status === 200) {
                        store.removeAuth();
                        store.toast('logout success', 'success');
                        this.$router.push({name: 'user.login'});
                    } else {
                        store.toast(res.data.message, 'error');
                    }
                });
        },
        setUsers() {
            api
                .get(`profile?token=${this.status.token}`)
                .then(res => {
                    this.users = res.data;
                });
        }
    },
    computed: {
        username() {
            const user = this.users.find(x => x.username === this.status.username);

            if (user) {
                const { firstname, lastname } = user;
                return `${firstname} ${lastname}`;
            }
        }
    },
    created() {
        if (store.isAuth()) {
            this.setUsers();
        }
    }
});