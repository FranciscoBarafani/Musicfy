//Aqui se guardan las funciones de llamadas a firebase
import firebaseApp from "./Firebase";
import * as firebase from "firebase";

const db = firebase.firestore(firebaseApp);

//Esta funcion chequea si el usuario es administrador o no
export async function isUserAdmin(uid) {
  const response = await db.collection("admins").doc(uid).get();
  //Retorna true si es admin y false si no lo es, lo busca en la coleccion admins
  return response.exists;
}

export const reauthenticate = (password) => {
  const user = firebase.auth().currentUser;
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  return user.reauthenticateAndRetrieveDataWithCredential(credentials);
};
