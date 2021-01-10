const mongoose = require('mongoose');
import { enumerations } from '../helpers/enumerations';

const provider = {
    openingBalanceSchema: new mongoose.Schema({
        balanceType: { type: String, enums: enumerations.BalanceType, required: true },
        amount: { type: Number, default: 0 }
    })
}

export {
    provider
};
