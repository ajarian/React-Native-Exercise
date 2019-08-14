import DataStore from './DataStore';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

class LocationService {
    findUserLocation = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        // Only obtain location if user grants permission
        if (status === 'granted') {
            // Apparently function is buggy and only actually runs callback if 
            // distanceInterval is set to 0m 
            Location.watchPositionAsync({accuracy: Location.Accuracy.High, distanceInterval: 0}, 
                (newLocation) => DataStore.setUserLocation(newLocation.coords));
        }
    }
}

export default new LocationService();
