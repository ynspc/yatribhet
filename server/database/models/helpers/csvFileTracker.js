import mongoose from 'mongoose';

const schema = mongoose.Schema;

const csvErrorSchema = new mongoose.Schema({
    rowPosition: { type: Number, required: true },
    columnPosition: { type: Number, required: true },
    reason: { type: String }
})

const csvFileTrackerSchema = new schema(
    {
        model: { type: String, enum: [ 'tags', 'places' ], required: true },
        uploadedFileName: { type: String, required: true },
        totalProcessingTime: { type: Number, required: true },
        uploadedFrom: { type: String, required: true },
        totalRows: { type: Number, required: true },
        totalEmptyRows: { type: Number, required: true },
        totalInsertedRows: { type: Number, required: true },
        totalCorruptedRows: { type: Number, required: true },
        totalDuplicateRows: { type: Number, required: true },
        corruptedData: { type: [ csvErrorSchema ], default:[] },
        duplicatedData: { type: [ csvErrorSchema ], default:[] },
        reason: { type: String }
    },
    {
    timestamps:true
    });

const csvFileTrackerModel = mongoose.model('fileTracker', csvFileTrackerSchema );

export default csvFileTrackerModel;
