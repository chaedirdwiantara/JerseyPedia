import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, Image, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Inputan, Pilihan, Tombol} from '../../components';
import {dummyProfile} from '../../data';
import {
  colors,
  fonts,
  responsiveHeight,
  responsiveWidth,
  getData,
} from '../../utils';
import {getProvinsiList, getKotaList} from '../../actions/RajaOngkirAction';
import {DefaultImage} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      nama: '',
      email: '',
      nohp: '',
      alamat: ' ',
      provinsi: '',
      kota: false,
      avatar: false,
      avatarForDB: '',
      avatarLama: '',
      updateAvatar: false,
    };
  }

  getUserData = () => {
    getData('user').then(res => {
      const data = res;
      this.setState({
        uid: data.uid,
        nama: data.nama,
        email: data.email,
        nohp: data.nohp,
        alamat: data.alamat,
        kota: data.kota,
        provinsi: data.provinsi,
        avatar: data.avatar,
      });

      this.props.dispatch(getKotaList(data.provinsi));
    });
  };

  componentDidMount() {
    this.getUserData();
    this.props.dispatch(getProvinsiList());
  }

  ubahProvinsi = provinsi => {
    this.setState({
      provinsi: provinsi,
    });

    this.props.dispatch(getKotaList(provinsi));
  };

  getIamge = () => {
    launchImageLibrary(
      {quality: 1, maxWidth: 500, maxHeight: 500},
      response => {
        if (response.didCancel || response.errorCode || response.errorMessage) {
          Alert.alert('Error', 'Maaf sepertinya anda tidak memilih fotonya');
        } else {
          console.log(response);
          const source = response.assets[0].uri;
          const fileString = `data:${response.assets[0].type};base64,${response.assets[0].fileName}`;

          this.setState({
            avatar: source,
            avatarForDB: fileString,
          });
        }
      },
    );
  };

  onSubmit = () => {
    const {nama, nohp, alamat, provinsi, kota} = this.state;
    if (nama && nohp && alamat && provinsi && kota) {
      //dispatch update
      // this.props.dispatch(updateProfile(this.state))
    } else {
      Alert.alert('Error', 'Nama No. HP, Alamat, Kota, Provinsi harus diisi');
    }
  };

  render() {
    const {
      dataKota,
      dataProvinsi,
      profile,
      uid,
      nama,
      email,
      nohp,
      alamat,
      provinsi,
      kota,
      avatar,
    } = this.state;

    const {getKotaResult, getProvinsiResult} = this.props;

    return (
      <View style={styles.pages}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Inputan
            label="Nama"
            value={nama}
            onChangeText={nama => this.setState({nama})}
          />
          <Inputan label="Email" value={email} disabled />
          <Inputan
            label="No. Handphone"
            value={nohp}
            value={nohp}
            onChangeText={nohp => this.setState({nohp})}
            keyboardType="number-pad"
          />
          <Inputan
            label="Alamat"
            value={alamat}
            value={alamat}
            onChangeText={alamat => this.setState({alamat})}
            textarea
          />

          <Pilihan
            label="Provinsi"
            datas={getProvinsiResult ? getProvinsiResult : []}
            selectedValue={provinsi}
            onValueChange={provinsi => this.ubahProvinsi(provinsi)}
          />
          <Pilihan
            label="Kota/Kab"
            datas={getKotaResult ? getKotaResult : []}
            selectedValue={kota}
            onValueChange={kota => this.setState({kota: kota})}
          />

          <View style={styles.inputFoto}>
            <Text style={styles.label}>Foto Profile :</Text>

            <View style={styles.wrapperUpload}>
              <Image
                source={avatar ? {uri: avatar} : DefaultImage}
                style={styles.foto}
              />

              <View style={styles.tombolChangePhoto}>
                <Tombol
                  title="Change Photo"
                  type="text"
                  padding={7}
                  onPress={() => this.getIamge()}
                />
              </View>
            </View>
          </View>

          <View style={styles.submit}>
            <Tombol
              title="Submit"
              type="textIcon"
              icon="submit"
              padding={responsiveHeight(15)}
              fontSize={18}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getProvinsiResult: state.RajaOngkirReducer.getProvinsiResult,
  getKotaResult: state.RajaOngkirReducer.getKotaResult,
});

export default connect(mapStateToProps, null)(EditProfile);

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingTop: 10,
  },
  inputFoto: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  foto: {
    height: responsiveWidth(150),
    width: responsiveWidth(150),
    borderRadius: 40,
  },
  wrapperUpload: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  tombolChangePhoto: {
    marginLeft: 20,
    flex: 1,
  },
  submit: {
    marginVertical: 30,
  },
});
