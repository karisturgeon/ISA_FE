// const LOGIN = {
//     missingActivity: "Please go back and select an activity",
//     missingAdjective: "Please select one primary and one secondary adjective.",
//     login: "Login",
//     noAccount: "Don't have an account?",
//     registerHere: "Register here",
//     email: "Email",
//     enterEmail: "Enter email",
//     password: "Password",
//     enterPassword: "Enter password"
// }


const MESSAGES = {
    LOGIN: {
        login: "Login",
        noAccount: "Don't have an account?",
        registerHere: "Register here",
        email: "Email",
        enterEmail: "Enter email",
        password: "Password",
        enterPassword: "Enter password"
    },
    REGISTER: {
        fail: "Registration failed. Please try again.",
        serverFail: "Unexpected server response. Please try again.",
        email: "Email",
        register: "Register",
        enterEmail: "Enter email",
        password: "Password",
        enterPassword: "Enter password",
        login: "Login",
        haveAccount: "Already have an account? "
    },
    ADJ: {
        missingActivity: "Please go back and select an activity",
        submit: "Submit",
        back: "Back",
        select: "Select two Moods for: ",
        generating: "Generating your song, please wait...",
        loading: "Loading...",
        error: "Error",
        addCustom: "Add a custom adjective",
        customPlaceholder: "Enter your own adjective...",
        add: "Add"

    },
    ADMIN: {
        adminDash: "Admin Dashboard",
        endpointUsage: "Total Endpoint Usage",
        count: "Count",
        path: "Path",
        method: "Method",
        userUsage: "Total Usage by User",
        email: "Email",
        unknown: "Unknown",
        unknownError: "An unknown error occurred.",
        failedAddAdj: "Failed to add adjective: ",
        failedAddAct: "Failed to add activity: ",
        failedUpdAdj: "Failed to update adjective: ",
        failedUpdAct: "Failed to update activity: ",
        failedDelAdj: "Failed to delete adjective: ",
        failedDelAct: "Failed to delete activity: ",
        id: "ID",
        word: "Word",
        actions: "Actions",
        update: "Update",
        delete: "Delete",
        add: "Add",
        new: "New"
    },
    ACTIVITY: {
        selectActivity: "Select an Activity",
        loading: "Loading...",
        alertSelect: "Please select an activity or enter a custom one.",
        customAct: "Or enter a custom activity",
        error: "Error",
        serverError: "Could not connect to the server. Please try again later.",
        next: "Next"
    },
    SONG: {
        noSong: "No Soung Found",
        tryAgain: "Please go back and try again",
        backHome: "Back to Home",
        genSong: "Generated Song",
        playing: "Playing: ",
        error: "Your browser does not support the audio element",
        unknown: "Unknown Song"
    },
    UNAUTHORIZED: {
        unauth: "You are not authorized to see this page"
    },
    COMPONENTS: {
        loading: "Loading..."
    },
    HEADER: {
        logout: "Logout"
    },
    INDEX: {
        welcome: "Welcome",
        generate: "Generate a new Song",
        go: "Go!",
        loadingError: "An error ocurred while loading data.",
        connectFail: "Could not connect to the server. Please try again later.",
        error: "Error",
        count: "Count",
        path: "Path",
        method: "Method"
    }

}
export default MESSAGES;