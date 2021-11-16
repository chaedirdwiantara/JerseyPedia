import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {dummyPesanans} from '../../data';
import {ListKeranjang, Tombol} from '../../components';
import {
  colors,
  fonts,
  getData,
  numberWithCommas,
  responsiveHeight,
} from '../../utils';
import {connect} from 'react-redux';
import {getListKeranjang} from '../../actions/KeranjangAction';

class Keranjang extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pesanan: dummyPesanans[0],
    };
  }

  componentDidMount() {
    getData('user').then(res => {
      if (res) {
        //udah login
        this.props.dispatch(getListKeranjang(res.uid));
      } else {
        //belum login
        this.props.navigation.replace('Login');
      }
    });
  }

  render() {
    const {pesanan} = this.state;
    // console.log('Data Keranjang : ', this.props.getListKeranjangResult);
    return (
      <View style={styles.page}>
        <ListKeranjang keranjangs={pesanan.pesanans} />
        <View style={styles.footer}>
          {/* Total Harga */}
          <View style={styles.totalHarga}>
            <Text style={styles.textBold}>Total Harga :</Text>
            <Text style={styles.textBold}>
              Rp. {numberWithCommas(pesanan.totalHarga)}
            </Text>
          </View>

          {/* Tombol */}
          <Tombol
            title="Check Out"
            type="textIcon"
            fontSize={18}
            padding={responsiveHeight(15)}
            icon="keranjang-putih"
            onPress={() => this.props.navigation.navigate('Checkout')}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getListKeranjangLoading: state.KeranjangReducer.getListKeranjangLoading,
  getListKeranjangResult: state.KeranjangReducer.getListKeranjangResult,
  getListKeranjangError: state.KeranjangReducer.getListKeranjangError,
});

export default connect(mapStateToProps, null)(Keranjang);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  footer: {
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6.84,
    elevation: 11,
    paddingBottom: 30,
  },
  totalHarga: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  textBold: {
    fontSize: 20,
    fontFamily: fonts.primary.bold,
  },
});
