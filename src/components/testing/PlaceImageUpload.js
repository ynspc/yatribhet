import React, {useState} from "react";

import { IMAGE_UPLOAD_ROUTES } from '../../constants/urls';
import AxiosHandler from "../../apis/AxiosHandler";
const apiCalls = new AxiosHandler();

export default function PlaceImageUpload() {
    const [formState, setFormState] = useState({
        placeIdentifier: "",
        type: "",
        places: ""
    });
    const [fileUpload, setFileUpload] = useState("");

    const handleChange = (event) => {
        event.persist();

        setFileUpload(event.target.files);

        setFormState(formState => ({
            ...formState,
            [event.target.name]: event.target.value
        }))
    };

    const handleInputChange = (event) => {
        event.persist();

        setFormState(formState => ({
            ...formState,
            [event.target.name]: event.target.value
        }))
    };

    const whenFileNotSelected = () => {
        return false;
    };

    const handlePlaceUploadSubmission = async (event) => {
        event.preventDefault();

        let sendForm = new FormData();
        for ( let file of fileUpload) {
            sendForm.append('place_images', file);
        }
        sendForm.append('identifier', formState.placeIdentifier);
        sendForm.append('type', formState.type);
        const response = await apiCalls.patch( IMAGE_UPLOAD_ROUTES.UPLOAD, sendForm );
        console.log(response);
    };



    return (
        <>
            <form method="post" action="#" onSubmit={handlePlaceUploadSubmission} encType="multipart/formdata">
                <div>
                    <label htmlFor="placeIdentifier">Place Identifier:</label>
                    <input
                        type="text"
                        name="placeIdentifier"
                        value={formState.placeIdentifier}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="type">Type:</label>
                    <input
                        type="text"
                        name="type"
                        value={formState.type}
                        onChange={handleInputChange}
                    />
                </div>

                <div>
                    <label htmlFor="">Read Places File:</label>
                    <input
                        type="file"
                        multiple
                        name="places"
                        value={formState.places}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input disabled={whenFileNotSelected()} type="submit" name="submitFile" value="SEND"/>
                </div>
            </form>
            <hr/>
        </>
    );
}