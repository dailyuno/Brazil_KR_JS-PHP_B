const routes = [
    {
        path: '/',
        component: CourseListView,
        name: 'course.list'
    },
    {
        path: '/user/login',
        component: UserLoginView,
        name: 'user.login'
    },
    {
        path: '/user/join',
        component: UserJoinView,
        name: 'user.join'
    },
    {
        path: '/user/courses',
        component: UserCourseView,
        name: 'user.courses'
    }
];