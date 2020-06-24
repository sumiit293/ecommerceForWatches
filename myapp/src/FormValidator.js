export const validateEmail = (email) => {

    //eslint-disable-next-line
    let re = /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z_\-\.]+)\.([a-zA-Z]{2,5})$/i;


    if (re.test(email)) {
        console.log(true);
        return true
    } else {
        return false
    }
}

export const validateName = (name) => {

    let re = /^[a-zA-Z ]{2,15}$/
    if (re.test(name)) {
        console.log(true);
        return true
    } else {
        console.log(false)
        return false

    }
}

export const validatePassword = (password) => {

    let re = /^([a-zA-z0-9_\-\.@#]+){5,}$/
    if (re.test(password)) {
        console.log(true);
        return true
    } else {
        return false
    }
}

export const validatePhone = (phone) => {

    let re = /^[9876]([0-9]){9}$/;
    if (re.test(phone)) {
        console.log(true);
        return true
    } else {
        return false
    }
}
export const validateForm = (name, value) => {

    switch (name) {
        case "name": {
            return validateName(value)
        }
        case "email": {
            return validateEmail(value)
        }
        case "password": {
            return validatePassword(value)
        }
        default:
            return false


    }

}