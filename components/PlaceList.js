import React from 'react';
import { FlatList, Text, View } from 'react-native';

import DataStore from '../resources/DataStore';

export default class EventList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pointsOfInterest: null
        };

        this.findPlaces = this.findPlaces.bind(this);
    }

    componentDidMount() {
        let userLocation = DataStore.getUserLocation();

        // Data store returns a promise if location hasn't been captured
        if (userLocation instanceof Promise) {
            userLocation.then((location) => {
                this.findPlaces(location);
            });
        } else {
            this.findPlaces(userLocation);
        }
    }

    findPlaces(location) {
        this.requestPlaceData(location);
        setInterval(() => this.requestPlaceData(location), 30000);
    }

    requestPlaceData(userLocation) {
        console.log('place check');
        let googleURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
            apiKey = '&key=AIzaSyBHrVemGoGRnAi-PYhWQd29xu2W57MRJMQ',
            location = `location=${userLocation.latitude},${userLocation.longitude}`
        let requestURL = googleURL + location + '&radius=8000' + '&rankby=distance' + apiKey;
        let nearbyEvents = null;

        fetch(requestURL)
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON.results);
            nearbyEvents = responseJSON.results;
        })
        .catch((error) => console.error(error));

        this.setState({
            searchResults: nearbyEvents
        });
    }

    render() {
        let events = [{key: 'Block Party'}, {key: 'Music Concert'}, {key: 'Restaurant Opening'}];
        // conditionally hide list if no events

        return(
            <View>
                <Text>Current Location: 
                </Text>
                <FlatList
                    style={{width: 150, height: 200, marginTop: 30}} 
                    data={events}
                    renderItem={({item}) => <Text>{item.key}</Text>}/>
            </View>
        )
    }
}