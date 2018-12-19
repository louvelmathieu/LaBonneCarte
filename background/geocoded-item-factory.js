class GeocodedItemFactory {
    constructor(geocodeAPI) {
        this.geocodeAPI = geocodeAPI;
    }

    makeGeocodedItemFromItem(item) {
        return new Promise(resolve => {
            this.geocodeAPI.getGeocode(item.location).then(geocode => {
                resolve(new GeocodedItem(item, geocode))
            });
        });
    }

    makeGeocodedItemsFromItems(items) {
        return new Promise(resolve => {
            var promises = items.map(item => this.makeGeocodedItemFromItem(item));
            Promise.all(promises).then(geocodedItems => {
                resolve(geocodedItems);
            })
        });
    }
}