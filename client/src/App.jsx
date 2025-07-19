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
