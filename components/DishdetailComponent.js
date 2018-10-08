import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  Button,
  PanResponder,
  Alert,
  Share
} from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import { postFavorite, postComment } from '../redux/ActionCreators';

const mapStateToProps = state => ({
  dishes: state.dishes,
  comments: state.comments,
  favorites: state.favorites
});

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  postComment: comment => dispatch(postComment(comment))
});

function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => (
    <View key={index} style={{ margin: 10 }}>
      <Text style={{ fontSize: 14 }}>{item.comment}</Text>
      <Rating
        style={{ alignItems: 'flex-start' }}
        type="star"
        readonly
        fractions={1}
        startingValue={+item.rating}
        imageSize={10}
        // style={{ paddingVertical: 10 }}
      />
      <Text style={{ fontSize: 12 }}>{`--${item.author}, ${item.date}`}</Text>
    </View>
  );

  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMss) {
    return (
      <View>
        <Text>{props.errMss}</Text>
      </View>
    );
  }
  return (
    <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
      <Card title="Comments">
        <FlatList
          data={comments}
          renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()}
        />
      </Card>
    </Animatable.View>
  );
}

function RenderDish(props) {
  const dish = props.dish;
  const handleViewRef = ref => (this.view = ref);
  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMss) {
    return (
      <View>
        <Text>{props.errMss}</Text>
      </View>
    );
  }
  const RightToLeftDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx < -200) return true;
    return false;
  };

  const leftToRightDrag = ({ moveX, moveY, dx, dy }) => {
    if (dx > 0) return true;
    return false;
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => true,
    onPanResponderGrant: () => {
      this.view
        .rubberBand(1000)
        .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
    },
    onPanResponderEnd: (e, gestureState) => {
      console.log('pan responder end', gestureState);
      if (RightToLeftDrag(gestureState)) {
        Alert.alert(
          'Add Favorite',
          `Are you sure you wish to add ${dish.name} to favorite?`,
          [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
              text: 'OK',
              onPress: () => {
                props.favorite ? console.log('Already favorite') : props.onPress();
              }
            }
          ],
          { cancelable: false }
        );
      }
      if (leftToRightDrag(gestureState)) {
        props.onAddComment();
      }

      return true;
    }
  });

  const shareDish = (title, message, url) => {
    Share.share(
      {
        title,
        message: `${title}: ${message} ${url}`,
        url
      },
      {
        dialogTitle: `Share ${title}`
      }
    );
  };

  if (dish != null) {
    return (
      <Animatable.View
        animation="fadeInDown"
        duration={2000}
        delay={1000}
        ref={this.handleViewRef}
        {...panResponder.panHandlers}
      >
        <Card featuredTitle={dish.name} image={{ uri: baseUrl + dish.image }}>
          <Text style={{ margin: 10 }}>{dish.description}</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon
              raised
              reverse
              name={props.favorite ? 'heart' : 'heart-o'}
              type="font-awesome"
              color="#f50"
              onPress={() => (props.favorite ? console.log('Already favorite') : props.onPress())}
            />
            <Icon
              raised
              reverse
              name="pencil"
              type="font-awesome"
              color="#002AD9"
              onPress={() => props.onAddComment()}
            />
            <Icon
              raised
              reverse
              name="share"
              type="font-awesome"
              color="#51D2A8"
              style={styles.cardItem}
              onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
            />
          </View>
        </Card>
      </Animatable.View>
    );
  }
  return <View />;
}

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 5.0,
      author: '',
      comment: '',
      showModal: false
    };
  }

  markFavorite(dishId) {
    this.props.postFavorite(dishId);
  }

  static navigationOptions = {
    title: 'Dish Detals'
  };

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  resetCommentDetails() {
    this.setState({
      rating: 5.0,
      author: '',
      comment: '',
      showModal: false
    });
  }

  postNewComment(dishId) {
    this.props.postComment(
      (comment = {
        id: this.getId(),
        dishId,
        rating: this.state.rating,
        comment: this.state.comment,
        author: this.state.author,
        date: new Date()
      })
    );
  }

  getId() {
    return Math.max(...this.props.comments.comments.map(o => o.y), 0);
  }

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');
    return (
      <ScrollView>
        <RenderDish
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
          isLoading={this.props.dishes.isLoading}
          errMss={this.props.dishes.errMss}
          onAddComment={() => this.handleReservation()}
        />
        <RenderComments
          comments={this.props.comments.comments.filter(comment => comment.dishId === dishId)}
          isLoading={this.props.comments.isLoading}
          errMss={this.props.comments.errMss}
        />

        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Rating
              showRating
              type="star"
              fractions={1}
              startingValue={this.state.rating}
              onFinishRating={rating => {
                this.setState({ rating });
                console.log(` + ${rating}`);
              }}
              imageSize={40}
              style={{ paddingVertical: 10 }}
            />

            <Input
              style={styles.modalText}
              placeholder="Author"
              onChangeText={text => this.setState({ author: text })}
              leftIcon={<Icon name="user-o" type="font-awesome" size={24} color="black" />}
            />

            <Input
              style={styles.modalText}
              placeholder="Comment"
              onChangeText={text => this.setState({ comment: text })}
              leftIcon={<Icon name="comment-o" type="font-awesome" size={24} color="black" />}
            />

            <View
              style={{ marginTop: 20, flexDirection: 'column', marginRight: 10, marginLeft: 10 }}
            >
              <Button
                style={styles.modalText}
                onPress={() => {
                  this.toggleModal();
                  this.postNewComment(dishId);
                }}
                color="#512DA8"
                title="Post Comment"
              />
            </View>

            <View
              style={{ marginTop: 30, flexDirection: 'column', marginRight: 10, marginLeft: 10 }}
            >
              <Button
                style={styles.modalText}
                onPress={() => {
                  this.toggleModal();
                  this.resetCommentDetails();
                }}
                color="#D7DBDD"
                title="Close"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DishDetail);
