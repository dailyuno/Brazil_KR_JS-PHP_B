const UserCourseView = {
    template: `
        <div class="layouts">
            <app-header></app-header>
            
            <main class="content">
                <div class="content-container">
                    <h2>My courses</h2>
                    
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Course name</th>
                                <th>Date</th>
                                <th>iCal</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="course in filterCourses">
                                <tr>
                                    <td>{{ course.title }}</td>
                                    <td>{{ course.date_time }}</td>
                                    <td><button class="btn btn-primary" @click="ical(course)">Ical</button></td>
                                    <td>
                                        <select class="form-control" @change="rating(course)" v-model="course.course_rating">
                                            <option value="null" disabled>rate overall experience</option>
                                            <option value="0">Bad</option>
                                            <option value="1">Good</option>
                                            <option value="2">Excellent</option>
                                        </select>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>    
                </div>
            </main>
        </div> 
    `,
    data() {
        return {
            courses: [],
            registrations: []
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
        ical({ title, date_time, description, duration_days, location, instructor_name }) {
            const d = new Date(date_time);
            d.setDate(d.getDate() + duration_days);
const template = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ical.marudot.com//iCal Event Maker
X-WR-CALNAME:Invitation: ${title}
CALSCALE:GREGORIAN
BEGIN:VTIMEZONE
TZID:Europe/Moscow
TZURL:http://tzurl.org/zoneinfo-outlook/Europe/Moscow
X-LIC-LOCATION:Europe/Moscow
BEGIN:STANDARD
TZOFFSETFROM:+0300
TZOFFSETTO:+0300
TZNAME:MSK
DTSTART:19700101T000000
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
DTSTAMP:20190628T131353Z
UID:20190628T131353Z-669183810@marudot.com
DTSTART;VALUE=DATE:${date_time.split(' ')[0]}
DTEND;VALUE=DATE:${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}
SUMMARY:${title}
URL:https%3A%2F%2Fcstclub.ru
DESCRIPTION:${description}\\n\\n\\nInstructor: ${instructor_name}
LOCATION:${location}
END:VEVENT
END:VCALENDAR
`;
            const blob = new Blob([template], {type: 'text/plain'});
            const link = document.createElement('a');
            const href = URL.createObjectURL(blob);
            link.setAttribute('href', href);
            link.setAttribute('download', 'test.ics');
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        rating({ course_id, course_rating }) {
            api
                .put(`registrations/${course_id}?token=${store.status.token}`, {
                    course_rating
                })
                .then(res => {
                    if (res.status === 200) {
                        store.toast('Rating success', 'success');
                    } else {
                    }
                });
        }
    },
    computed: {
        filterCourses() {
            return this.registrations
                .filter(x => this.courses.find(course => course.id === x.course_id))
                .map(x => {
                    const course = Object.assign({}, this.courses.find(course => course.id === x.course_id));
                    delete course.id;
                    return Object.assign(x, course);
                })
                .sort((a, b) => new Date(a.date_time) < new Date(b.date_time) ? 1 : -1)
        }
    },
    created() {
        if (store.isAuth()) {
            this.setCourses();
            this.setRegistrations();
        }
    }
};