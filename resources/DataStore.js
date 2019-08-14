import LocationService from './LocationService';
import EventEmitter from 'react-native/'

class DataStore {
    locationCheckInterval = null;
    userLocation = null;

    getUserLocation() {
        if (this.userLocation === null) {
            // Check user location and resolve promise only once location
            // has been captured
            let locationPromise = new Promise((resolve, reject) => {
                    this.locationCheckInterval = setInterval(() => {
                       if (this.userLocation) {
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
        this.userLocation = newLocation;
    }

    /* Method stops interval's execution */ 
    terminateInterval() {
        clearInterval(this.locationCheckInterval);
    }
}

export default new DataStore();
