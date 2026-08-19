import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import RecentlyMore from './components/More/RecentlyMore'
import TopMore from './components/More/TopMore'
import SignUp from './components/User/SignUp'
import LogIn from './components/User/LogIn'
import PythonMore from './components/More/Language/PythonMore'
import JavaMore from './components/More/Language/JavaMore'
import OtherMore from './components/More/Language/OtherMore'
import Course from './components/Course/Course'
import CategoryCourse from './components/Course/CatergoryCourse'
import Payment from './components/User/Payment'
import Search from './components/User/Search'
import Admin from "./components/User/Admin/Admin";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/recently" element={<RecentlyMore/>}/>
            <Route path="/top" element={<TopMore/>}/>
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/log-in" element={<LogIn/>}/>
            <Route path="/python" element={<PythonMore/>}/>
            <Route path="/java" element={<JavaMore/>}/>
            <Route path="/other" element={<OtherMore/>}/>
            <Route path="/:courseName" element={<Course/>}/>
            <Route path="*" element={<Home/>}/>
            <Route path="/category-course/:categoryName" element={<CategoryCourse />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin" element={<Admin />} />
        </Routes>
    )
}

export default App