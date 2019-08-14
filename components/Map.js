import React from 'react';

import DataStore from '../resources/DataStore';
import MapView from 'react-native-maps';

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapRegion: null
        };

        this.setMapRegion = this.setMapRegion.bind(this);
    }

    componentDidMount() {
        let userLocation = DataStore.getUserLocation();

        // Data store returns a promise if location hasn't yet been captured
        if (userLocation instanceof Promise) {
            userLocation.then((location) => {
                this.setMapRegion(location);
            });
        } else {
            this.setMapRegion(userLocation);
        }
    }

    setMapRegion(location) {
        // Setting predefined delta values to set reasonable initial zoom
        let mapRegion = {
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        }

        this.setState({ mapRegion });
    }

    render() {
        return (
            <MapView 
                style={{ width: 350, height: 350}}
                region={this.state.mapRegion}
                showsUserLocation={true} />
        )
    }
}
