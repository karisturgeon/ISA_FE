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
        missingAdjective: "Please select one primary and one secondary adjective.",
        submit: "Submit",
        back: "Back",
        select: "Select two Adjectives for: ",
        generating: "Generating your song, please wait...",
        loading: "Loading..."
    },
    ADMIN: {
        adminDash: "Admin Dashboard",
        endpointUsage: "Total Endpoint Usage",
        count: "Count",
        path: "Path",
        method: "Method",
        userUsage: "Total Usage by User",
        email: "Email"
    },
    ACTIVITY: {
        selectActivity: "Select an Activity",
        loading: "Loading...",
        alertSelect: "Please select an activity or enter a custom one.",
        customAct: "Or enter a custom activity"
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