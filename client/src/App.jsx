import React, { useEffect } from 'react'
import FrontendRoutes from './FrontendRoutes'
import { Provider } from 'react-redux'
import store from './store/store'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <> 
    <Provider store={store}>
     <ToastContainer/>
     <FrontendRoutes/>
     </Provider>
    </>
  )
}

export default App
