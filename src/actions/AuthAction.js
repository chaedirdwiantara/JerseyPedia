import FIREBASE from '../config/FIREBASE';
import {storeData} from '../utils';

export const REGISTER_USER = 'REGISTER_USER';

export const registerUser = (data, password) => {
  return dispatch => {
    // LOADING
    dispatch({
      type: REGISTER_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    FIREBASE.auth()
      .createUserWithEmailAndPassword(data.email, password)
      .then(success => {
        // Ambil UID, buat dataBaru (data+uid)
        const dataBaru = {
          ...data,
          uid: success.user.uid,
        };

        //Simpan ke Realtime database firebase
        FIREBASE.database()
          .ref('users/' + success.user.uid)
          .set(dataBaru);

        //SUKSES
        dispatch({
          type: REGISTER_USER,
          payload: {
            loading: false,
            data: dataBaru,
            errorMessage: false,
          },
        });
        //Local Storage (Async Storage)
        storeData('user', dataBaru);
      })

      .catch(error => {
        // ERROR
        dispatch({
          type: REGISTER_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });

        alert(error.message);
      });
  };
};
