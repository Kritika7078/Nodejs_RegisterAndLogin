import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Home  from "./pages/Home";
import { Logout } from "./pages/Logout";
import { Contact } from "./pages/Contact";
import { Error } from "./pages/Error";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import Service from "./pages/Service";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import AdminContacts from "./pages/Admin-Contacts";
import AdminUser from "./pages/Admin-User";
import { AdminUpdate } from "./pages/Admin-Update";


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/service" element={<Service />} />
        <Route path="/logout" element={<Logout/>}/>
        <Route path="*" element={<Error/>} />
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="users" element={<AdminUser/>}/>
          <Route path="contacts" element={<AdminContacts/>}/>
          <Route path="users/:id/edit" element={<AdminUpdate/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;