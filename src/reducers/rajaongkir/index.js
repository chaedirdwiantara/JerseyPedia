import {GET_PROVINSI} from '../../actions/RajaOngkirAction';

const initialState = {
  getProvinsiLoading: false,
  getProvinsiResult: false,
  getProvinsiError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROVINSI:
      return {
        ...state,
        getProvinsiLoading: action.payload.loading,
        getProvinsiResult: action.payload.data,
        getProvinsiError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
