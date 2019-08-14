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

  /* Handles button state changes */
  onButtonToggle() {
    let newState = this.state.showList ? false : true;

    this.setState({
      showList: newState
    });
  }

  render() {
    let buttonText = this.state.showList ? 'Show Map' : 'Show Nearby Places';

    return (
      <View style={styles.container}>
        { this.state.showList &&
        <View style={{flex: 5}}> 
          <Text>Here's what's nearby:</Text>
          <PlaceList></PlaceList>
        </View>
        }
        { !this.state.showList &&
        <View style={{flex: 5}}>
          <Map></Map>
        </View>
        }
        <View style={{flex: 1}}>
          <Button onPress={this.onButtonToggle} title={buttonText}/>
        </View>
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
