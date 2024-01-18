import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/Header'
import Body from './components/Body'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Contact from './components/Contact'
import Error from './components/Error'
import RestaurantMenu from './components/RestaurantMenu'

// Chunking
// Lazy Loading
// Code Splitting
// Dynamic Bundling
// On demand loading
// dynamix import

const Grocery = lazy(() => import('./components/Grocery'))
const About = lazy(() => import('./components/About'))

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/about',
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <About />,
          </Suspense>
        ),
      },
      {
        path: '/Contact',
        element: <Contact />,
      },
      {
        path: '/Grocery',
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        errorElement: <Error />,
      },
      {
        path: '/restaurant/:resid',
        element: <RestaurantMenu />,
      },
    ],
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={appRouter} />)
