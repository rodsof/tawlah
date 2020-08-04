import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  // Registra un usuario
  async register(name, surname, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log(newUser);
    this.updateUserData(newUser.user);
    return await newUser.user.updateProfile({
      displayName: name + " " + surname,
    });
  }

  // update roles
  async updateUserData(user) {
    const userUpd = {
      id: user.uid,
      roles: {
        owner: false,
        admin: false,
      },
    };
    // insert into db
    firebase.db
      .collection("users")
      .add(userUpd)
      .then(function (docRef) {
        return;
      })
      .catch(function (error) {
        return error;
      });
  }

  // Log in
  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Log out
  async logOut() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();
export default firebase;
