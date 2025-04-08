import { Route,Routes } from "react-router-dom"
import HomePage from "./HomePage"
import LoginAdminPage from "./LoginAdminPage"
import ShowAdmins from "../components/ShowAdmins"
import AdminManagement from "../components/AdminManagement"

function Pages() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/loginAdmin" element={<LoginAdminPage />} />
        <Route path="/ShowAdmins" element={<ShowAdmins />} />
        <Route path="/ManagementAdmin" element={<AdminManagement />} />


    </Routes>
  )
}

export default Pages
