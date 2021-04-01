function getObjectProperties(propertiesArray, object) {
    const propertiesNoDuplicates = new Set(propertiesArray);
    const filteredObject = [...propertiesNoDuplicates].reduce((acc, property) => {
        if (property in object) {
            acc[property] = object[property];
            return acc;
        }

        return acc;
    }, {});

    if(Object.keys(filteredObject).length === 0) {
        return null;
    } else {
        return filteredObject;
    }
}

module.exports = getObjectProperties;