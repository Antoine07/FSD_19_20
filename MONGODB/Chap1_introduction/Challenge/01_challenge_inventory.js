// 1. Donnez le nombre d'entreprise(s) qui ont/a exactement 2 tags.
function exo1() {
    db.inventory.find({ tags: { $size: 2 }}).count();
}

// 2.Trouvez toutes les entreprises dont les deux premières lettres sont identiques.©
function exo2() {
    db.inventory.find({ society: /^Al{2}/i });
    db.inventory.find({ society: /^([a-z])\1/i });
}

// 3. Faites la somme des quantités par status.
function exo3() {
    
    let res = {};
    const cursor = db.inventory.find(
        { qty: { $exists: true } },
        { status: 1, qty: 1, _id: 0 }
    );

    cursor.forEach(({qty, status}) => {
        if (res[status] === undefined) {
            res[status] = 0;
        }

        res[status] += qty;

        
        // res[status] = (res[status]) ? res[status] + qty : qty;
        
    });
    console.log(res);
   

    // Solution en aggregate (Copyright Marie)
    /* db.inventory.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: "$qty" },
        },
      },
      { $sort: { count: -1 } },
    ]) */

    // [
    //   ({ _id: "D", count: 175 },
    //   { _id: "A", count: 139 },
    //   { _id: "B", count: 119 },
    //   { _id: "C", count: 15 })
    // ];

}

// 4. Hydratation : créez les champs created_at et expired_at pour chaque document de la collection inventory.
function exo4() {

    function randInt(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    db.inventory.find({}).forEach(({ _id }) => {
        const createdAt = _id.getTimestamp();
        const randomDays = 1000 * 3600 * 24 * randInt(5, 30);
        const expiredAt = new Date(createdAt.getTime() + randomDays);

        // console.log(createdAt, expiredAt, '(nb jours = ' + (randomDays / (1000 * 3600 * 24)) + ')')
        db.inventory.updateOne(
            { _id },
            {
                $set: {
                    created_at: createdAt,
                    expired_at: expiredAt
                }
            }
        );
    });
}

// 5. Ajoutez un champ qui calcule le nombre de jours qui reste avant la suppression du document.
function exo5() {
    console.log(
        db.inventory.updateMany(
            {},
            [{
                $set: {
                    expireInDays: {
                        $divide: [
                            { $subtract: ["$expired_at", "$created_at"] },
                            1000 * 3600 * 24
                        ]
                    }
                }
            }]
        )
    );
}
