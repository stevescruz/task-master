function getObjectProperties(propertiesArray, object) {
    const propertiesNoDuplicates = new Set(propertiesArray);
    const selectedObject = [...propertiesNoDuplicates].reduce((acc, property) => {
        if (property in object) {
            acc[property] = object[property];
            return acc;
        }

        return acc;
    }, {});

    if(Object.keys(selectedObject).length === 0) {
        return null;
    } else {
        return selectedObject;
    }
}

module.exports = getObjectProperties;