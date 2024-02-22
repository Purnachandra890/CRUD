import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

export default function Addinfo() {
  const [data, setData] = useState([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const [nameUpdated, setUpdatedname] = useState("");
  const [emailUpdated, setUpdatedemail] = useState("");
  const [numberUpdated, setUpdatednumber] = useState("");
  const [update, setUpdate] = useState(false); // State to manage update form visibility
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const handleButton = () => {
    axios
      .post(
        "https://65d5fa6cf6967ba8e3bd2a8f.mockapi.io/crud/info/studentDetails",
        {
          name: name,
          email: email,
          phone: number,
        }
      )
      .then(() => {
        setname("");
        setemail("");
        setnumber("");
        alert("Added Information");
        fetchData();
      });
  };

  const fetchData = () => {
    axios
      .get(
        "https://65d5fa6cf6967ba8e3bd2a8f.mockapi.io/crud/info/studentDetails"
      )
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleDel = (id) => {
    axios
      .delete(
        `https://65d5fa6cf6967ba8e3bd2a8f.mockapi.io/crud/info/studentDetails/${id}`
      )
      .then(() => {
        fetchData();
        alert("Deleted ");
      });
  };

  const handleUpdate = (id) => {
    const selectedStudent = data.find((student) => student.id === id);
    setUpdatedname(selectedStudent.name);
    setUpdatedemail(selectedStudent.email);
    setUpdatednumber(selectedStudent.phone);
    setSelectedStudentId(id);
    setUpdate(true);
  };
  const submitUpdate = () => {
    axios
      .put(
        `https://65d5fa6cf6967ba8e3bd2a8f.mockapi.io/crud/info/studentDetails/${selectedStudentId}`,
        {
          name: nameUpdated,
          email: emailUpdated,
          phone: numberUpdated,
        }
      )
      .then((res) => {
        fetchData();
        alert("Updated");
        setUpdate(false);
      });
  };
  return (
    <div className="container">
      <div>
        <h1>Add Data</h1>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setname(e.target.value)}
          value={name}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setemail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="number"
          onChange={(e) => setnumber(e.target.value)}
          value={number}
        />
        <button onClick={handleButton}>Add Item</button>
      </div>
      <h1>view form</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone no</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>
                <button onClick={() => HandleDel(student.id)}>Delete</button>
              </td>
              <td>
                <button onClick={() => handleUpdate(student.id)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Update Form</h1>
      {update && (
        <div>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => setUpdatedname(e.target.value)}
            value={nameUpdated}
          />
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setUpdatedemail(e.target.value)}
            value={emailUpdated}
          />
          <input
            type="text"
            placeholder="number"
            onChange={(e) => setUpdatednumber(e.target.value)}
            value={numberUpdated}
          />
          <button onClick={submitUpdate}>Update</button>
        </div>
      )}
    </div>
  );
}
