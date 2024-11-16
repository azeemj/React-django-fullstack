
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"



const Logout = () => {
  localStorage.clear()
  return <Navigate to="/login"></Navigate>
}

// const RegisterAndLogout = () => {
//   localStorage.clear();
//   return <Register></Register>
// }
function App() {
  

  return (
    <BrowserRouter>

    <Routes>
    <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />


      
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/logout" element={<Logout></Logout>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
     
    </BrowserRouter>
  )
}

export default App
