import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './Layout/Main';
import Login from './Component/Login';
import Registration from './Component/Registration';



function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      children: [
        { path: '/', element: <Registration></Registration> },
        { path: '/registration', element: <Registration></Registration> },
        { path: '/login', element: <Login></Login> },
      ]
    }
  ])
  return (
    <div>

      <RouterProvider router={router}></RouterProvider>

    </div>
  );
}

export default App;
