import axios from 'axios'
const getUrl = () => {
    if (window.location.hostname === "localhost") {
        return `http://${window.location.host.replace("3000", "8000")}`
    }
    else if(window.location.hostname.endsWith("vercel.app")){
        return "https://projekt-x-api.vercel.app"
    }
    else {
        return `http://${window.location.host.replace("3000", "8000")}`
    }
}
const API_BASE = getUrl()
const GCAPTCHA_SITE_KEY = "6LdiWbcoAAAAADl6Ak1F6cBTXQURwVKKufqPtOrB"

const JWT_KEY = "session_key"
const getJWT = () => { return localStorage.getItem(JWT_KEY) }
const delJWT = () => { return localStorage.removeItem(JWT_KEY) }
const setJWT = (JWT: string) => { return localStorage.setItem(JWT_KEY, JWT) }
const checkJWT = () => { return localStorage.getItem(JWT_KEY) !== null || checkREF() }

const REF_KEY = "diamond_key"
const getREF = () => { return localStorage.getItem(REF_KEY) }
const setREF = (JWT: string) => { return localStorage.setItem(REF_KEY, JWT) }
const delREF = () => { return localStorage.removeItem(REF_KEY) }
const checkREF = () => { return localStorage.getItem(REF_KEY) !== null }

const getHeaders = () => {
    if (checkJWT()) {
        return {
            "Authorization": "Bearer " + getJWT(),
            "Content-Type": "application/json"
        }
    } else { return { "Content-Type": "application/json" } }
}

const LoginGaurd = async (navigate: Function, next: string | null = null) => {
    if (!getJWT() && !checkREF()) {
        navigate(next ? `/login?next=${next}` : "/login", { replace: true })
        return
    }
    if (getJWT()) {
        await Profile()
    }
    if (!getJWT()) {
        let success = await RefreshToken()
        if (success) {
            window.location.reload()
        }
        else {
            navigate(next ? `/login?next=${next}` : "/login", { replace: true });
        }
    }
}
const RefreshToken = async () => {
    let success = false
    await axios.post(`${API_BASE}/users/token/refresh/`, { refresh: getREF() })
        .then(response => {
            if (response.status === 200) {
                setJWT(response.data.access)
                success = true
            }
            if (response.status === 400) {
                delJWT()
                delREF()
            }
        }).catch(error => {
            if (error.response?.status === 400 || error.response?.status === 404) {
                delJWT()
                delREF()
            }
            console.log(error)
        })
    return success
}
const Profile = async () => {
    let headersList = getHeaders()
    const reqOptions = {
        url: `${API_BASE}/users/token/validate/`,
        headers: headersList,
        method: "POST",
    }
    let real = null
    await axios.request(reqOptions)
        .then(response => {
            return response
        }).catch(error => {
            if (error.response?.status === 401 || error.response?.status === 403) {
                delJWT()
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
