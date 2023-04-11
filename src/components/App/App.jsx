import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { AuthLogin } from "../../pages/AuthLogin/AuthLogin";
import { Registration } from "../../pages/Registration/Registration";
import { Layout } from "../Layout/Layout";
import { db } from '../../firebase'
import { ref, set, onValue, update } from "firebase/database";
import { Admin } from "../../pages/Admin/Admin";
import { Trips } from "../../pages/Trips/Trips";
import { Statistics } from "../../pages/Statistics/Statistics";
import { Feedback } from '../../pages/Feedback/Feedback';

const admin = ['mdurov25@gmail.com'];

export const App = () => {
  const [user, setUser] = useState(() => JSON.parse(window.localStorage.getItem('user') ?? null))
  const navigate = useNavigate();
  const [database, setDatabase] = useState([]);

  //UPDATE
  const handlePsition = (position) => {
    setDatabase(prevState => prevState.map(user => {
      if (user.uid === position.uid) {
        return { ...user, position: position.position }
      }
      return user
    }))
    update(ref(db, `users/${position.uid}/user`), {
      position: position.position
    })
  }

  //POST
  function writeUserData(user) {
    set(ref(db, `users/${user.uid}/user`), {
      email: user.email,
      uid: user.uid,
      name: user.displayName,
      position: 'Passenger',
      number: user.phoneNumber
    });
    setDatabase({
      email: user.email,
      uid: user.uid,
      displayName: user.displayName,
      position: 'Passenger',
      number: user.phoneNumber
    });
  }

  useEffect(() => {
    if (!user) {
      return
    }
    window.localStorage.setItem('user', JSON.stringify(user));

    //READ
    onValue(ref(db, 'users/'), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setDatabase(Object.values(data))
      }
    });
  }, [user]);

  const handleUser = (user) => {
    setUser(user)
    if (database.find(id => id.uid === user.id) === undefined) {
      writeUserData(user)
    }
  }

  const handleLogOut = () => {
    setUser(null)
    setDatabase([])
    window.localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <Routes>
      {user ? <Route path="/" element={<Layout handleLogOut={handleLogOut} user={user} admin={admin} />}>
        <Route index element={<Navigate to='trips' />} />
        <Route path="admin"
          element={admin.includes(user.email)
            ? <Admin database={database} handlePsition={handlePsition} />
            : null} />
        <Route path="trips" element={<Trips user={user} />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="feedback" element={<Feedback />} />
      </Route>
        : <Route path="*" element={<AuthLogin handleUser={handleUser} />} />}
      <Route path="Registration" element={<Registration handleUser={handleUser} />} />
    </Routes>
  );
}

