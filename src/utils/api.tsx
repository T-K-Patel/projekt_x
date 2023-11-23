import axios from 'axios'
const DEBUG = window.location.port === "3000"
const getUrl = () => {
    if (window.location.hostname === "localhost") {
        return `http://localhost:8000`
    }
    else if (window.location.hostname.endsWith("vercel.app")) {
        return "https://projekt-x-backend.vercel.app"
    }
    else {
        return `http://${window.location.host.replace(window.location.port, "8000")}`
    }
}
const API_BASE = DEBUG ? getUrl() : "https://projekt-x-backend.vercel.app"
const GCAPTCHA_SITE_KEY = "6LdiWbcoAAAAADl6Ak1F6cBTXQURwVKKufqPtOrB"

const REF_KEY = "diamond_key"
const getREF = () => { return localStorage.getItem(REF_KEY) }
const setREF = (JWT: string) => { return localStorage.setItem(REF_KEY, JWT) }
const delREF = () => { return localStorage.removeItem(REF_KEY) }
const checkREF = () => { return localStorage.getItem(REF_KEY) !== null }

const JWT_KEY = "session_key"
const getJWT = () => { return localStorage.getItem(JWT_KEY) }
const delJWT = () => { return localStorage.removeItem(JWT_KEY) }
const setJWT = (JWT: string) => { return localStorage.setItem(JWT_KEY, JWT) }
const checkJWT = () => { return localStorage.getItem(JWT_KEY) !== null || checkREF() }

const getHeaders = () => {
    if (checkJWT()) {
        return {
            "Authorization": "Bearer " + getJWT(),
            "Content-Type": "application/json"
        }
    } else { return { "Content-Type": "application/json" } }
}

const LoginGaurd = async (navigate: Function, next: string | null = null) => {
    if (getJWT()) {
        Profile()
    }
    if ((!getJWT()) && getREF()) {
        let success = await RefreshToken()
        if (success) {
            window.location.reload()
        }
        else {
            navigate(next ? `/login?next=${next}` : "/login", { replace: true });
        }
    }
    if (!getJWT() && !checkREF()) {
        navigate(next ? `/login?next=${next}` : "/login", { replace: true })
        return
    }
}

const RefreshToken = async () => {
    let success = false
    await axios.post(`${API_BASE}/users/token/refresh/`, { refresh: getREF() })
        .then(response => {
            if (response.status === 200) {
                setJWT(response.data.access)
                window.location.reload()
                success = true
            }
            if (response.status === 400 || response.status === 401) {
                delJWT()
                delREF()
            }
        }).catch(error => {
            if (error.response?.status === 400 || error.response?.status === 404 || error.response?.status === 401) {
                delJWT()
                delREF()
            }
            console.log(error)
        })
    return success
}
const Profile = () => {
    let headersList = getHeaders()
    const reqOptions = {
        url: `${API_BASE}/users/token/validate/`,
        headers: headersList,
        method: "POST",
    }
    let real = null
    axios.request(reqOptions)
        .then(response => {
            return response
        }).catch(error => {
            if (error.response?.status === 401 || error.response?.status === 403) {
                delJWT()
                window.location.reload()
            }
            console.log(error)
        })
    return real
}
const LogoutGaurd = (navigate: Function) => {
    if (checkJWT()) {
        navigate('/dashboard');
    }
}

const LogoutUser = (navigate: Function) => {
    delJWT()
    delREF()
    navigate("/", { replace: true })
    window.location.reload()
}

export { API_BASE, GCAPTCHA_SITE_KEY, getHeaders, LoginGaurd, LogoutGaurd, LogoutUser, getJWT, delJWT, checkJWT, checkREF, setJWT, setREF, RefreshToken }
