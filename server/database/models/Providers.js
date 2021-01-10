import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

import { provider } from '../../helpers/schemas';
// import { enums } from '../../helpers/constants/database';

const providerSchema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        name: {type: String, required: true},
        designation: {type: Array, enums:[], required: true},
        address: {type: String, required: true},
        logo: {type: String, default: null},
        zip: {type: String, default: null},
        contact: {type: Number, default: null},
        email: {type: String, default: null, unique: true},
        registrationNumber: {type: String, default: null},
        status: {type: Boolean, default: true},
        openingBalance: {type: provider.openingBalanceSchema, default: {}},
        deletedAt: { type: Date, default: null }
    },
    {
        timestamps: true
    }
);

providerSchema.plugin(mongoosePaginate);
providerSchema.plugin(mongooseAggregatePaginate);

providerSchema.statics.findByProviderId = async function(providerId) {
    return await this.findById(providerId);
};

providerSchema.statics.getProviders = function( options ) {
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
            logo: 1,
            name: 1,
            title: 1,
            email: 1,
            status: 1,
            deletedAt: 1,
            designation: 1,
            openingBalance: 1
        }
    });

    return this.aggregate(stages);
};

const providerModel = mongoose.model('Provider', providerSchema);

export default providerModel;
