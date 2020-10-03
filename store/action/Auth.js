import { AsyncStorage } from "react-native";
export const AUTHINTICATE = "AUTHINTICATE";
export const LOGOUT = "LOGOUT";

let timer;
export const authinticate = (token, userId, expiryTime) => {
    return (dispatch) => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHINTICATE, userId: userId, token: token });
    };
};
export const signUp = (email, password) => {
    return async (dispatch) => {
        const respose = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCT5XJZ3pMxn0uIypHms0uh2jUwsBcrdA",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            }
        );

        if (!respose.ok) {
            throw new Error("Something went wrong");
        }
        const resData = await respose.json();
        console.log(resData);
        dispatch(
            authinticate(
                resData.idToken,
                resData.localId,
                parseInt(resData.expiresIn) * 1000
            )
        );
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCT5XJZ3pMxn0uIypHms0uh2jUwsBcrdA",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = "Something went wrong!";
            if (errorId === "EMAIL_NOT_FOUND") {
                message = "This email could not be found!";
            } else if (errorId === "INVALID_PASSWORD") {
                message = "This password is not valid!";
            }

            throw new Error(message);
        }

        const resData = await response.json();

        dispatch(
            authinticate(
                resData.idToken,
                resData.localId,
                parseInt(resData.expiresIn) * 1000
            )
        );
        const expirationDate = new Date(
            new Date().getTime() + parseInt(resData.expiresIn) * 1000
        );
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem(
        "userData",
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString(),
        })
    );
};

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem("userData");
    return { type: LOGOUT };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};
const setLogoutTimer = (expirationTime) => {
    return (dispatch) => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};
