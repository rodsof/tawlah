import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebaseConfig from './config';

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
    }

    // Registra un usuario
    async register(name, surname, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
        console.log(surname);
        return await newUser.user.updateProfile({
            displayName : name + ' ' + surname,
        })
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