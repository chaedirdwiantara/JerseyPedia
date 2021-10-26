import FIREBASE from '../config/FIREBASE';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const GET_LIST_LIGA = 'GET_LIST_LIGA';
export const GET_DETAIL_LIGA = 'GET_DETAIL_LIGA';

export const getListLiga = () => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_LIGA);

    FIREBASE.database()
      .ref('ligas')
      .once('value', querySnapshot => {
        //Hasil
        let data = querySnapshot.val() ? querySnapshot.val() : [];
        let dataItem = {...data};

        dispatchSuccess(dispatch, GET_LIST_LIGA, dataItem);
      })
      .catch(error => {
        dispatchError(dispatch, GET_LIST_LIGA, error);
        alert(error);
      });
  };
};

export const getDetailLiga = id => {
  return dispatch => {
    dispatchLoading(dispatch, GET_DETAIL_LIGA);

    FIREBASE.database()
      .ref('ligas/' + id)
      .once('value', querySnapshot => {
        //Hasil
        let data = querySnapshot.val() ? querySnapshot.val() : [];
        let dataItem = {...data};

        dispatchSuccess(dispatch, GET_DETAIL_LIGA, dataItem);
      })
      .catch(error => {
        console.log(error, 'errorkah');
        dispatchError(dispatch, GET_DETAIL_LIGA, error);
        alert(error);
      });
  };
};
