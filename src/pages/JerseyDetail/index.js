import {NavigationContainer} from '@react-navigation/native';
import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {connect} from 'react-redux';
import {
  CardLiga,
  Inputan,
  JerseySlider,
  Pilihan,
  Tombol,
  Jarak,
} from '../../components';
import {
  colors,
  fonts,
  numberWithCommas,
  responsiveHeight,
  heightMobileUI,
  responsiveWidth,
  getData,
} from '../../utils';
import {getDetailLiga} from '../../actions/LigaAction';

class JerseyDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jersey: this.props.route.params.jersey,
      images: this.props.route.params.jersey.gambar,
      jumlah: '',
      ukuran: '',
      keterangan: '',
      uid: '',
    };
  }

  componentDidMount() {
    const {jersey} = this.state;
    this.props.dispatch(getDetailLiga(jersey.liga));
  }

  masukKeranjang = () => {
    const {jumlah, keterangan, ukuran} = this.state;

    getData('user').then(res => {
      if (res) {
        //simpan uid local storage ke state
        this.setState({
          uid: res.uid,
        });

        //validasi form
        if (jumlah && keterangan && ukuran) {
          //hubungkan ke action (keranjangAction/masukKeranjang)
          //this.props.dispatch(masukKeranjang(this.state))
        } else {
          Alert.alert('Error', 'Jumlah, Ukuran, & Keterangan Harus diisi');
        }
      } else {
        Alert.alert('Error', 'silahkan login terlebih dahulu');
        this.props.navigation.replace('Login');
      }
    });
  };

  render() {
    const {navigation, getDetailLigaResult} = this.props;
    console.log(this.props, 'ini');

    const {jersey, images, jumlah, keterangan, ukuran} = this.state;
    console.log(this.state, 'state');
    console.log(jersey.ukuran, 'jersey');
    return (
      <View style={styles.page}>
        <View style={styles.button}>
          <Tombol
            icon="arrow-left"
            padding={7}
            onPress={() => navigation.goBack()}
          />
        </View>
        <JerseySlider images={images} />
        <View style={styles.container}>
          <View style={styles.liga}>
            <CardLiga
              liga={getDetailLigaResult}
              navigation={navigation}
              id={jersey.liga}
            />
          </View>
          <View style={styles.desc}>
            <Text style={styles.nama}>{jersey.nama}</Text>
            <Text style={styles.harga}>
              Harga : Rp. {numberWithCommas(jersey.harga)}
            </Text>
            <View style={styles.garis}></View>
            <View style={styles.wrapperJenisBerat}>
              <Text style={styles.jenisBerat}>Jenis : {jersey.jenis}</Text>
              <Text style={styles.jenisBerat}>Berat : {jersey.berat}</Text>
            </View>
            <View style={styles.wrapperInput}>
              <Inputan
                label="Jumlah"
                width={responsiveWidth(166)}
                height={responsiveHeight(43)}
                fontSize={13}
                value={jumlah}
                onChangeText={jumlah => this.setState({jumlah})}
              />
              <Pilihan
                label="Pilih Ukuran"
                width={responsiveWidth(166)}
                height={responsiveHeight(43)}
                fontSize={13}
                datas={jersey.ukuran}
                onValueChange={ukuran => this.setState({ukuran})}
                selectedValue={ukuran}
              />
            </View>
            <Inputan
              label="Keterangan"
              textarea
              fontSize={13}
              placeholder="Isi jika ingin menambahkan Name Tag (nama & nomor punggung)"
              value={keterangan}
              onChangeText={keterangan => this.setState({keterangan})}
            />
            <Jarak height={15} />
            <Tombol
              title="Masuk Keranjang"
              type="textIcon"
              icon="keranjang-putih"
              padding={responsiveHeight(17)}
              fontSize={18}
              onPress={() => this.masukKeranjang()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getDetailLigaResult: state.LigaReducer.getDetailLigaResult,
});

export default connect(mapStateToProps, null)(JerseyDetail);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    height: responsiveHeight(465),
    width: '100%',
    backgroundColor: colors.white,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  button: {
    position: 'absolute',
    marginTop: 30,
    marginLeft: 30,
    zIndex: 1,
  },
  desc: {
    marginHorizontal: 30,
  },
  nama: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.bold,
    textTransform: 'capitalize',
  },
  harga: {
    fontSize: RFValue(24, heightMobileUI),
    fontFamily: fonts.primary.light,
  },
  liga: {
    alignItems: 'flex-end',
    marginRight: 30,
    marginTop: -30,
  },
  garis: {
    borderWidth: 0.5,
    marginVertical: 5,
  },
  wrapperJenisBerat: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  jenisBerat: {
    fontSize: 13,
    fontFamily: fonts.primary.regular,
    marginRight: 30,
  },
  wrapperInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
