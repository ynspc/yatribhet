import mongoose from 'mongoose';
import { enumerations } from '../../helpers/enumerations';

const schema = mongoose.Schema;

const userDeviceSchema = new schema({
    user: { type: 'ObjectId', ref: 'users', required: true },
    deviceType:{ type: Number, enum: enumerations.Device, required: true },
    deviceId: { type: String, required: true },
    deviceToken: { type: String, required: true },
    accessToken: { type: String, required: false },
    refreshToken: { type: String, required: false },
    expiredAt: { type: Number, default: 0 },
}, {
    timestamps:true
} );

const userDeviceModel = mongoose.model('Device', userDeviceSchema );

export default userDeviceModel;
