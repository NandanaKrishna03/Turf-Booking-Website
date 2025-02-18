
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './routes/Router'
import  { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/shared/ScrollToTop';
import { ThemeProvider } from './context/ThemeContext';
function App() {
  return (
    <>
       <ThemeProvider>
      <RouterProvider router={router}>
      <ScrollToTop/>
      <Toaster/>
      </RouterProvider>
      </ThemeProvider>
    </>
)

}

export default App
