const projections = {
    USER: {
        PROFILE: {
            email: 1,
            userName: 1,
            firstName: 1,
            middleName: 1,
            lastName: 1,
            gender: 1,
            coverPhoto: 1,
            profilePicture: 1,
            address: 1,
            contactNumber: 1,
            registeredFrom: 1,
            status: 1,
            hasProfileSetupCompleted: 1,
            notificationBadge: 1,
            locale: 1,
            createdAt: 1,
            updatedAt: 1,
            isFirstTimeLogin: 1
        }
    }
};

export {
    projections
};
