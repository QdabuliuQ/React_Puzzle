import { Navigate } from 'react-router-dom'
import GamePage from "pages/GamePage/GamePage";

export default [
  {
    path: '/GamePage',
    element: <GamePage/>
  },
  {
    path: '/',
    element: <Navigate to='/GamePage'/>
  }
]