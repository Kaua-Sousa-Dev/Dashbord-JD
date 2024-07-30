// Importando arquivos
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'

// Importando Rotas
import ErrorPage from './routers/ErrorPage'
import Home from './routers/Home'
import Translate from './routers/Translate'
import Ranking from './Api/Ranking'

// Constante Rotas com React Router Dom
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "admin/translate",
        element: <Translate/>
      },
      {
        path: "admin/ranking",
        element: <Ranking/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)