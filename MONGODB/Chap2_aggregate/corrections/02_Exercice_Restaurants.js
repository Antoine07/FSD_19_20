db.restaurants.aggregate([
	{
		$group:{
			_id:{
				"cuisine":"$cuisine",
				"borough":"$borough"
			},
			names:{ $push: { name: "$name", restaurants_id: "$restaurant_id"}}
		}
	},
	{
		$limit:2
	}
])


db.restaurants.aggregate([
	{	
		$match: {'names.cuisine':'Italian'}
	},
	{
		$group:{
			_id:{
				"borough":"$borough"
			},
			names:{ $push: { name: "$name"}}
		}
	}
	
])



db.restaurants.aggregate([
	{
		$unwind:"$grades"
	},
	{	
		$group: {
			_id: "$name", average_score:{ $avg: "$grades.score"}
		}
	},
	{
		$sort:{
			average_score: -1
		}
	}
	
])



db.restaurants.aggregate([
	{
		$unwind:"$grades"
	},
	{	
		$group: {
			_id: {"borough": "$borough"},
			average_score:{ $avg: "$grades.score"}
		},
		
	},
	{
		$sort:{
			average_score: -1
		}
	},
	{
		$limit : 5
	},
	{
		$out: "top5"
	}

])


db.restaurants.aggregate([
	{
		$match: {
			"grades.score":{
				$gte : 30
			}
		}
	},
	{
		$group: {
			_id: "$borough",
			totalResto: {
				$sum: 1
			},
			cuisines: { $addToSet: "$cuisine"}
		}
	},
	{
		$sort: {
			totalResto:-1
		}
	}
	
])


db.restaurants.aggregate([
	{
		$unwind: "$grades"
	},
	{
		$match: {
			"grades.score":{
				$gte : 70
			}
		}
	},
	{
		$group:{
			_id:{
				"borough":"$borough"
			},
			names:{
				$push:{
					name: "$name",
					average_score:{
						$avg: "$grades.score"
					}
				}
			}
		}
	},
	{
		$project:{_id: 1, names:1}
	}
])

