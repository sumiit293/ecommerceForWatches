export const validateEmail = (email) => {

    let re = /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z_\-\.]+)\.([a-zA-Z]{2,5})$/i;
    if (re.test(email)) {
        return true
    } else {
        return false
    }
}

export const validateName = (name) => {

    let re = /^([a-zA-Z]{2,15})$/i
    if (re.test(name)) {
        return true
    } else {
        return false
    }
}

export const validatePassword = (password) => {

    let re = /^([a-zA-z0-9_\-\.@#*!]+){5,}$/
    if (re.test(password)) {
        return true
    } else {
        return false
    }
}