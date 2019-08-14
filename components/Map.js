import React from 'react';

import DataStore from '../resources/DataStore';
import MapView from 'react-native-maps';

export default class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mapRegion: null
        };
    }

    componentDidMount() {
        let userLocation = DataStore.getUserLocation();
        let mapRegion = {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
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