import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const { authTokens, logOutUser } = useContext(AuthContext)

  useEffect(() => {
    getNotes()
  }, [])
  

  const getNotes = async () => {
    const url = `http://127.0.0.1:8000/api/notes/`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${String(authTokens.access)}`
      }
    })
    let data = await response.json()

    if(response.status === 200){
      setNotes(data)
    }else if(response.statusText === 'Unauthorized'){
      logOutUser()
    }
  }

  return (
    <>
      <div>hello logged in user</div>

      <ul>
        {notes.map((res) => (
          <li key={res.id}>{res.body}</li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
