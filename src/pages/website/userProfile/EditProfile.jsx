import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Context } from '../../../ContextHolder';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../reducers/UserSlice';

const EditProfile = () => {
    const { apiUserBaseUrl,notify,  userDetails } = useContext(Context);
    const user = useSelector(store => store.user);
    const user_id = user?.data?._id;
    const navigator = useNavigate();
    const dispatcher = useDispatch();

    useEffect(
        () => {
            const lsUser = localStorage.getItem("user");
            if (!lsUser) {
                navigator("/login")
            }
        }, []
    )

    // useEffect(
    //     () => {
    //         profileGet(user_id);
    //     }, [user]
    // )

    function ProfileHandler(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const contact = e.target.contact.value;
        const bio = e.target.bio.value;
        const address = {
            street: e.target.address.value,
            city: e.target.city.value,
            state: e.target.state.value,
            pinCode: e.target.pin_code.value
        }; 
        const gender = e.target.gender.value;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("contact", contact);
        formData.append("bio", bio);
        formData.append("gender", gender);
        formData.append("address", JSON.stringify(address));
        axios.put(apiUserBaseUrl + "/edit-user/" + user_id, formData)
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        console.log(success.data);
                        // profileGet(user_id);
                        navigator("/profile")
                        notify(success.data.msg,success.data.status);
                    }
                }
            ).catch(
                (error) => {

                }
            )
    }

    function profileDeactive() {
        axios.patch(apiUserBaseUrl + "/deactivate-user/" + user_id)
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        navigator("/");
                        dispatcher(logout())
                    }
                }
            ).catch(
                (error) => {

                }
            )
    }

    function profileDelete() {
        axios.delete(apiUserBaseUrl + "/delete-user/" + user_id)
            .then(
                (success) => {
                    if (success.data.status === 1) {
                        navigator("/");
                        dispatcher(logout())
                    }
                }
            ).catch(
                (error) => {

                }
            )
    }

    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Update Profile
                    </h2>
                    <form encType='multipart/form-data' onSubmit={ProfileHandler}>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            <div
                                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                                id="user_avatar_help"
                            >
                                A profile picture is useful to confirm your are logged into your account
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={userDetails?.name}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type first name"
                                    required=""
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="lastName"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    defaultValue={userDetails?.lastName}
                                    id="lastName"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type your last name"
                                    required=""
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={userDetails?.email}
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="youremail@gmail.com"
                                    required=""
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="contact"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Contact
                                </label>
                                <input
                                    type="number"
                                    name="contact"
                                    id="contact"
                                    defaultValue={userDetails?.contact}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter your mobile number"
                                    required=""
                                />
                            </div>
                            <div className="w-full tablet:w-1/3 mb-6 tablet:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="gender"
                                >
                                    Gender
                                </label>
                                <div className="relative">
                                    <select
                                        name='gender'
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="gender"
                                    >
                                        <option value="0">Select</option>
                                        <option value="1" selected={userDetails?.gender === "1" ? true : false}>Male</option>
                                        <option value="2" selected={userDetails?.gender === "2" ? true : false}>Female</option>
                                        <option value="3" selected={userDetails?.gender === "3" ? true : false}>Others</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="address"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    defaultValue={userDetails?.address?.street}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Enter your address number"
                                    required=""
                                />
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-2">
                                <div className="w-full tablet:w-1/3 px-3 mb-6 tablet:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-city"
                                    >
                                        City
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-city"
                                        type="text"
                                        name='city'
                                        placeholder="Enter your city name"
                                        defaultValue={userDetails?.address?.city}
                                    />
                                </div>
                                <div className="w-full tablet:w-1/3 px-3 mb-6 tablet:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="state"
                                    >
                                        State
                                    </label>
                                    <div className="relative">
                                        <select
                                            name='state'
                                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="state"
                                        >
                                            <option value={null}>Select</option>
                                            <option value="rajathan" selected={userDetails?.address?.state === "rajathan" ? true : false}>Rajasthan</option>
                                            <option value="delhi" selected={userDetails?.address?.state ==="delhi" ? true : false}>Delhi</option>
                                            <option value="gujaraj" selected={userDetails?.address?.state === "gujaraj" ? true : false}>Gujarat</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg
                                                className="fill-current h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full tablet:w-1/3 px-3 mb-6 tablet:mb-0">
                                    <label
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="pin-code"
                                    >
                                        Pin Code
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="pin-code"
                                        name='pin_code'
                                        type="number"
                                        defaultValue={userDetails?.address?.pinCode}
                                        placeholder="Enter pin code"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Biography
                                </label>
                                <textarea
                                    id="description"
                                    rows={8}
                                    defaultValue={userDetails?.bio}
                                    name='bio'
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Write a description here..."
                                />
                            </div>
                        </div>
                        <button type='submit' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4">Update</button>
                    </form>
                    <div className="flex items-center space-x-4 border-t py-3">
                        <button
                            onClick={() => profileDeactive(user_id)}
                            type="button"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                        >
                            Diactive
                        </button>
                        <button
                            onClick={() => profileDelete(user_id)}
                            type="button"
                            className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                            <svg
                                className="w-5 h-5 mr-1 -ml-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default EditProfile;