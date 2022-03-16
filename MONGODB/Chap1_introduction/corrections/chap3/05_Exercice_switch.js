db.inventory.updateMany(
    { tags: { $exists: true } },
    [{
        $set: {
            'label': {
                $switch: {
                    branches: [
                        { case: { $gt: [ { $size: "$tags" }, 3 ] }, then: 'AA' },
                        { case: { $gt: [ { $size: "$tags" }, 1 ] }, then: 'A' },
                    ],
                    default: 'B'
                }
            }
        }
    }]
)