const cookieName = "access_token";

export const getAccessToken = (): string => {
    const allCookieArray = document.cookie.split(";");
    const name = cookieName;

    for (let i = 0; i < allCookieArray.length; i++) {
        const cookie = allCookieArray[i].trim();

        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return "";
};

export const setAccessToken = (token: string): void => {
    document.cookie = `${cookieName}=${token}`;
};

export const deleteAccessToken = (): void => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};
