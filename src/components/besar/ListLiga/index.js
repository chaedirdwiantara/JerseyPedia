import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {colors} from '../../../utils';
import {CardLiga} from '../../kecil';

const ListLiga = ({getListLigaResult, getListLigaLoading}) => {
  return (
    <View style={styles.container}>
      {getListLigaResult ? (
        Object.keys(getListLigaResult).map(key => {
          return <CardLiga liga={getListLigaResult[key]} key={key} />;
        })
      ) : getListLigaLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : (
        <Text>Data Kosong</Text>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  getListLigaLoading: state.LigaReducer.getListLigaLoading,
  getListLigaResult: state.LigaReducer.getListLigaResult,
});

export default connect(mapStateToProps, null)(ListLiga);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  loading: {
    flex: 1,
    marginTop: 10,
    marginBottom: 30,
  },
});
