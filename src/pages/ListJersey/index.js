import React, {Component} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {HeaderComponent, ListJerseys, ListLiga} from '../../components';
import {colors, fonts} from '../../utils';
import {Jarak} from '../../components';
import {connect} from 'react-redux';
import {getListJersey} from '../../actions/JerseyAction';
import {getListLiga} from '../../actions/LigaAction';

class ListJersey extends Component {
  componentDidMount() {
    //supaya akan selalu get data ketika tab profile dibuka, defaultnya tidak
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.props.dispatch(getListLiga());
      this.props.dispatch(getListJersey());
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.page}>
        <HeaderComponent navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.pilihLiga}>
            <ListLiga />
          </View>

          <View style={styles.pilihJersey}>
            <Text style={styles.label}>
              Pilih <Text style={styles.boldLabel}>Jersey</Text> Yang Anda
              Inginkan
            </Text>
            <ListJerseys />
          </View>

          <Jarak height={100} />
        </ScrollView>
      </View>
    );
  }
}

export default connect()(ListJersey);

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  container: {
    marginTop: -30,
  },
  pilihLiga: {
    marginHorizontal: 30,
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
