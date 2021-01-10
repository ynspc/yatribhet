import HJoi from '@hapi/joi';
import { enums } from '../helpers/constants/database';

module.exports = {
    validationSchemas: {

        create: HJoi.object().keys({
            title: HJoi.string().trim().max(25).required().label('Title'),
            name: HJoi.string().trim().max(50).required().label('Provider Name'),
            designation: HJoi.array().required().label('Designations'),
            address: HJoi.string().trim().max(50).required().label('Address'),
            logo: HJoi.string().uri().trim().max(200).required().label('Provider Logo'),
            zip: HJoi.string().trim().required().label('Zip Code'),
            contact: HJoi.string().trim().max(15).required().label('Contact'),
            email: HJoi.string().trim().max(50).required().label('Email'),
            registrationNumber: HJoi.string().trim().max(25).required().label('Registration Number'),
            status: HJoi.bool().required().label('Status'),
            openingBalance: HJoi.object().keys({
                balanceType: HJoi.string().valid(enums.BALANCE_TYPE.CREDIT, enums.BALANCE_TYPE.DEBIT).label('Balance Type'),
                amount: HJoi.number().min(1).required().label('Amount')
            }).and('coordinates').required().label('Opening Balance'),
            deletedAt: HJoi.date().allow(null).label('Deleted Period'),
        })
    }
};
