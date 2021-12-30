```js
const { custom_lookup, custom_unwind} = require('node-lookup-helper');
```

`User Collection Name With - user_collection`

| _id | name | email | status |
|----|----|----|----|
| ObjectId("61cc1341089ecb6f5307de6c") | Demo | demo@demo.com | ACTIVE |

<br/><br/>

`User favourite fruit Collection Name With - user_favourite_collection`

| _id | user_id | favourite_fruit | Status |
|----|----|----|----|
| ObjectId("61cc1060089ecb6f5307ddc3") | ObjectId("61cc1341089ecb6f5307de6c") | Apple | ACTIVE |
| ObjectId("61b19d0c7aa9361af2d5c747") | ObjectId("61cc1341089ecb6f5307de6c") | Orange | ACTIVE |

<br/><br/>

`Get multiple records in array from - user_favourite_collection` -
=
```js
custom_lookup("user_favourite_collection", "_id", "user_id", "user_favourite", ['_id','favourite_fruit'])
```
```js
const result = await user_collection.aggregate([
    {
        $match: {}
    },
    custom_lookup("user_favourite_collection", "_id", "user_id", "user_favourite", ['_id','favourite_fruit'])
]);
```
Result:
---
	_id : "61cc1341089ecb6f5307de6c",
	name : "Demo",
	email : "demo@demo.com",
	status : "ACTIVE"
	user_favourite : [
		{
			_id : ObjectId("61cc1060089ecb6f5307ddc3"),
			favourite_fruit : "Apple"
		},
		{
			_id : ObjectId("61b19d0c7aa9361af2d5c747"),
			favourite_fruit : "Orange"
		}
	]
---
--------------------------------------------------------------------------------------
`Get single record in object from - user_favourite_collection` -
=
```js
custom_lookup("user_favourite_collection", "_id", "user_id", "user_favourite", ['_id','favourite_fruit'])

custom_unwind("user_favourite")
```

```js
const result = await user_collection.aggregate([
    {
        $match: {}
    },
    custom_lookup("user_favourite_collection", "_id", "user_id", "user_favourite", ['_id','favourite_fruit']),
    custom_unwind("user_favourite")
]);
```

Result:
---
	_id : "61cc1341089ecb6f5307de6c",
	name : "Demo",
	email : "demo@demo.com",
	status : "ACTIVE"
	user_favourite : {
		_id : ObjectId("61cc1060089ecb6f5307ddc3"),
		favourite_fruit : "Apple"
	}
---