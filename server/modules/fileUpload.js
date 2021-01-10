/**
 * For now this helper function stores files inside the
 * temp folder of the system dir
 *
 * */

import multer from 'multer';
import fs from "fs";
import path from "path";

export default class FileUpload {

    constructor(folderName, isTemporary = true) {
        folderName = folderName.toLowerCase();
        const folderPath = isTemporary ? global.TEMP_FOLDER : global.SYSTEM_FOLDER;
        if ( !fs.existsSync(`${folderPath}/${folderName}`) )
            fs.mkdirSync(`${folderPath}/${folderName}`);

        this.destinationFolder = `${folderPath}/${folderName}`;
    }

    singleUpload(fileName, request, response, config ) {
        return new Promise((resolve, reject) => {
            this._uploadFile(request, config)
                .single(fileName)
                (request, response, function (error) {
                    if ( !error )
                        return resolve(request.file);

                    return reject(error);
                })
        })
    }

    multipleUpload(fileName, request, response, config) {
        return new Promise((resolve, reject) => {
            this._uploadFile(request, config)
                .array(fileName)
                (request, response,function (error) {
                    if ( !error )
                        return resolve(request.files);

                    return reject(error);
                })
        });
    }

    _uploadFile(request, { allowedExtension }) {
        return multer({
            storage: this._storage(),
            fileFilter: function (request, file, callback) {
                const extension = path.extname(file.originalname);
                 if( !allowedExtension.extensions.includes(extension) ) {
                     callback(null, false);
                     let err = new Error(allowedExtension.message);
                     err.code = 400;
                     return callback(err);
                 }
                callback(null, true)
            },
            /*limits:{
                fileSize: 1024 * 1024
            }*/
        });
    }

    _storage() {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `${this.destinationFolder}/`);
            },
            filename: (req, file, cb) => {
                const currentTime = new Date().getTime();
                const extension = path.extname(file.originalname);
                cb(null, `${currentTime}${extension}`);
            }
        })
    }

}
