import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider, RouterProviderProps } from 'react-router-dom'

import FileReaderComp from './Api/FileReaderComponents'
import ErrorPage from './routers/ErrorPage'
import Home from './routers/Home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "admin/translate",
        element: <FileReaderComp />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)