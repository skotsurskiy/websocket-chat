import './AuthorizationSection.scss'
import LoginSection from "./LoginSection.jsx";
import RegisterSection from "./RegisterSection.jsx";
import {Route, Routes} from "react-router-dom";

export default function AuthorizationSection() {

  return (
    <Routes>
      <Route path="/login" element={<LoginSection />} />

      <Route path="/register" element={<RegisterSection />} />
    </Routes>
  )
}