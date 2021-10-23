import FIREBASE from '../config/FIREBASE';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const GET_LIST_JERSEY = 'GET_LIST_JERSEY';

export const getListJersey = () => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_JERSEY);

    FIREBASE.database()
      .ref('jerseys')
      .once('value', querySnapshot => {
        //Hasil
        let data = querySnapshot.val();
        let dataItem = {...data};

        dispatchSuccess(dispatch, GET_LIST_JERSEY, dataItem);
      })
      .catch(error => {
        dispatchError(dispatch, GET_LIST_JERSEY, error);
        alert(error);
      });
  };
};

export const limitJersey = () => {
  return dispatch => {
    dispatchLoading(dispatch, GET_LIST_JERSEY);

    FIREBASE.database()
      .ref('jerseys')
      .limitToLast(6)
      .once('value', querySnapshot => {
        //Hasil
        let data = querySnapshot.val();
        let dataItem = {...data};

        dispatchSuccess(dispatch, GET_LIST_JERSEY, dataItem);
      })
      .catch(error => {
        dispatchError(dispatch, GET_LIST_JERSEY, error);
        alert(error);
      });
  };
};
