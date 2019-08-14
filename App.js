import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import LocationService from './resources/LocationService';
import Map from './components/Map';
import PlaceList from './components/PlaceList';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showList: true,
    };
    
    this.onButtonToggle = this.onButtonToggle.bind(this);
  }

  componentDidMount() {
    LocationService.findUserLocation();
  }

  onButtonToggle() {
    let newState = this.state.showList ? false : true;

    this.setState({
      showList: newState
    });
  }

  render() {

    return (
      <View style={styles.container}>
        <Button onPress={this.onButtonToggle} title="Change Views"/>
        <Text>Here's what's nearby:</Text>
        { this.state.showList && 
          <PlaceList></PlaceList>
        }
        { !this.state.showList &&
          <Map></Map>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
});
