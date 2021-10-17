import FIREBASE from '../config/FIREBASE';
import {storeData} from '../utils';

export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const updateProfile = data => {
  return dispatch => {
    // LOADING
    dispatch({
      type: UPDATE_PROFILE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    const dataBaru = {
      uid: data.uid,
      nama: data.nama,
      alamat: data.alamat,
      nohp: data.nohp,
      provinsi: data.provinsi,
      kota: data.kota,
      email: data.email,
      status: 'user',
      avatar: data.updateAvatar ? data.avatarForDB : data.avatarLama,
    };

    FIREBASE.database()
      .ref('users/' + dataBaru.uid)
      .update(dataBaru)
      .then(response => {
        //SUKSES
        dispatch({
          type: UPDATE_PROFILE,
          payload: {
            loading: false,
            data: response ? response : [],
            errorMessage: false,
          },
        });
        //Local Storage (Async Storage)
        storeData('user', dataBaru);
      })
      .catch(error => {
        // ERROR
        dispatch({
          type: UPDATE_PROFILE,
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
