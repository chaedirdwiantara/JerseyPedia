import axios from 'axios';
import {
  API_HEADER_RAJAONGKIR,
  API_RAJAONGKIR,
  API_TIMEOUT,
} from '../utils/constant';

export const GET_PROVINSI = 'GET_PROVINSI';

export const getProvinsiList = () => {
  return dispatch => {
    // LOADING
    dispatch({
      type: GET_PROVINSI,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: 'get',
      url: API_RAJAONGKIR + 'province',
      timeout: API_TIMEOUT,
      headers: API_HEADER_RAJAONGKIR,
    })
      .then(response => {
        if (response.status !== 200) {
          // ERROR
          dispatch({
            type: GET_PROVINSI,
            payload: {
              loading: false,
              data: false,
              errorMessage: response,
            },
          });
        } else {
          // BERHASIL
          dispatch({
            type: GET_PROVINSI,
            payload: {
              loading: false,
              data: response.data ? response.data.rajaongkir.result : [],
              errorMessage: false,
            },
          });
        }
      })
      .catch(error => {
        // ERROR
        dispatch({
          type: GET_PROVINSI,
          payload: {
            loading: false,
            data: false,
            errorMessage: error,
          },
        });

        alert(error);
      });
  };
};
