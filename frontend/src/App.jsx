
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './routes/Router'
import  { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    
      <RouterProvider router={router}/>
      <Toaster/>
    </>
)

}

export default App
