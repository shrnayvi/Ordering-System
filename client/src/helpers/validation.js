export const isEmailValid = email => {
    const re = /\S+@\S+\.\S+/i
    return re.test(email)
}