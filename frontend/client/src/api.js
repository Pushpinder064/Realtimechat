const API_URL = "http://localhost:5000"; // Hardcoded or replace with your env config if set up properly

export const registerRoute = `${API_URL}/api/auth/register`;
export const loginRoute = `${API_URL}/api/auth/login`;
export const allUsersRoute = `${API_URL}/api/auth/allusers`; // append /:id
export const setAvatarRoute = `${API_URL}/api/auth/setavatar`; // append /:id
export const sendMessageRoute = `${API_URL}/api/messages/addmsg`;
export const getMessageRoute = `${API_URL}/api/messages/getmsg`;
