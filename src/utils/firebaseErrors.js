export function getErrorByCode(code) {
    switch (code) {
        case "auth/wrong-password":
            return "Wrong password"
        case "auth/user-not-found":
            return "User not found"
        case "auth/email-already-in-use":
            return "Email already taken"
        default:
            return "Unknown error. Please try again later."
    }
}