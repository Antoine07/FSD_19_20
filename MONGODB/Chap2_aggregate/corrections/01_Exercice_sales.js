// 01. A partir des données ci-dessus calculer le total des prix des restaurants par agence.

db.sales.aggregate([
  {
    $group: {
      _id: "$agency",
      totalPrice: { $sum: "$price" },
    },
  },
]);

// 02. Quels sont les totaux dans ce regroupement qui sont supérieurs ou égaux à 950000 ?
db.sales.aggregate([
  
  {
    $group: {
      _id: "$agency",
      totalPrice: { $sum: "$price" },
    },
  },

  {
    $match: {
      totalPrice: { $gte: 950_000 }
    }
  },

  {
    $project: {
      _id: 0,
      totalPrice: 1,
      agency: '$_id'
    }
  }

]);