import { useState } from "react";

function User() {
  const [id, setId] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchStudent = async () => {
    if (!id) {
      setError("Please enter student ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setStudent(null);

      const res = await fetch(`https://student-management-ye13.onrender.com/students/by-id/${id}`);

      if (!res.ok) {
        throw new Error("Student not found");
      }

      const data = await res.json();
      setStudent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Search Student</h2>

      {/* Search Field */}
      <input
        type="number"
        placeholder="Enter Student ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{ padding: "6px", width: "100%" }}
      />

      {/* Search Button */}
      <button onClick={searchStudent} style={{ marginTop: "10px" }}>
        Search
      </button>

      {/* Loading */}
      {loading && <p>Searching...</p>}

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Result */}
      {student && (
        <div style={{ marginTop: "15px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>Student Details</h3>
          <p><b>ID:</b> {student.id}</p>
          <p><b>Name:</b> {student.name}</p>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Age:</b> {student.age}</p>
        </div>
      )}
    </div>
  );
}

export default User;


