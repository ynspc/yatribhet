import mongoose from 'mongoose';

import { enumerations } from '../../helpers/enumerations';

const pageSchema = new mongoose.Schema(
    {
        slug: { type: String, enum: enumerations.PageSlug, required: true },
        title: { type: String, required: true },
        content: { type: String, required: true },
        status: { type: Boolean, default: true },
        contentModifiedAt: { type: Date, default: null }
    },
    {
        timestamps: true
    }
);

pageSchema.statics.findBySlug = async function(slug) {
    return await this.findOne({ slug: slug });
};

pageSchema.statics.getPages = function( options ) {
    let stages = [];
    let filter;
    options = options || {};

    /*1. filter stage*/
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

    if (typeof options.sortBy === 'string' && options.sortBy.length > 0) {
        stages.push({
            $sort: {
                [options.sortBy]: options.sortDesc ? -1 : 1
            }
        });
    }

    stages.push({
        $project: {
            slug: 1,
            title: 1,
            status: 1,
            content: 1,
            contentModifiedAt: 1
        }
    });

    return this.aggregate(stages);
};

const pageModel = mongoose.model('Page', pageSchema);

export default pageModel;
