import mongoose from 'mongoose';

const schema = mongoose.Schema;

const roleSchema = new schema({
    name: { type: String, required: true },
    description:{ type: String, required: true },
}, {
    timestamps:true
} );


const roleModel = mongoose.model('Role', roleSchema );

export default roleModel;
