
import { Routes, Route, Link, NavLink } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import User from "./pages/User";
import Student from "./pages/Student";

 
function App() {
  return (
    <div>
    <nav>
  <Link to="/">Home</Link> |{" "}
  <Link to="/student">Student</Link> |{" "}
  <NavLink
    to="/about"
    style={({ isActive }) => ({
      color: isActive ? "red" : "black",
      fontWeight: isActive ? "bold" : "normal"
    })}
  >
    About
  </NavLink>
  {" "} |{" "}

  <Link to="/contact">Contact</Link> |{" "}
  <Link to="/user/101">User 101</Link>
</nav>


      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/user/:id" element={<User />} />
  <Route path="*" element={<NotFound />} />
  <Route path="/student" element={<Student />} />

</Routes>

    </div>
  );
}

export default App;
