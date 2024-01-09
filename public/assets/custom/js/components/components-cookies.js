// Function to set a cookie
/**
 * name
 * value
 * expires
 * setCookie('example', '123', 3, '/')
 *  */
function setCookie(name, value, dayToExpire, path = '/') {
    try {
        let cookieString = `${name}=${value}`
        if (dayToExpire) {
            let date = new Date();
            date.setTime(date.getTime() + (dayToExpire * 24 * 60 * 60 * 1000));
            const expirationDate = date.toUTCString(); // Corrected line
            cookieString += `; expires=${expirationDate}`;
        }
        cookieString += `; path=${path}`
        document.cookie = cookieString
        return true
    } catch (error) {
        return false
    }
}

// Function to get the value of a cookie by name
function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

// Function to remove a cookie by name
function removeCookie(name, path = '/') {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
}