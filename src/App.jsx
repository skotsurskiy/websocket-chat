import './App.scss'
import ChatWindow from "./pages/ChatWindow/ChatWindow.jsx";
import AuthorizationSection from "./pages/Authorization/AuthorizationSection.jsx";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ProfileSection from "./pages/Profile/ProfileSection.jsx";
import {useSelector} from "react-redux";
import ChatContent from "./pages/ChatWindow/ChatContent.jsx";

export default function App() {
  const token = useSelector(state => state.auth.token)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <ChatWindow /> : <Navigate to="/auth/login" />} />

        <Route path="/auth/*" element={<AuthorizationSection />} />

        <Route path="*" element={<h2>404 Page not found</h2>} />

        <Route path="/me" element={<ProfileSection />} />

        <Route path="/chats/*" element={<ChatContent />} />
      </Routes>
    </BrowserRouter>
  )
}
