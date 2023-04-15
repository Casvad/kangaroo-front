import axios, {AxiosResponse} from "axios";
import KangarooUtils from "../utils/KangarooUtils.ts";

let host = "https://a516-181-51-34-1.ngrok.io"

function MakeLogin(email, password: string): Promise<AxiosResponse> {

    return axios.post(host + '/users/login', {
        email,
        password
    })
}

function GetDevices(): Promise<AxiosResponse> {
    let token = "Bearer " + KangarooUtils.GetToken()

    return axios.get(host + '/devices', {
        headers: {
            'Authorization': token
        }
    })
}

function GetProductTransactions(productId: string): Promise<AxiosResponse> {
    let token = "Bearer " + KangarooUtils.GetToken()

    return axios.get(host + '/devices/products/' + productId , {
        headers: {
            'Authorization': token
        }
    })
}

function GetDeviceTransactions(deviceId: string): Promise<AxiosResponse> {
    let token = "Bearer " + KangarooUtils.GetToken()

    return axios.get(host + '/devices/transactions/' + deviceId , {
        headers: {
            'Authorization': token
        }
    })
}

let _ = {
    MakeLogin,
    GetDevices,
    GetProductTransactions,
    GetDeviceTransactions
}

export default _;