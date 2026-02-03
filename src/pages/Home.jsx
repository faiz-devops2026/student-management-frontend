import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket } from "../websocket";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  // 🔄 REST se students load
  const loadStudents = () => {
    fetch("https://student-management-ye13.onrender.com/students")
      .then((res) => res.json())
      .then((data) => {
        console.log("Students:", data);
        setStudents(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // initial load
    loadStudents();

    // 🔌 WebSocket connect
    connectWebSocket((message) => {
      console.log("📢 WS message:", message);

      // 🔥 student add and table refresh
      loadStudents();
    });

    return () => {
      disconnectWebSocket();
    };
  }, []);

  return (
    <div>
      <h1>Home Page</h1>

      <button onClick={() => navigate("/contact")}>
        Go to Contact
      </button>

      <h2>Welcome to Our React Routing App</h2>

      <hr />

      <h2>User from Backend</h2>

      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
            </tr>
          ))}
        </tbody>

        <caption>Student data fetched from Spring Boot backend</caption>
      </table>
    </div>
  );
}

export default Home;
