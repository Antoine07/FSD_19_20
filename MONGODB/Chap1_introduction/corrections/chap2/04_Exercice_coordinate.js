const coordinate = [-73.961704, 40.662942];
const METERS_PER_MILE = 1609.34;

const query = db.restaurants.find({
  "address.coord": {
    $nearSphere: {
                    $geometry: { type: "Point", coordinates: coordinate },
                    $maxDistance: 5 * METERS_PER_MILE,
                 },
  },
} , { _id: 0, name:1, borough: 1, 'address.coord':1 });

query.forEach(({name, borough, address:{coord}}) => {
  console.log('--------------------');
  console.log('Borough:', borough);
  console.log('Name:', name);
  console.log('Coordinates:', coord.reverse().join(','));
});