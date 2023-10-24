import React, { useContext, useEffect, useReducer, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import ModalPopupComponent from '../components/ModalPopupComponent';
import defaultImage from '../media/images/default_profile_img.jpg';
import AlertComponent from '../components/AlertComponent';


const ProfilePage = () => {

    const { updateUser, fetchUser } = useContext(AuthContext);

    const [profileFormData, setProfileFormData] = useState(null);

    const initialState = {
        data: null,
        modal: false,
        alert: { open: false, theme: '', content: '' }
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_USER_DATA_SUCCESS':
                return { ...state, data: action.data };
            case 'FETCH_USER_DATA_FAILURE':
                return { ...state, data: null };
            case 'PROFILE_UPDATE_SUCCESS':
                return { ...state, data: action.data, alert: action.alert };
            case 'PROFILE_UPDATE_FAIL':
                return { ...state, alert: action.alert };
            case 'TOGGLE_MODAL':
                return { ...state, modal: !state.modal };
            case 'TOGGLE_ALERT':
                return { ...state, alert: action.alert };
            default:
                return { ...state };
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const toggleModalPopup = () => dispatch({ type: 'TOGGLE_MODAL' });

    const toggleAlert = (open = false, theme = '', content = '') => dispatch({ type: 'TOGGLE_ALERT', alert: { open: open, theme: theme, content: content } });

    const handleProfileFormDataChange = (e) => {
        const { type, name } = e.target;
        if (type === 'file') {
            const newFileData = e.target.files[0];
            setProfileFormData({ ...profileFormData, [name]: newFileData });
        } else {
            const { value } = e.target;
            const newProfileFormData = { ...profileFormData, [name]: value };
            setProfileFormData({ ...newProfileFormData });
        }
    }

    const profileUpdateRequest = async (event) => {
        event.preventDefault();

        const response = await updateUser(profileFormData);
        toggleModalPopup();

        switch (response.status) {
            case 200:
                dispatch({
                    type: 'PROFILE_UPDATE_SUCCESS',
                    data: { ...response.data },
                    alert: { open: true, theme: 'success', content: response.message }
                });
                setProfileFormData({ ...response.data, avatar: '' });
                break;
            default:
                dispatch({
                    type: 'PROFILE_UPDATE_FAIL',
                    alert: { open: true, theme: 'danger', content: `Sorry, an unknown error has occured` }
                });
                break;
        }
    }

    const fetchUserRequest = async () => {
        const response = await fetchUser();
        if (response.status === 200) {
            dispatch({
                type: 'FETCH_USER_DATA_SUCCESS',
                data: { ...response.data }
            });
            setProfileFormData({ ...response.data, avatar: '' });
        }
    }

    useEffect(() => {
        fetchUserRequest();
    }, [])

    return (
        <div>
            {state.alert.open && <AlertComponent theme={state.alert.theme} content={<>{state.alert.content}</>} handleClose={() => toggleAlert()} WW></AlertComponent>}

            {state.modal && <ModalPopupComponent
                content={<>
                    <div className="form-wrapper d-flex z-highest">
                        <form className="custom-form" onSubmit={profileUpdateRequest} encType="multipart/form-data">
                            <div className="d-flex jc-c">
                                {profileFormData.avatar ? <img height='100px' width='100px' src={URL.createObjectURL(profileFormData.avatar)} className='preview-picture' alt="user profile" /> : <>
                                <h1 className='font-14'>Update Profile Details</h1></>}
                            </div>
                            <div className="custom-form-control">
                                <label htmlFor='avatar' className='custom-form-label font-14'> Avatar </label>
                                <input className='custom-form-field' type="file" id="avatar" name="avatar" onChange={handleProfileFormDataChange} required />
                            </div>
                            <div className="custom-form-control">
                                <label htmlFor='birth_date' className='custom-form-label font-14'> First Name </label>
                                <input className='custom-form-field' value={profileFormData.first_name ? profileFormData.first_name : ''} type="text" id="first_name" name="first_name" onChange={handleProfileFormDataChange} required />
                            </div>
                            <div className="custom-form-control">
                                <label htmlFor='birth_date' className='custom-form-label font-14'> Last Name </label>
                                <input className='custom-form-field' value={profileFormData.last_name ? profileFormData.last_name : ''} type="text" d="last_name" name="last_name" onChange={handleProfileFormDataChange} required />
                            </div>
                            <div className="custom-form-control">
                                <label htmlFor='bio' className='custom-form-label font-14'> Profile Bio </label>
                                <textarea className='custom-form-textarea' value={profileFormData.bio ? profileFormData.bio : ''} type="text" id="bio" name="bio" onChange={handleProfileFormDataChange} required ></textarea>
                            </div>
                            <div className="custom-form-control">
                                <label htmlFor='birth_date' className='custom-form-label font-14'> Date of Birth </label>
                                <input className='custom-form-field' value={profileFormData.birth_date ? profileFormData.birth_date : '1980-01-01'} type="date" id="birth_date" name="birth_date" onChange={handleProfileFormDataChange} required />
                            </div>
                            <div className="custom-form-control form-links">
                                <label className="form-links-label font-12"></label>
                                <button type="submit" className="btn-secondary">Update Profile</button>
                                <div className="d-flex jc-sb font-12"></div>
                            </div>
                        </form>
                    </div>
                </>}
                handleClose={toggleModalPopup}
            />}

            {state.data ?
                (
                    <div className='wrapper-basic-profile-card'>
                        <div className='basic-profile-card-up'>
                            <div className='edit-icon'>
                                <span className='material-symbols-outlined' onClick={toggleModalPopup} >edit_square</span>
                            </div>
                            <div className="wrapper-profile-picture">
                                {state.data.avatar ? <img src={state.data.avatar} className='profile-picture' alt="user profile" /> : <img src={defaultImage} className='profile-picture' alt="user profile" />}
                            </div>
                            <div className='wrapper-basic-profile-card-content'>
                                <div className='headline font-14'>
                                    {state.data.first_name} {state.data.last_name}
                                </div>
                                <div className='sub-headline font-12'>
                                    {state.data.email}
                                </div>
                            </div>
                            <div className='font-14 content'>
                                {state.data.birth_date ? state.data.birth_date : 'Please enter your birth date'}
                            </div>
                            <div className="font-12 content">
                                {state.data.bio ? state.data.bio : 'Please add a bio about yourself'}
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div className='wrapper-basic-profile-card'>
                        <div className='basic-profile-card-up'>
                            <div className='edit-icon'>
                                <span className='material-symbols-outlined' onClick={toggleModalPopup} ></span>
                            </div>
                            <div className="wrapper-profile-picture">
                                <img src={defaultImage} className='profile-picture' alt="user profile" />
                            </div>
                            <div className='wrapper-basic-profile-card-content'>
                                <div className='headline font-14'>
                                    Loading Name Details...
                                </div>
                                <div className='sub-headline font-12'>
                                    Loading e-mail address Details...
                                </div>
                            </div>
                            <div className='icons'>
                                <div>
                                    Crunching your numbers...
                                </div>
                            </div>
                            <div className="font-12 content">
                                Loding your profile Bio . Please wait ...
                            </div>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default ProfilePage;

