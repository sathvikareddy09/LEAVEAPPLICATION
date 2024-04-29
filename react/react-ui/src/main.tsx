import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Dashboard from './Dashboard.tsx'
import { RouterProvider } from 'react-router'
import LeaveForm from './LeaveForm.tsx'
import Login from './login.tsx'


const path = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/' element={<Login />} />
            <Route path='/LeaveForm' element={<LeaveForm />} />
            <Route path='/LeaveForm/:id' element={<LeaveForm />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path=':id' element={<LeaveForm/> }/>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={path }/>
  </React.StrictMode>,
)
