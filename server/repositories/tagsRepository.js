import TagModel from "../database/models/Tags";
import CsvFileTrackerModel from "../database/models/helpers/csvFileTracker";

const storeTags = async (tagList, uploadObject) => {
    let uploadedResult = {
        model: "tags",
        uploadedFileName: uploadObject.originalname,
        totalProcessingTime: 0,
        uploadedFrom: "browser name needed for sessions",
        totalRows: tagList.length,
        totalEmptyRows: 0,
        totalInsertedRows: 0,
        totalCorruptedRows: 0,
        totalDuplicateRows: 0,
        corruptedData: [],
        duplicatedData: []
    };
    let insertCount = 0;
    let duplicateCount = 0;
    let duplicateData = [];

    if ( tagList.length === 0 )
        return 0;

    for ( const tag of tagList ) {
        const tagFound = await TagModel.findOne({ name: tag.name });
        if ( tagFound ) {
            duplicateCount++;
            duplicateData.push({
                rowPosition: 0,
                columnPosition: 0,
                reason: `Tag with name ${tagFound.name} was already stored.`
            });
        }
        else {
            insertCount++;
            const tagDataModel = new TagModel(tag);
            await tagDataModel.save();
        }
    }

    uploadedResult.totalDuplicateRows = duplicateCount;
    uploadedResult.totalInsertedRows = insertCount;
    uploadedResult.duplicatedData = duplicateData;

    const tracker = new CsvFileTrackerModel(uploadedResult);
    await tracker.save();

    return uploadedResult;
};

const listTags = async () => {
    return TagModel.find({}, {_id:1,name:1});
};

const getTagByNames = async tagNames => {
    return TagModel.aggregate([
        {
            $match: {
                name: {
                    $in: tagNames
                }
            }
        },
        {
            $project: {
                _id: 1
            }
        }
    ]);
}
export default {
    storeTags,
    listTags,
    getTagByNames
};
