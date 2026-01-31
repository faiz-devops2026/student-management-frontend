// 🔴 NEW: useRef added to reset file input after save
import { useState, useRef } from "react";

function Student() {

  // 🔴 NEW: ref for file input (needed to clear file after submit)
  const fileRef = useRef(null);

  // =========================
  // ADD STUDENT STATES
  // =========================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);

  // =========================
  // SEARCH STUDENT STATES
  // =========================
  const [searchId, setSearchId] = useState("");
  const [student, setStudent] = useState(null);

  // =========================
  // SAVE STUDENT WITH IMAGE
  // =========================
  const saveStudent = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("age", age);
    formData.append("image", image);

    const res = await fetch(
      "https://student-management-ye13.onrender.com/students/save-with-image",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();
    alert("Student saved with ID: " + data.id);

    // 🔴 NEW: RESET FORM AFTER SAVE
    setName("");
    setEmail("");
    setAge("");
    setImage(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  // =========================
  // SEARCH STUDENT BY ID
  // =========================
  const searchStudent = async () => {
    const res = await fetch(
      `https://student-management-ye13.onrender.com/students/by-id/${searchId}`
    );
    const data = await res.json();
    setStudent(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Page</h1>

      {/* =========================
          ADD STUDENT FORM
         ========================= */}
      <h3>Add Student</h3>

      {/* 🔴 NEW: controlled input */}
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />

      {/* 🔴 NEW: controlled input */}
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      {/* 🔴 NEW: controlled input */}
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br />

      {/* 🔴 NEW: ref added to reset file input */}
      <input
        type="file"
        ref={fileRef}
        onChange={(e) => setImage(e.target.files[0])}
      />
      <br />

      <button onClick={saveStudent}>Save Student</button>

      <hr />

      {/* =========================
          SEARCH STUDENT SECTION
         ========================= */}
      <h3>Search Student by ID</h3>

      <input
        type="number"
        placeholder="Enter ID"
        onChange={(e) => setSearchId(e.target.value)}
      />

      <button onClick={searchStudent}>Search</button>

      {student && (
  <div style={{ marginTop: "15px" }}>
    <p><b>ID:</b> {student.id}</p>
    <p><b>Name:</b> {student.name}</p>
    <p><b>Email:</b> {student.email}</p>
    <p><b>Age:</b> {student.age}</p>

    {student.imagePath && (
      <img
        src={`https://student-management-ye13.onrender.com/students/${student.imagePath}`}
        width="150"
        alt="student"
      />
    )}
  </div>
)}

    </div>
  );
}

export default Student;
