import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const tagSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        icon: { type: String },
        color: { type: String },
        isPremium: { type: Boolean, default: false }
    },
    {
        timestamps: true
    }
);

tagSchema.plugin(mongoosePaginate);
tagSchema.plugin(mongooseAggregatePaginate);

tagSchema.statics.getTagByName = async function(tagName) {
    return this.findOne({ name: tagName });
};

tagSchema.statics.getTagFromArray = async function(tagNames) {
    let tagIds = [];
    for ( let tagName of tagNames ) {
        const tag =  await this.findOne({ name: tagName.trim().toLowerCase() });
        if ( !tag )
            console.log(`Tag to insert===${tagName.trim()}`)
        else
            tagIds.push(tag._id);
    }

    return tagIds;
};

tagSchema.statics.getTags = function(options) {
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
        $project: {
            name: 1,
            icon: 1,
            color: 1
        }
    })

    return this.aggregate(stages);
};

const tagModel = mongoose.model('Tag', tagSchema);

export default tagModel;
