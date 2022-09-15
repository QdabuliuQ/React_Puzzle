import { Navigate } from 'react-router-dom'
import { lazy } from "react";
const GamePage = lazy(() => import("pages/GamePage/GamePage"))
const HomePage = lazy(() => import("pages/HomePage/HomePage"))
const ComplexPage = lazy(() => import("pages/ComplexPage/ComplexPage"))

export default [
  {
    path: '/GamePage',
    element: <GamePage/>
  },
  {
    path: '/HomePage',
    element: <HomePage/>
  },
  {
    path: '/ComplexPage',
    element: <ComplexPage/>
  },
  {
    path: '/',
    element: <Navigate to='/HomePage'/>
  }
]