import FIREBASE from '../config/FIREBASE';
import {dispatchError, dispatchLoading, dispatchSuccess} from '../utils';

export const MASUK_KERANJANG = 'MASUK_KERANJANG';

export const masukKeranjang = data => {
  return dispatch => {
    dispatchLoading(dispatch, MASUK_KERANJANG);

    // Cek Apakah Data Keranjang User tersebut sudah ada atau tidak
    FIREBASE.database()
      .ref('keranjangs/' + data.uid)
      .once('value', querySnapshot => {
        console.log(
          'cek keranjang di firebase apakah ada',
          querySnapshot.val(),
        );

        if (querySnapshot.val()) {
          //Update Keranjang Utama
          const keranjangUtama = querySnapshot.val();
          const beratBaru =
            parseInt(data.jumlah) * parseFloat(data.jersey.berat);
          const hargaBaru = parseInt(data.jumlah) * parseInt(data.jersey.harga);

          FIREBASE.database()
            .ref('keranjangs')
            .child(data.uid)
            .update({
              totalHarga: keranjangUtama.totalHarga + hargaBaru,
              totalBerat: keranjangUtama.totalBerat + beratBaru,
            })
            .then(response => {
              //Simpan Ke Keranjang Detail
              dispatch(masukKeranjangDetail(data));
            })
            .catch(error => {
              dispatchError(dispatch, MASUK_KERANJANG, error);
              alert(error);
            });
        } else {
          //Simpan Keranjang Utama
          const keranjangUtama = {
            user: data.uid,
            tanggal: new Date().toDateString(),
            totalHarga: parseInt(data.jumlah) * parseInt(data.jersey.harga),
            totalBerat: parseInt(data.jumlah) * parseFloat(data.jersey.berat),
          };

          FIREBASE.database()
            .ref('keranjangs')
            .child(data.uid)
            .set(keranjangUtama)
            .then(response => {
              console.log('response disimpan ke keranjang utama', response);
              //Simpan Ke Keranjang Detail
              dispatch(masukKeranjangDetail(data));
            })
            .catch(error => {
              dispatchError(dispatch, MASUK_KERANJANG, error);
              alert(error);
            });
        }
      })
      .catch(error => {
        dispatchError(dispatch, MASUK_KERANJANG, error);
        alert(error);
      });
  };
};

export const masukKeranjangDetail = data => {
  return dispatch => {
    const pesanans = {
      product: data.jersey,
      jumlahPesan: data.jumlah,
      totalHarga: parseInt(data.jumlah) * parseInt(data.jersey.harga),
      totalBerat: parseInt(data.jumlah) * parseFloat(data.jersey.berat),
      keterangan: data.keterangan,
      ukuran: data.ukuran,
    };

    FIREBASE.database()
      .ref('keranjangs/' + data.uid)
      .child('pesanans')
      .push(pesanans)
      .then(response => {
        console.log('Simpan Keranjang Detail', response);
        dispatchSuccess(dispatch, MASUK_KERANJANG, response ? response : []);
      })
      .catch(error => {
        dispatchError(dispatch, MASUK_KERANJANG, error);
        alert(error);
      });
  };
};
