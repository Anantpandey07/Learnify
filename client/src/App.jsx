import './App.css'
import Login from './pages/login'
import Navbar from './components/Navbar'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import { RouterProvider } from 'react-router'
import Courses from './pages/student/Courses'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import Dashboard from './pages/admin/Dashboard'
import Sidebar from './pages/admin/sidebar'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/createLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetailPage from './pages/student/CourseDetailPage'
import CourseProgress from './pages/student/CourseProgress'
import SearchPage from './pages/student/SearchPage'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {
        path: '/',
        element: (
          <>
            <HeroSection/>
            <Courses/>
          </>
        )
      },
      {
        path:'/login',
        element: (
          <>
          <Login/>
          </>
        )
      },
      {
        path:'/myLearning',
        element:<MyLearning/>
      },
      {
        path:'/profile',
        element:<Profile/>
      },
      {
        path:'course/search',
        element:<SearchPage/>
      },
      {
        path:'/course-detail/:courseId',
        element:<CourseDetailPage/>
      },
      {
        path:'/course-progress/:courseId',
        element:<CourseProgress/>
      },
      // admin path from here
      {
        path:'admin',
        element:<Sidebar/>,
        children:[
          {
            path:'dashboard',
            element:<Dashboard/>
          },
          {
            path:'courses',
            element:<CourseTable/>
          },
          {
            path:'courses/create',
            element: <AddCourse/>
          },
          {
            path:'courses/:courseId',
            element: <EditCourse/>
          },
          {
            path:'courses/:courseId/lecture',
            element: <CreateLecture/>
          },
          {
            path:'courses/:courseId/lecture/:lectureId',
            element: <EditLecture/>
          }
        ]
      },
    ]
  }
])

function App() {

  return (
    <main>
      <RouterProvider router={appRouter}/>
    </main>
  )
}

export default App
