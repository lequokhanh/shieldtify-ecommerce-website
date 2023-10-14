import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from './utils/routes'

function App() {
  const router = createBrowserRouter(routes);
  return (
    <RouterProvider router={router}>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </RouterProvider>
  )
}

export default App
