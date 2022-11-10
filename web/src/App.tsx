import { useRoutes, BrowserRouter, Route, Navigate } from 'react-router-dom'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Layout from './pages/layout/Layout'
import NotFound from './pages/notFound/NotFound'
import Document from './pages/document/Document'
import Cooperation from './pages/cooperation/Cooperation'
import Template from './pages/template/Template'
import Group from './pages/group/Group'
import Collection from './pages/collection/Collection'
import History from './pages/history/History'
import RecycleBin from './pages/recycleBin/RecycleBin'
import EditDocs from './pages/editDocs/EditDocs'

const Routes = () => {
  const routes = useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/edit',
      element: <EditDocs />,
    },
    {
      path: '/',
      element: <Navigate to='/dashboard/work' />,
    },
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/dashboard/work',
          element: <Home />,
        },
        {
          path: '/dashboard/document',
          element: <Document />,
        },
        {
          path: '/dashboard/cooperation',
          element: <Cooperation />,
        },
        {
          path: '/dashboard/template',
          element: <Template />,
        },
        {
          path: '/dashboard/group',
          element: <Group />,
        },
        {
          path: '/dashboard/collection',
          element: <Collection />,
        },
        {
          path: '/dashboard/history',
          element: <History />,
        },
        {
          path: '/dashboard/recycle-bin',
          element: <RecycleBin />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])
  return routes
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  )
}

export default App
