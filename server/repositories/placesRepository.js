import PlaceModel from "../database/models/Places";
import TagModel from "../database/models/Tags";
import CsvFileTrackerModel from "../database/models/helpers/csvFileTracker";
import { isValidPlaceRow, fullURL, objectId } from "../helpers/common-scripts";
import { enums } from "../helpers/constants/database";

import path from 'path';
import sharp from 'sharp';

const storePlaces = async (placesList, uploadObject) => {
    let uploadedResult = {
        model: "places",
        uploadedFileName: uploadObject.originalname,
        totalProcessingTime: 0,
        uploadedFrom: "browser name needed for sessions",
        totalRows: placesList.length,
        totalEmptyRows: 0,
        totalInsertedRows: 0,
        totalCorruptedRows: 0,
        totalDuplicateRows: 0,
        corruptedData: [],
        duplicatedData: []
    };
    let insertCount = 0;
    let corruptedCount = 0;
    let duplicateCount = 0;
    let duplicateData = [];
    let corruptedData = [];

    if ( placesList.length === 0 )
        return 0;

    for ( const place of placesList ) {
        if ( !isValidPlaceRow(place) ){
            corruptedCount++;
            corruptedData.push({
                rowPosition: 0,
                columnPosition: 0,
                reason: `the row itself is not in correct format.`
            });
            continue;
        }

        const found = await PlaceModel.getPlaceBy({ name: place.name });

        if ( found ) {
            duplicateCount++;
            duplicateData.push({
                rowPosition: 0,
                columnPosition: 0,
                reason: `Place with name ${found.name} was already stored.`
            });
            continue;
        }

        insertCount++;

        if (place.parentCode) {
            const placeObject = await PlaceModel.getPlaceBy({myUniqueCode: place.parentCode});
            if ( !placeObject ){
                corruptedCount++;
                corruptedData.push({
                    rowPosition: 0,
                    columnPosition: 0,
                    reason: `unable to find the parent data.`
                });
                continue;
            }
            place.parent = placeObject._id;
        }

        if (place.tags) {
            const tags = place.tags.split(",");
            place.tags = await TagModel.getTagFromArray(tags);
        }

        place.location = {
            "coordinates": [
                place.latitude,
                place.longitude
            ]
        };

        console.log(place);

        const placeDataModel = new PlaceModel(place);
        await placeDataModel.save();
    }

    uploadedResult.totalDuplicateRows = duplicateCount;
    uploadedResult.totalCorruptedRows = corruptedCount;
    uploadedResult.totalInsertedRows = insertCount;
    uploadedResult.duplicatedData = duplicateData;
    uploadedResult.corruptedData = corruptedData;

    const tracker = CsvFileTrackerModel(uploadedResult);
    await tracker.save();

    return uploadedResult;
};

const uploadImages = async (identifier, type, uploadObject) => {

    const selectedPlace = await PlaceModel.findOne({ myUniqueCode: identifier });
    let updateObject;
    let images = [];

    if ( type === enums.UPLOAD_IMAGE_TYPE.DISPLAY_IMAGE ) {
        updateObject = {
            displayImage: fullURL(uploadObject[0].filename)
        };
    }
    else {
        for ( let data of uploadObject) {
            //upload the optimized image
            await sharp(data.path)
                .webp()
                .toFile(path.resolve(`${data.destination}`, 'sharp/', `${data.filename.split(".")[0]}.webp`));

            images.push(fullURL(data.filename));
        }
        updateObject = {
            images: [...selectedPlace.images, ...images]
        }

    }

    const updatedRecord = await PlaceModel.findOneAndUpdate(
        {
            myUniqueCode: identifier
        },
        {
            $set: updateObject
        },
        {
            new: true,
            useFindAndModify: false
        }
    );

    return updatedRecord;
};

const listRecommendedPlaces = async ({ tags }) => {
    let stages = [];
    stages.push({
        $match: {
            tags: { $in: tags }
        }
    })
    stages.push({
        $lookup: {
            from: 'tags',
            let: {"tags": "$tags"},
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $in: [ "$_id", "$$tags"]
                        }
                    }
                },
                {
                    $project: {
                        name: 1
                    }
                }
            ],
            as: "tags"
        }
    });
    stages.push({
        $limit: 10
    })
    return PlaceModel.aggregate(stages);
};

const placeDetail = async ( placeId ) => {
    return PlaceModel.findOne({ _id: placeId });
};

export default {
    storePlaces,
    uploadImages,
    listRecommendedPlaces,
    placeDetail
};
