import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./UI/Home"
import { AppProviderContext } from "./context/appProvider"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  }
])
function App() {

  return <AppProviderContext>
    <RouterProvider router={router} />
  </AppProviderContext>
}

export default App
