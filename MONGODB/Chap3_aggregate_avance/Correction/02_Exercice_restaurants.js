// Collection restaurants
// Comptez le nombre de A par type de cuisine.
db.restaurants.aggregate([
    { $unwind: "$grades"},
    { $match : { "$grades.grade" : "A" } },
    { $group : { _id :"$cuisine" ,   count: { $sum: 1 } }}
])

db.restaurants.aggregate([
    { $match: { "grades.grade": "A" } },
    { $group: { _id: "$cuisine", count: { $sum: 1 } } }
])