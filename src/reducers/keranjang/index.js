import {
  MASUK_KERANJANG,
  GET_LIST_KERANJANG,
} from '../../actions/KeranjangAction';

const initialState = {
  saveKeranjangLoading: false,
  saveKeranjangResult: false,
  saveKeranjangError: false,

  getListKeranjangLoading: false,
  getListKeranjangResult: false,
  getListKeranjangError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MASUK_KERANJANG:
      return {
        ...state,
        saveKeranjangLoading: action.payload.loading,
        saveKeranjangResult: action.payload.data,
        saveKeranjangError: action.payload.errorMessage,
      };

    case GET_LIST_KERANJANG:
      return {
        ...state,
        getListKeranjangLoading: action.payload.loading,
        getListKeranjangResult: action.payload.data,
        getListKeranjangError: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
