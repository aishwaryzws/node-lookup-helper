const custom_lookup = (collection, main_collection_key, lookup_collection_key, as_key, project = []) => {

    var pipeline = [];
    pipeline.push({
        $match: {
            $expr: {
                $eq: ["$" + lookup_collection_key, "$$lookup_collection_key"]
            },
        }
    })

    if (project && project.length) {
        var project_key = {}
        project.forEach(function (e) {
            project_key[e] = 1;
        })
        pipeline.push({
            $project: project_key
        })
    }

    return {
        $lookup: {
            from: collection,
            let: {
                "lookup_collection_key": "$" + main_collection_key,
            },
            pipeline: pipeline,
            "as": as_key
        }
    }
}

const custom_unwind = (as_key) => {
    return {
        $unwind: {
            path: "$" + as_key,
            preserveNullAndEmptyArrays: true
        }
    }
}

module.exports = {
    custom_lookup,
    custom_unwind
}
