import cookies from "next-cookies"

export function authPage (context, role) {
    return new Promise ((resolve) => {
        switch (role) {
            case "user":
                const {user_cookie} = cookies(context);
                return resolve({
                    token: user_cookie
                });
            case "user_penitipan":
                const {user_penitipan_cookie} = cookies(context);
                console.log(user_penitipan_cookie);
                return resolve({
                    token: user_penitipan_cookie
                });
            default:
                return resolve("Must send role argument")
        }
    })
}

export function unAuthPage (context) {
    return new Promise ((resolve) => {
        const {user_cookie} = cookies(context);
        const {user_penitipan_cookie} = cookies(context);
        console.log(user_penitipan_cookie);
        return resolve ({
            token_user: user_cookie,
            token_user_penitipan: user_penitipan_cookie
        })
    })
}