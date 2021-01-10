import UserDevices from '../../database/models/UserDevices'

export const updateOrCreateUserDevices = async ( userId, deviceId, deviceType, deviceToken, accessToken, refreshToken, expiry ) => {
    await UserDevices.findOneAndUpdate(
        {
            user: userId,
            deviceId: deviceId,
            deviceType: deviceType
        },
        {
            $set: {
                deviceToken: deviceToken,
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiredAt: expiry
            }
        },
        {
            new: true,
            upsert: true,
            useFindAndModify: false
        }
    );
};

export const logoutDevices = async filterOption => {
    return UserDevices.findOneAndDelete(filterOption);
};
