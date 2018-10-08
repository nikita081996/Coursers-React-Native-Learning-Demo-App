import React, { Component } from 'react';
import { View, StyleSheet, Button, Modal, ScrollView } from 'react-native';
import { Input, Rating } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class RatingComment extends Component {
  //Header title
  static navigationOptions = {
    title: 'Rating'
  };
  constructor(props) {
    super(props);

    this.state = {
      author: 1,
      comment: '',
      showModal: true
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  resetForm() {
    this.setState({
      author: 1,
      comment: '',
      showModal: false
    });
  }
  render() {
    return (
      <ScrollView>
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
              startingValue={3.6}
              imageSize={40}
              onFinishRating={this.ratingCompleted}
              style={{ paddingVertical: 10 }}
            />

            <Input placeholder="Author" leftIcon={<Icon name="user" size={24} color="black" />} />
            <Input
              placeholder="Comment"
              leftIcon={<Icon name="comment" size={24} color="black" />}
            />
            <View style={styles.buttonStyle}>
              <Button
                onPress={() => this.handleReservation()}
                title="Submit"
                color="#512DA8"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
            <View style={styles.buttonStyle}>
              <Button
                onPress={() => {
                  this.toggleModal();
                  this.resetForm();
                }}
                color="#512DA8"
                title="Cancel"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
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
  },
  buttonStyle: {
    backgroundColor: '#512DA8',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  passwordContainer: {
    flexDirection: 'row',
    borderColor: '#000',
    padding: 10
  },
  inputStyle: {
    flex: 1,
    paddingBottom: 5,
    paddingLeft: 5
  }
});

export default RatingComment;
