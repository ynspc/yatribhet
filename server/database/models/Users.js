import mongoose from 'mongoose';
import { enumerations } from '../../helpers/enumerations';
import {
    HashPassword,
    CompareHashWith,
    MakeDomainLowerCaseOfEmail
} from '../../helpers/common-scripts';
import {
    REGISTER
} from '../../helpers/constants/server-messages';
import { enums } from '../../helpers/constants/database';
import { projections } from '../../helpers/projections/projection';

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        userName: { type: String, required: false, unique: true },
        //strictly available only in the case of the normal signup
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        middleName: { type: String, default: null },
        lastName: { type: String, default: null },
        gender: { type: String, enum: enumerations.Gender, required: true },

        coverPhoto: { type: String, default: null },
        profilePicture: { type: String, default: null },
        address: { type: String, default: null },//paid service
        contactNumber: { type: String, default: null },

        registeredFrom: { type: String, enum: enumerations.RegisteredFrom, default: enums.REGISTERING_DEVICES.APP },
        status: { type: Number, enum: enumerations.UserStatus, default: 1 },//to be changed, handled from email
        hasProfileSetupCompleted: { type: Boolean, default: false },

        emailVerifiedAt: { type: Date, default: null },
        emailTokenUuid: { type: String, default: null },
        emailVerificationExpiry: { type: Date, default: null },

        notificationBadge: { type: Number, default: 0 },
        facebookAccessToken: { type: String, default: null },

        termsAndConditionAcceptedAt: { type: Date, default: null },
        privacyPolicyAcceptedAt: { type: Date, default: null },

        locale: { type: String, default: 'en' },
        favouriteTags: { type: [ { type: 'ObjectId', ref: 'tags' } ], default: [] },
        isFirstTimeLogin:{ type: Boolean, default: true }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    this.email = MakeDomainLowerCaseOfEmail(this.email)
    const isAlreadyExists = await this.model('User').findOne({ email: this.email });
    if( isAlreadyExists ) {
        let error = new Error(REGISTER.EMAIL_EXISTS.message);
        error.status = REGISTER.EMAIL_EXISTS.httpCode;
        return next(error);
    }

    this.password = await HashPassword(this.password);
    next();
});

userSchema.statics.didPasswordMatch = async function(password, hashedPassword) {
    return await CompareHashWith(password, hashedPassword);
};

userSchema.statics.details = async function(userId) {
    let stages = [];
    stages.push({
        $match: {
            _id: userId
        }
    });

    stages.push({
        $project: { ...projections.USER.PROFILE }
    });

    let userInformation = await this.aggregate(stages);
    userInformation = userInformation.length === 1 ? userInformation.pop() : {};

    return userInformation;
};


const user = mongoose.model('User', userSchema);

export default user;
