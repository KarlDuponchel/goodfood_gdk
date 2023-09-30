export function getHeaders(): Headers {
    const headers = new Headers();
    headers.set("Content-type", "application/json");

    return headers;
}

export function getUser() {
    let boolToReturn = false;

    if (localStorage.getItem('accessToken') && localStorage.getItem('accessToken') !== "") {
        boolToReturn = true;
    }

    return boolToReturn;
}

export async function login(email: string, password: string): Promise<any> {
    const input = `${process.env.api}/auth/security/login`;
    const response = await fetch(input, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: getHeaders()
    });

    if (response.status !== 200) {
        const error = await response.json();
        throw new Error(error.message);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    response.json().then((value) => {
        localStorage.setItem("accessToken", value.accessToken);
        localStorage.setItem("refreshToken", value.refreshToken);
    });
}

export async function disconnect(): Promise<any> {
    /*const input = `${process.env.api}/auth/security/logout`;
    const response = await fetch(input, { method: "DELETE", headers: getHeaders() });

    if (response.status !== 200) {
        const error = await response.json();
        throw new Error(error.message);
    }*/

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}

export async function createUser(email: string, firstname: string, lastname: string): Promise<any> {
    const input = `${process.env.api}/auth/security/register`;
    const response = await fetch(input, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            firstname: firstname,
            lastname: lastname
        }),
        headers: getHeaders()
    });
    
    if (response.status !== 201) {
        const error = await response.json();
        throw new Error(error.message);
    }
}