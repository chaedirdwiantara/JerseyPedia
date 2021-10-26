import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {colors, fonts, responsiveHeight} from '../../../utils';
import {IconCari} from '../../../assets';
import {Jarak, Tombol} from '../../kecil';
import {connect} from 'react-redux';
import {saveKeywordJersey} from '../../../actions/JerseyAction';

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  selesaiCari = () => {
    const {page, navigation, dispatch} = this.props;
    const {search} = this.state;

    //jalankan action save keyword
    dispatch(saveKeywordJersey(search));

    //jika itu halaman home kita navigate ke listJersey
    if (page !== 'ListJersey') {
      navigation.navigate('ListJersey');
    }

    //kembalikan state search itu ke string kosong
    this.setState({
      search: '',
    });
  };

  render() {
    const {search} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.wrapperHeader}>
          {/* Input Pencarian */}
          <View style={styles.searchSection}>
            <IconCari />
            <TextInput
              placeholder="Cari Jersey. . ."
              style={styles.input}
              value={search}
              onChangeText={search => this.setState({search})}
              onSubmitEditing={() => this.selesaiCari()}
            />
          </View>
          <Jarak width={10} />
          <Tombol
            icon="keranjang"
            padding={10}
            onPress={() => navigation.navigate('Keranjang')}
          />
        </View>
      </View>
    );
  }
}

export default connect()(HeaderComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: responsiveHeight(125),
  },
  wrapperHeader: {
    flexDirection: 'row',
    marginTop: 15,
    marginHorizontal: 30,
  },
  searchSection: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingLeft: 10,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    fontFamily: fonts.primary.regular,
  },
});
