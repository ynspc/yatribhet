import React, {useState} from "react";

import { CSV_ROUTES } from '../../constants/urls';
import AxiosHandler from "../../apis/AxiosHandler";
const apiCalls = new AxiosHandler();

export default function Csv() {
    /*useStyle|useEffect|useState*/
    const [formState, setFormState] = useState({
        places: ""
    });
    const [fileUpload, setFileUpload] = useState("");

    const handleChange = (event) => {
        event.persist();

        setFileUpload(event.target.files[0]);

        setFormState(formState => ({
            ...formState,
            [event.target.name]: event.target.value
        }))
    };

    const whenFileNotSelected = () => {
        return false;
    };

    const handlePlaceSubmission = async (event) => {
        event.preventDefault();

        const payload = {
            places: formState.places
        };

        let sendForm = new FormData();
        sendForm.append('places', fileUpload);

        const response = await apiCalls.post( CSV_ROUTES.PLACES, sendForm );

        console.log(response)

    };




    const [tagState, setTagState] = useState({
        tags: ""
    });

    const [tagFileUpload, setTagFileUpload] = useState("");

    const handleTagChange = (event) => {
        event.persist();

        setTagFileUpload(event.target.files[0]);

        setTagState(formState => ({
            ...formState,
            [event.target.name]: event.target.value
        }))
    };

    const handleTagSubmission = async (event) => {
        event.preventDefault();

        const payload = {
            tags: tagState.tags
        };

        let sendForm = new FormData();
        sendForm.append('tags', tagFileUpload);

        const response = await apiCalls.post( CSV_ROUTES.TAGS, sendForm );

        console.log(response);
    };



    return (
        <>
            <form method="post" action="#" onSubmit={handlePlaceSubmission} encType="multipart/formdata">
                <div>
                    <label htmlFor="">Read Places File:</label>
                    <input
                        type="file"
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
            <form method="post" action="#" onSubmit={handleTagSubmission} encType="multipart/formdata">
                <div>
                    <label htmlFor="">Read Tags File:</label>
                    <input
                        type="file"
                        name="tags"
                        value={tagState.tags}
                        onChange={handleTagChange}
                    />
                </div>

                <div>
                    <input disabled={whenFileNotSelected()} type="submit" name="submitFile" value="SEND"/>
                </div>
            </form>
        </>
    );
}