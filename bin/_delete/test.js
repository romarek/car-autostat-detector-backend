const listAllAttributes = [
    ['type', 'VehicleType'],
    ['make', 'Make'],
    ['model', 'ModelGroup'],
    ['yearBegin', 'Year'],
    ['yearEnd', 'Year'],
    ['auction', 'ModelGroup'],
    ['dateBegin', 'CreateDateTime'],
    ['dateEnd', 'CreateDateTime'],
    ['region', 'LocationCountry'],
    ['state', 'LocationState']
];

let listAttributesArray = [];

for (let i = 0; i < listAllAttributes.length; i++) {
    const conditional = listAllAttributes[i][0] ? listAllAttributes[i][1] : null;
    listAttributesArray = [...listAttributesArray, conditional];
}

// listAttributesArray = '\'' + listAttributesArray.join("', '") + '\'';
// listAttributesArray = listAttributesArray.replace(/\\"/, '');

console.log(listAttributesArray);