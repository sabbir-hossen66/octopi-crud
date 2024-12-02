import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './apps/store.js'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './layout/Layout.jsx'
import CreateUser from './Pages/CreateUser/CreateUser.jsx'
import UserList from './components/UserList.jsx'
import UserDetails from './Pages/UserDetails/UserDetails.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/createUser",
        element: <CreateUser />
      },
      {
        path: "/userList",
        element: <UserList />
      },
      {
        path: "/users/:id",
        element: <UserDetails />
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
