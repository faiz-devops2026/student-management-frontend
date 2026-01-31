import { useState, useRef } from "react";
import "./Student.css";

function Student() {
  const fileRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);

  const [searchId, setSearchId] = useState("");
  const [student, setStudent] = useState(null);

  const saveStudent = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("age", age);
    formData.append("image", image);

    const res = await fetch(
      "https://student-management-ye13.onrender.com/students/save-with-image",
      { method: "POST", body: formData }
    );

    const data = await res.json();
    alert("Student saved with ID: " + data.id);

    setName("");
    setEmail("");
    setAge("");
    setImage(null);
    fileRef.current.value = "";
  };

  const searchStudent = async () => {
    const res = await fetch(
      `https://student-management-ye13.onrender.com/students/by-id/${searchId}`
    );
    const data = await res.json();
    setStudent(data);
  };

  return (
    <div className="page">
      <h1 className="title">Student Management</h1>

      <div className="card">
        <h3>Add Student</h3>

        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Age" type="number" value={age} onChange={e => setAge(e.target.value)} />
        <input type="file" ref={fileRef} onChange={e => setImage(e.target.files[0])} />

        <button onClick={saveStudent}>Save Student</button>
      </div>

      <div className="card">
        <h3>Search Student</h3>

        <div className="search-row">
          <input
            type="number"
            placeholder="Enter ID"
            onChange={e => setSearchId(e.target.value)}
          />
          <button onClick={searchStudent}>Search</button>
        </div>

        {student && (
          <div className="result">
            <img src={student.imagePath} alt="student" />
            <div>
              <p><b>ID:</b> {student.id}</p>
              <p><b>Name:</b> {student.name}</p>
              <p><b>Email:</b> {student.email}</p>
              <p><b>Age:</b> {student.age}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Student;
