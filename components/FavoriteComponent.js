import React, { Component } from 'react';
import { FlatList, View, Text, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { deleteFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => ({
  dishes: state.dishes,
  favorites: state.favorites
});

const mapDispatchToProps = dispatch => ({
  deleteFavorite: dishId => dispatch(deleteFavorite(dishId))
});

class Favorites extends Component {
  static navigationOptions = {
    title: 'My Favorites'
  };

  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => {
      const rightButton = [
        {
          text: 'Delete',
          type: 'delete',
          onPress: () => {
            Alert.alert(
              'Delete Favorites',
              `Are you sure want to delete ${item.name} ?`,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => console.log(`Not deleted ${item.name}`)
                },
                {
                  text: 'Ok',
                  onPress: () => this.props.deleteFavorite(item.id)
                }
              ],
              {
                cancelable: false
              }
            );
          }
        }
      ];
      return (
        <Swipeout right={rightButton} autoClose>
          <Animatable.View animation="fadeInRightBig" duration={2000}>
            <ListItem
              key={index}
              title={item.name}
              subtitle={item.description}
              hideChevron
              onPress={() => navigate('Dishdetail', { dishId: item.id })}
              leftAvatar={{ source: { uri: baseUrl + item.image } }}
            />
          </Animatable.View>
        </Swipeout>
      );
    };
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={this.props.dishes.dishes.filter(dish =>
          this.props.favorites.some(el => el === dish.id)
        )}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
