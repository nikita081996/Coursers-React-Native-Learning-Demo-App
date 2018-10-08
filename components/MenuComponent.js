import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => ({
  dishes: state.dishes
});
class Menu extends Component {
  static navigationOptions = {
    title: 'Menu'
  };

  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => (
      <Animatable.View animation="fadeInRightBig" duration={2000}>
        <Tile
          key={index}
          title={item.name}
          caption={item.description}
          featured
          onPress={() => navigate('Dishdetail', { dishId: item.id })}
          imageSrc={{ uri: baseUrl + item.image }}
        />
      </Animatable.View>
    );
    // const {navigate} = this.props.navigation;

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
        data={this.props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}

export default connect(mapStateToProps)(Menu);
