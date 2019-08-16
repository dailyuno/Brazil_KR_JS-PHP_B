const CourseListView = {
    template: `
        <div class="layouts">
            <app-header></app-header>

            <main class="content">
                <div class="content-container">
                    <h2 class="pb-5">Upcoming courses</h2>
                    
                    <div class="search-container mb-5">
                        <div class="search-form">
                            <img src="images/date-icon.svg" alt="input-date-icon" title="input-date-icon">
                            <input type="date" :min="minDate" v-model="date" class="form-control">
                        </div>
                    </div>

                    <transition-group name="fade" tag="div" class="row">
                        <template v-for="course in filterCourses">
                            <div class="col-lg-4" :key="course.id">
                                <div class="event-item">
                                    <h3 class="event-title pb-3">{{ course.title }}</h3>
                                    <p class="event-description">{{ course.description }}</p>
                                    <div class="event-details">
                                        <div class="event-detail-item">
                                            <div class="event-detail-img">
                                                <img src="images/date.svg" alt="date-icon" title="date-icon">
                                            </div>
                                            <div class="event-detail-content">
                                                <div class="event-detail-value">
                                                    {{ course.date_time }} ({{ course.duration_days }} days)
                                                </div>
                                                <div class="event-detail-key">
                                                    Date & Time (days)
                                                </div>
                                            </div>
                                        </div>
                                        <div class="event-detail-item">
                                            <div class="event-detail-img">
                                                <img src="images/user.svg" alt="user-icon" title="user-icon">
                                            </div>
                                            <div class="event-detail-content">
                                                <div class="event-detail-value">
                                                    {{ course.instructor_name }}
                                                </div>
                                                <div class="event-detail-key">
                                                    Instructor name
                                                </div>
                                            </div>
                                        </div>
                                        <div class="event-detail-item">
                                            <div class="event-detail-img">
                                                <img src="images/location.svg" alt="location-icon" title="location-icon">
                                            </div>
                                            <div class="event-detail-content">
                                                <div class="event-detail-value">
                                                    {{ course.location }}
                                                </div>
                                                <div class="event-detail-key">
                                                    Location
                                                </div>
                                            </div>
                                        </div>
                                        <div class="event-detail-item">
                                            <div class="event-detail-img">
                                                <img src="images/seat.svg" alt="seat-icon" title="seat-icon">   
                                            </div>
                                            <div class="event-detail-content">
                                                <div class="event-detail-value">
                                                    {{ course.seats }}
                                                </div>
                                                <div class="event-detail-key">
                                                    Seats
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="btn btn-success" v-if="course.isRegister">Register</button>
                                    <button class="btn btn-danger" @click="register(course)" v-else>Register</button>
                                </div>
                            </div>
                        </template>
                    </transition-group>
                </div>
            </main>
        </div>
    `,
    data() {
        return {
            courses: [],
            registrations: [],
            minDate: (new Date).toISOString().split('T')[0],
            date: (new Date).toISOString().split('T')[0]
        }
    },
    methods: {
        setCourses() {
            api
                .get(`courses?token=${store.status.token}`)
                .then(res => {
                    this.courses = res.data;
                });
        },
        setRegistrations() {
            api
                .get(`registrations?token=${store.status.token}`)
                .then(res => {
                    this.registrations = res.data;
                });
        },
        register(course) {
            api
                .post(`registrations?token=${store.status.token}`, {
                    course_id: course.id
                })
                .then(res => {
                    if (res.status === 200) {
                        store.toast('Register for the course was successfully', 'success');
                        this.setRegistrations();
                    } else {
                        store.toast(res.data.message, 'error');
                    }
                });
        }
    },
    computed: {
        filterCourses() {
            return this.courses
                .filter(x => new Date(x.date_time) > new Date(this.date))
                .sort((a, b) => new Date(a.date_time) < new Date(b.date_time) ? 1 : -1)
                .map(course => {
                    return Object.assign({}, course, {
                        isRegister: this.registrations.find(x => x.course_id === course.id)
                    });
                });
        }
    },
    created() {
        if (store.isAuth()) {
            this.setCourses();
            this.setRegistrations();
        }
    }
};