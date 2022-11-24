
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Routes/Routes';


function App() {
  return (
    <div className="w-100 mx-auto lg:px-10">
     
    <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
