/**
 * 
1. Affichez la liste des restaurants dont le nom commence et se termine par une voyelle.

2. Affichez la liste des restaurants dont le nom commence et se termine par une même lettre. Vous ferez attention à ne pas récupérer dans votre requête les restaurants n'ayant pas de nom. 
 */

// /^[aeiou].*[aeiou]$/
// 1
db.restaurants.find({ name : /^[aeiou].*[aeiou]$/i }, { name: 1, _id : 0});

// 2
// \w <=> [a-zA-Z_0-9]
db.restaurants.find({ name : /^(\w).*\1$/i }, { name: 1, _id : 0});