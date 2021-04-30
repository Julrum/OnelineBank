import * as firebase from 'firebase';
import 'firebase/firestore';
import config from '../../firebase.json';

const app = firebase.initializeApp(config);

const Auth = app.auth();

export const login = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

const uploadImage = async uri => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const user = Auth.currentUser;
  const ref = app.storage().ref(`/profile/${user.uid}/photo.png`);
  const snapshot = await ref.put(blob, { contentType: 'image/png' });

  blob.close();
  return await snapshot.ref.getDownloadURL();
};

export const signup = async ({ email, password, name, photoUrl }) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  const storageUrl = photoUrl.startsWith('https')
    ? photoUrl
    : await uploadImage(photoUrl);
  await user.updateProfile({
    displayName: name,
    photoURL: storageUrl,
  });
  return user;
};

export const createUsers = async ({ email, account, name }) => {
  const newInformationRef = DB.collection('information').doc();
  const id = newInformationRef.id;
  const newInformation = {
    id,
    name,
    email,
    account,
    createdAt: Date.now(),
  };
  await newInformationRef.set(newInformation);
  return id;
};

export const logout = async () => {
  return await Auth.signOut();
};

export const getCurrentUser = () => {
  const { uid, displayName, email, photoURL } = Auth.currentUser;
  return {
    uid,
    name: displayName,
    email,
    photoUrl: photoURL,
  };
};

export const updateUserPhoto = async photoUrl => {
  const user = Auth.currentUser;
  const storageUrl = photoUrl.startsWith('https')
    ? photoUrl
    : await uploadImage(photoUrl);
  await user.updateProfile({ photoUrl: storageUrl });
  return { name: user.displayName, email: user.email, photoUrl: user.photoURL };
};

export const DB = firebase.firestore();

export const createMessage = async ({ message }) => {
  return await DB.collection('messages')
    .doc(message._id)
    .set({ ...message, createdAt: Date.now() });
};

export const createBotMessage = async ({ message }) => {
  return await DB.collection('messages')
    .doc(message._id)
    .set({ ...message, createdAt: Date.now() });
};

export const createAccount = async ({ name, account }) => {
  const newAccountRef = DB.collection('accounts').doc();
  const id = newAccountRef.id;
  const newAccount = {
    id,
    name,
    account,
  };
  await newAccountRef.set(newAccount);
  return id;
};
