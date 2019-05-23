import React, { Component } from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  MyListItem,
  StyleSheet,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as ComicActions } from '~/store/ducks/comics';

// import { Container } from './styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    marginTop: 20,
    padding: 30,
  },

  img: {
    height: 120,
    width: 120,
  },

  list: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  loading: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});

class Main extends Component {
  componentDidMount() {
    this.loadComics();
  }

  // openModal = (id) => {
  //   const { showModal } = this.props;
  //   showModal(id);
  // };

  loadComics = () => {
    const { addComicsRequest } = this.props;
    addComicsRequest();
  };

  renderComic = ({ item }) => (
    <View style={styles.container} key={item.id}>
      <Text
        key={item.id}
        // onPressItem={this._onPressItem}
        // selected={!!this.state.selected.get(item.id)}
      >
        {item.name}
      </Text>
      <Image
        style={styles.img}
        source={{ uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }}
      />
    </View>
  );

  renderFooter = () => {
    const { comics } = this.props;
    if (!comics.loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  render() {
    const { comics } = this.props;

    return (
      <View>
        <FlatList
          style={{ marginTop: 30 }}
          contentContainerStyle={styles.list}
          onEndReached={this.loadComics}
          onEndReachedThreshold={0.1}
          keyExtractor={item => JSON.stringify(item.id)}
          data={comics.data}
          renderItem={this.renderComic}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  comics: state.comics,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...ComicActions,
    // ...ModalActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
