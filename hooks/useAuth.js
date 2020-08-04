import React, { useEffect, useState } from "react";
import firebase from "../firebase";
function useAuth() {
  const [user, saveAutenticatedUser] = useState(null);
  const [userDB, saveUserDB] = useState({});
  const [spinnerAuth, setSpinner] = useState(null);
  const [errorAuth, setError] = useState("");
  useEffect(() => {
    const unsuscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        getUser(user.uid);
        saveAutenticatedUser(user);
      } else {
        saveAutenticatedUser(null);
      }
    });
    return () => unsuscribe();
  }, []);

  async function getUser(id) {
    if (id) {
      setSpinner(true);
      const userQuery = await firebase.db
        .collection("users")
        .where("userId", "==", id)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (user) {
            if (user.exists) {
              saveUserDB(user.data());
            } else {
              saveUserDB(null);
            }
          });
        })
        .catch(function (error) {
          setSpinner(null);
          setError("Error getting your information ");
        });
      setSpinner(null);
    }
  }

  return {
    user,
    userDB,
    spinnerAuth,
    errorAuth,
  };
}
export default useAuth;
