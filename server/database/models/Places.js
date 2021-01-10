import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const locationSchema = new mongoose.Schema(
    {
        type: { type: String },
        coordinates: { type: [ Number, Number ], default: [] }
    }
);

const placeSchema = new mongoose.Schema(
    {
        country: { type: String, required: true },
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        popularName: { type: String },
        location: { type: locationSchema, required: true },
        displayImage: { type: String, default: null },
        images: { type: Array, default: null },
        placeType: { type: String, required: true },
        state: { type: String, required: true },
        zone: { type: String, required: true },
        district: { type: String, required: true },
        myUniqueCode: { type: String, required: true },
        parentCode: { type: String, default: null },
        tags: { type: [ { type: 'ObjectId', ref: 'tags' } ], required: true },
        famousRating: { type: Number },
        parent: { type: 'ObjectId', ref: 'places', default: null }
    },
    {
        timestamps: true
    }
);

placeSchema.plugin(mongoosePaginate);
placeSchema.plugin(mongooseAggregatePaginate);

placeSchema.statics.getPlaceBy = async function(searchObject) {
        return this.findOne(searchObject);
};

placeSchema.statics.getPlaces = function(options) {
        let stages = [];
        let filter;
        options = options || {};

        filter = {
                $match: {}
        }

        if (options.search) {
                filter.$match.name = {
                        $regex: options.search,
                        $options: 'i'
                };
        }

        stages.push(filter);
        
        stages.push({
                $sort: {
                        famousRating: -1
                }
        });

        stages.push({
                $sort: {
                        famousRating: -1
                }
        });

        stages.push({
                $lookup: {
                        from: 'tags',
                        let: {"tags": "$tags"},
                        pipeline: [
                                {
                                        $match: {
                                                $expr: {
                                                        $in: [ "$_id", "$$tags"]
                                                }
                                        }
                                },
                                {
                                        $project: {
                                                name: 1
                                        }
                                }
                        ],
                        as: "tags"
                }
        });

        /*3. sorting stage*/
        // if (typeof options.sortBy === 'string' && options.sortBy.length > 0) {
        //         stages.push({
        //                 $sort: {
        //                         [options.sortBy]: options.sortDesc ? -1 : 1
        //                 }
        //         });
        // }

        // stages.push({
        //         $sort: {
        //                 famousRating: -1
        //         }
        // });

       stages.push({
                $project: {
                       parentCode: 0,
                       myUniqueCode: 0,
                }
        });

        return this.aggregate(stages);
};

const placeModel = mongoose.model('Place', placeSchema);

export default placeModel;
