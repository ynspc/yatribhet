import mongoose from 'mongoose';

const schema = mongoose.Schema;

const permissionSchema = new schema({

});

const permissionModel = mongoose.Model('Permission', permissionSchema);

export default permissionModel;
