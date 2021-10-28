import {MASUK_KERANJANG} from '../../actions/KeranjangAction';

const initialState = {
  saveKeranjangLoading: false,
  saveKeranjangResult: false,
  saveKeranjangError: false,
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

    default:
      return state;
  }
}
