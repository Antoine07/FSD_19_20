//  Liste d'Exercices
/**
 * 01. Combien y a t il de restaurants qui font de la cuisine italienne et qui ont eu un score de 10 au moins ?
 */

 db.restaurants.find({ cuisine: "Italian", "grades.score": 10 }).count(); // 378
 // Ou (selon l'interpretation de l'exo) :
 db.restaurants.find({ cuisine: "Italian", "grades.score": { $gte: 10} }).count(); // 982


 /**
  * Affichez également le nom, les scores et les coordonnées GPS de ces restaurants. Ordonnez les résultats par ordre décroissant sur les noms des restaurants.
  */
 
 db.restaurants
   .find(
     { cuisine: "Italian", "grades.score": 10 },
     { "grades.score": 1, "address.coord": 1, name: 1, _id: 0 }
   )
   .sort({ name: -1 })

// 03 Quels sont les restaurants qui ont eu un grade A et un score supérieur ou égal à 20 ? Affichez uniquement les noms et ordonnez les par ordre décroissant. Affichez le nombre de résultat.
db.restaurants
  .find(
    {
      "grades.grade": "A",
      "grades.score": { $gte: 20 },
    },
    { _id: 0, name: 1, "grades.grade": 1, "grades.score": 1 }
  )
  .sort({ name: -1 });

//  04. A l'aide de la méthode distinct trouvez tous les quartiers distincts de NY.
db.restaurants.distinct("borough");

// 05 Trouvez tous les types de restaurants dans le quartiers du Bronx. Vous pouvez là encore utiliser distinct et un deuxième paramètre pour préciser sur quel ensemble vous voulez appliquer cette close.
db.restaurants.distinct("cuisine", { borough: "Bronx" });

//  06 Trouvez tous les restaurants dans le quartier du Bronx qui ont eu 4 grades.
// $size calculer la taille de votre tableau
db.restaurants.find(
  { borough: "Bronx", grades: { $size: 4 } },
  { _id: 0, name: 1, "address.coord": 1 }
);

// 07. Sélectionnez les restaurants dont le grade est A ou B dans le Bronx.
db.restaurants
  .find({
    borough: "Bronx",
    $or: [{ "grades.grade": "A" }, { "grades.grade": "B" }],
  });

// 08. Même question mais, on aimerait récupérer les restaurants qui ont eu à la dernière inspection (elle apparaît théoriquement en premier dans la liste des grades) un A ou B. Vous pouvez utilisez la notion d'indice sur la clé 
db.restaurants.find(
  {
    borough: "Bronx",
    // 'grades.grade': { $in : ['A', 'B'] }
    $or: [{ "grades.0.grade": "A" }, { "grades.0.grade": "B" }],
  },
  { _id: 0, name: 1, "grades.$": 1 }
);

// 09. Sélectionnez maintenant tous les restaurants qui ont le mot "Coffee" ou "coffee" dans la propriété name du document. Puis, même question mais uniquement dans le quartier du Bronx.
db.restaurants.find(
  {
    name: /[cC]offee/,
    // name: { $regex: /[cC]offee/ },
    borough: "Bronx",
  },
  { name: 1, _id: 0, borough: 1 }
);

// 10. Trouvez tous les restaurants avec les mots Coffee ou Restaurant et qui ne contiennent pas le mot Starbucks. Puis, même question mais uniquement dans le quartier du Bronx.
db.restaurants
  .find(
    {
      // $and :[
      //   {name: /(coffee|restaurant)/i},
      //   {name: { $not: /starbucks/i }}
      // ]

      $and: [
        { name: { $in: [/coffee/i, /restaurant/i] } },
        // { $or: [{name: /coffee/i}, {name:/restaurant/i}] },
        { name: { $nin: [/starbucks/i] } },
        { borough: "Bronx" }, // Même question avec le quartier du bronx
      ],
    },
    { _id: 0, name: 1 }
  )
  .sort({ _id: -1 });

  // 11. Trouvez tous les restaurants qui ont dans leur nom le mot clé coffee, qui sont dans le bronx ou dans Brooklyn, qui ont eu exactement 4 appréciations (grades).

const query = db.restaurants.find(
  {
    name: /coffee/i,
    borough: { $in: ["Bronx", "Brooklyn"] },
    grades: { $size: 4 },
  },
  { _id: 0, name: 1, borough: 1, "grades.date": 1 }
);
console.log(query);

  // 12. Reprenez la question 11 et affichez tous les noms de ces restaurants en majuscule avec leur dernière date et permière date d'évaluation.

query.forEach(({ grades, name }) => {
  // console.log(grades);
  console.log(name.toUpperCase());
  console.log("First eval :", grades[3].date.toLocaleString());
  console.log("Last eval :", grades[0].date.toLocaleString());
  console.log("------------");
});

// FIN DES EXERCICES 

// ==================================================================
// Coords example :
// ==================================================================

// Nécessite au préalable de créer un index de type "2dsphere" sur le champs "address.coord" :
//  db.restaurants.createIndex({ 'address.coord' : '2dsphere' });

db.restaurants.find(
  {
    "address.coord": {
      $nearSphere: {
        $geometry: { type: "Point", coordinates: [-73.961704, 40.662942] },
        $maxDistance: 50, // 50 mètres (système metrique)
      },
    },
  },
  { _id: 0, "address.coord": 1 }
);