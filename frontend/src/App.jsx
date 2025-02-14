
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './routes/Router'
import  { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/shared/ScrollToTop';
function App() {
  return (
    <>
      
      <RouterProvider router={router}>
      <ScrollToTop/>
      <Toaster/>
      </RouterProvider>
    </>
)

}

export default App
