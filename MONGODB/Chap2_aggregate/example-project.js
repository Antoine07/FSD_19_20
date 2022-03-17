const query = db.inventory.aggregate([

    { $project: {
        created_at: 1,
        expired_at: 1,
        expireInDays: 1,

        diffInDays: {
            $toInt: {
                $dateDiff: {
                    startDate: '$created_at',
                    endDate: '$expired_at',
                    unit: 'day'
                }
            }
        }
    } }

]);

console.log(query);
