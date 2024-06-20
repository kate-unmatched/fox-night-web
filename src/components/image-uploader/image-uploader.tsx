import { useState, useRef, FC, SyntheticEvent, useEffect } from "react";
import DefaultImage from "../../assets/default-image.jpg";
import UploadingAnimation from "../../assets/uploading.gif";
import classNames from "classnames";
import { ImageUploaderProps } from "./types";

import styles from "./styles.module.scss";
import { updatePhoto } from "../../api/api.users";

export const ImageUploader: FC<ImageUploaderProps> = ({ className, id, photo }) => {
    const [avatarURL, setAvatarURL] = useState(DefaultImage);
    useEffect(()=> {
        if(photo) {
            const imageUrl = transformPath(photo) ;

            setAvatarURL(imageUrl)
        
        }
    },[photo])
    const fileUploadRef = useRef<HTMLInputElement | null>(null);
    const handleImageUpload = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!!fileUploadRef.current) {
            fileUploadRef.current.click();
        }
    };
    const transformPath = (path: string) => {
        const urlPath = path.replace(/\\/g, '/').replace('C:/employee_pictures/', 'http://localhost:8084/employee_pictures/');
        return urlPath;
    };
    const uploadImageDisplay = async () => {
        try {
            if (
                !!fileUploadRef.current?.files &&
                fileUploadRef.current?.files.length !== 0
            ) {
                setAvatarURL(UploadingAnimation);

                const uploadedFile = fileUploadRef.current.files[0];

                const formData = new FormData();

                formData.append("photo", uploadedFile);
                const response = !!id ? await updatePhoto(id, uploadedFile) : await fetch(
                    "https://api.escuelajs.co/api/v1/files/upload",
                    {
                        method: "post",
                        body: formData,
                    }
                );

                if (response instanceof Response) {
                    if (response.status === 201) {
                        const data = await response.json();
                        const imageUrl = data?.location ? transformPath(data?.location) : data?.location ;
                        setAvatarURL(imageUrl);
                    }
                }
                else {
                    if (response.result === true) {
                        const data = await response.data;
                        const imageUrl = data?.photo ? transformPath(data.photo) : data.photo ;
                        setAvatarURL(imageUrl);
                    }
                }
                
            }
        } catch (error) {
            console.log(error);
            !!photo ? setAvatarURL(photo) : setAvatarURL(DefaultImage);
        }
    };

    return (
        <div className={classNames(className, styles.image)}>
            <form
                id="form"
                encType="multipart/form-data"
                className={styles.image_form}
            >
                <img
                    onClick={handleImageUpload}
                    src={avatarURL}
                    alt="Avatar"
                    className={styles.image_avatar}
                />
                <input
                    type="file"
                    id="file"
                    ref={fileUploadRef}
                    onChange={uploadImageDisplay}
                    hidden
                />
            </form>
        </div>
    );
};
