import jwt_decode from "jwt-decode";

function getStorageData() {
    if (localStorage.getItem('token')) {
        return jwt_decode(localStorage.getItem('token'));
    }
    else if (sessionStorage.getItem('token')) {
        return jwt_decode(sessionStorage.getItem('token'));
    }
    else return null;
}

const selectStorage = () => {
    if (localStorage.getItem('token') && localStorage.getItem('refresh')) return true;
    return false;
}

function setStorage(access_token, refresh_token) {
    if (localStorage.getItem('token') && localStorage.getItem('refresh')) {
        localStorage.setItem("token", access_token);
        localStorage.setItem("refresh", refresh_token);
    }
    else if (sessionStorage.getItem('token') && sessionStorage.getItem('refresh')) {
        sessionStorage.setItem("token", access_token);
        sessionStorage.setItem("refresh", refresh_token);
    }
}

const getTokens = () => {
    //To get object from JSON in localStorage/sessionStorage, use JSON.parse(localStorage.getItem('item'))
    if (localStorage.getItem('token') && localStorage.getItem('refresh')) {
        return { accessToken: localStorage.getItem('token'), refreshToken: localStorage.getItem('refresh') };
    }
    else if (sessionStorage.getItem('token') && sessionStorage.getItem('refresh')) {
        return { accessToken: sessionStorage.getItem('token'), refreshToken: sessionStorage.getItem('refresh') };
    }
    else return null;
}

function clearStorage() {
    if (localStorage.getItem('token')) {
        return localStorage.clear();
    }
    return sessionStorage.clear();
}

export { getStorageData, clearStorage, setStorage, getTokens, selectStorage };