
// 01. Affichez tous les articles de type journal. Et donnez la quantité total de ces articles (propriété qty). Pensez à faire un script en JS.
function exo1() {
    let total = 0;

    db.inventory.find({
        type: 'journal'
    }, {_id:0, type:1, society:1, qty: 1})
    .forEach(item => {
        total += item.qty;
    });

    console.log('Total des quantités : ', total);
}

// 02. Affichez les noms de sociétés depuis 2018 avec leur quantité (sans agrégation)
function exo2() {
    const query = db.inventory.find(
        { year: { $gte: 2018 } },
        { _id: 0, society: 1, qty: 1, year: 1 }
    );

    console.log(query);
}

// 03. Affichez les types des articles pour les sociétés dont le nom commence par A.
function exo3() {
    const query = db.inventory.find(
        { society: /^A/i },
        { _id: 0, society: 1 }
    );

    console.log(query);
}

// 04. Affichez le nom des sociétés dont la quantité d'articles est supérieur à 45.
function exo4() {
    const query = db.inventory.find(
        { qty: { $gt : 45 } },
        { _id: 0, qty: 1, society: 1 }
    );

    console.log(query);
}

// 05. Affichez le nom des sociétés dont la quantité d'article(s) est strictement supérieur à 45 et inférieur à 90.
function exo5() {
    const query = db.inventory.find(
        {
            $and: [
                { qty: { $gt : 45 } },
                { qty: { $lt : 90 } }
            ]
        },
        { _id: 0, qty: 1, society: 1 }
    );

    console.log(query);
}

//6. Affichez le nom des sociétés dont le statut est A ou le type est journal.
function exo6() {
    const query = db.inventory.find(
        {
            $or: [
                { status: 'A'},
                { type: 'journal' }
            ]
        },
        { _id: 0, status: 1, society: 1, type: 1 }
    );
    console.log(query);
}

// 7. Affichez le nom des sociétés dont le statut est A ou le type est journal et la quantité inférieur strictement à 100.
function exo7() {
    const query = db.inventory.find(
        {
            $or: [
                { status: 'A'},
                { type: 'journal', qty: { $lt : 100 } },
            ]
        },
        { _id: 0, status: 1, society: 1, type: 1, qty: 1 }
    );
    console.log(query);
}

// 8. Affichez le type des articles qui ont un prix de 0.99 ou 1.99 et qui sont true pour la propriété sale ou ont une quantité strictement inférieur à 100.
function exo8() {
    const query = db.inventory.find(
        { $and: [
            { $or: [{ price: 0.99 }, { price: 1.99 }] },
            { $or: [{ sale: true }, { qty: { $lt: 45 } }] }
        ] }
    );

    console.log(query);
}

// 9. Affichez le nom des scociétés qui ont des tags.
function exo9() {
    const query = db.inventory.find(
        { tags: { $exists: true } },
        { _id: 0, tags: 1}
    );

    console.log(query);
}

// 10. Affichez le nom des sociétés qui ont au moins un tag blank.
function exo10() {
    const query = db.inventory.find(
        { tags: 'blank' },
        { _id: 0, tags: 1}
    );

    console.log(query);
}

exo10();
