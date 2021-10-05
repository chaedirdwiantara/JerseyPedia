import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {
  BannerSlider,
  HeaderComponent,
  ListJerseys,
  ListLiga,
  Tombol,
} from '../../components';
import {colors, fonts} from '../../utils';
import {dummyJerseys, dummyLigas} from '../../data';
import {Jarak} from '../../components';
import {connect} from 'react-redux';
import {getUser} from '../../actions/UserAction';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ligas: dummyLigas,
      jerseys: dummyJerseys,
    };
  }

  componentDidMount() {
    // this.props.dispatch(getUser());
    this.props.getUser();
  }

  render() {
    const {ligas, jerseys} = this.state;
    const {navigation, dataUser} = this.props;
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderComponent navigation={navigation} />
          <BannerSlider />
          <View style={styles.pilihLiga}>
            <Text style={styles.label}>Pilih Liga {dataUser.email}</Text>
            <ListLiga ligas={ligas} />
          </View>

          <View style={styles.pilihJersey}>
            <Text style={styles.label}>
              Pilih <Text style={styles.boldLabel}>Jersey</Text> Yang Anda
              Inginkan
            </Text>
            <ListJerseys jerseys={jerseys} navigation={navigation} />

            <Tombol title="Lihat Semua" type="text" padding={7} />
          </View>

          <Jarak height={100} />
        </ScrollView>
      </View>
    );
  }
}

const mapStatetoProps = state => ({
  dataUser: state.UserReducer.dataUser,
});

export default connect(mapStatetoProps, {getUser})(Home);

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  pilihLiga: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  pilihJersey: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
});
