/**
 * 
01 Calculez le nombre d'hommes et de femmes dans la collection sportif à l'aide du Pattern MapReduce.
 */

// 1. Calculez le nombre d'hommes et de femmes dans la collection sportif
db.sportif.aggregate(
    { $unwind: "$Sexe"},
    { $project: { emits: { key:"Sexe", value: 1 } } },
    { $group: { _id: null, count: { $sum: 1 } } }
);

// 2. Calculer le nombre d'hommes d'un côté et le nombre de femmes.
db.sportif.aggregate([
    {
       $project:
         {
           Sexe: { $toUpper: "$Sexe" }
         }
     },
    { $group: { _id: "$Sexe", count: { $sum: 1 } } }
]);

/**
 * 02 Trouvez tous les noms des sportifs qui ne pratiquent pas de sport. Vous pouvez pour cela utiliser l'opérateur suivant $exists : false
 * Calculez le n
 */

db.sportif.aggregate(
    { $match : { Sports :  { $exists : false } }},
    { $project: { names: { $concat: [ "$Nom", " - " , "$Prenom"] } , _id : 0} },
);

// 03 Calculez le nombre de sportifs jouant pour chaque sport. 

db.sportif.aggregate(
    { $unwind: "$Sports.Jouer"},
    { $project: { emits: { sport :"$Sports.Jouer", value: 1 }, _id : 0 } },
    { $group: { _id: "$emits.sport", count: { $sum: 1 } } }
);

/**
 * 04 Gymnases 
 */

// - Calculez le nombre de gymnases pour chaque ville.

db.gymnase.aggregate(
    { $match : { NomGymnase : { $exists : true } }},
    { $group: { _id: "$Ville", count: { $sum: 1 } } }
);
