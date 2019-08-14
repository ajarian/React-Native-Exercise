import LocationService from './LocationService';
import EventEmitter from 'react-native/'

class DataStore {
    // Array of revelant events {name, address, type, location}
    locationCheck = null;
    locationUpdated = EventEmitter
    placesList = null;
    userLocation = null;

    getUserLocation() {
        if (this.userLocation === null) {
            LocationService.findUserLocation();
            
            // Check user location and resolve promise only once location
            // has been captured
            let locationPromise = new Promise((resolve, reject) => {
                    this.locationCheck = setInterval(() => {
                       if (this.userLocation) {
                            console.log('has value');
                            resolve(this.userLocation);
                            this.terminateInterval();
                        }
                    }, 5000);
                });

            return locationPromise;
        } else {
            return this.userLocation;
        }
    }

    setUserLocation(newLocation) {
        console.log(newLocation);
        this.userLocation = newLocation;
    }

    terminateInterval() {
        clearInterval(this.locationCheck);
    }

    getNearbyPlaces() {
        return this.placesList;
    }

    setNearbyPlaces(newPlaces) {
        this.placesList = newPlaces;
    }
}

export default new DataStore();