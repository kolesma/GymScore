export function getErrorByCode(code) {
    switch (code) {
        case "auth/wrong-password":
            return "Wrong password"
        case "auth/user-not-found":
            return "User not found"

        default:
            return "Unknown error. Please try again later."
    }
}