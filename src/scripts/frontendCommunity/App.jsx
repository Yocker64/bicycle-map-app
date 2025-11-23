import { useState } from 'react'
import './styles/App.css'
import  UnauthenticatedPage  from './pages/UnauthenticatedPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <UnauthenticatedPage/>
    </>
  )
}

export default App
