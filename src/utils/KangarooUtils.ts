function SetToken(response) {

    localStorage.setItem('kangaroo_token', response.access_token);
}


function GetToken(): string {

    return localStorage.getItem('kangaroo_token');
}

function DeleteToken() {

    return localStorage.removeItem('kangaroo_token')
}

export default {
    GetToken,
    SetToken,
    DeleteToken
}