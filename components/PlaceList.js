import React from 'react';
import { FlatList, Text, View } from 'react-native';

import Credentials from '../resources/credential';
import DataStore from '../resources/DataStore';

export default class EventList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingData: true,
            pointsOfInterest: [], 
            radius: 5000
        };

        this.findPlaces = this.findPlaces.bind(this);
        this.formatPlaces = this.formatPlaces.bind(this);
        this.requestPlaceData = this.requestPlaceData.bind(this);
    }

    componentDidMount() {
        let userLocation = DataStore.getUserLocation();

        // Data store returns a promise if location hasn't yet been captured
        if (userLocation instanceof Promise) {
            userLocation.then((location) => {
                this.findPlaces(location);
            });
        } else {
            this.findPlaces(userLocation);
        }
    }

    /* Once location has been obtained, method makes requests for place data.
    *  Request is executed immediately then every 3 minutes
    */
    findPlaces(location) {
        this.requestPlaceData(location);
        setInterval(() => this.requestPlaceData(location), 30000);
    }

    /* Method creates list of items to supply flat list by iterating through
    *  search results 
    */
    formatPlaces(placeDataArray) {
        let pointsOfInterest = [];

        placeDataArray.forEach((place) => {
            pointsOfInterest.push({
               key: place.name,
               type: place.types[0],
               address: place.vicinity 
            });
        });

        this.setState({ 
            loadingData: false,
            pointsOfInterest: pointsOfInterest
        });
    }

    /* Method uses latitude and longitude to obtain JSON containing 
    *  nearby places from Google Place API
    */
    requestPlaceData(userLocation) {
        let googleURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?',
            location = `location=${userLocation.latitude},${userLocation.longitude}`,
            radius = `&radius=${this.state.radius}`,
            apiKey = `&key=${Credentials.key}`,
            requestURL = googleURL + location + radius + apiKey;

        fetch(requestURL)
        .then((response) => response.json())
        .then((responseJSON) => {
            this.formatPlaces(responseJSON.results);
        })
        .catch((error) => console.error(error));
    }

    render() {
        let noResults = !this.state.loadingData && this.state.pointsOfInterest === 0,
            resultsToDisplay = !this.state.loadingData && this.state.pointsOfInterest.length > 0;

        return(
            <View>
                { this.state.loadingData && 
                <Text>Loading Results</Text>
                }
                { noResults && 
                <Text>Sorry, there are no nearby points of interest.</Text>
                }
                { resultsToDisplay &&
                <View style={{marginTop:10}}>
                    <Text style={{fontWeight: 'bold'}}>
                        Name{'\n'}
                        <Text style={{fontStyle: 'italic'}}>Location Type</Text>{'\n'}
                        Address
                    </Text>
                    <FlatList
                        style={{width: 350, height: 400, marginTop: 30}} 
                        data={this.state.pointsOfInterest}
                        renderItem={({item}) => 
                            <View style={{marginBottom: 5}}>
                                <Text>
                                    {item.key}{'\n'}
                                    <Text style={{fontStyle: 'italic'}}>{item.type}</Text>{'\n'}
                                    {item.address}
                                </Text>
                            </View>
                        }/>
                </View>
                }
            </View>
        )
    }
}
