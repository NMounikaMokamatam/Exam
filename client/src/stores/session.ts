import { reactive } from "vue";
// import * as users from '../data/users'
import router from "../router/index"

const session = reactive({
    user: null as User | null,
    isAdmin: null as boolean | null,
});
export function login(email: string, password: string) {
    let user;
    const API_URL = "http://localhost:3000/api/users/auth"
    const body = JSON.stringify(
        {
            email: email,
            password: password
        }
    );

    fetch(API_URL, {
        method: "POST",
        body: body,
        headers: {
            "content-type": "application/json"
        }
    })
        .then(response => response.json())
        .then(result => {
            if (!result) {
                router.push("/signup")
                throw { message: "User not found" }
            } else {
                user = result
                session.user = user;

                if (user.isAdmin) {
                    session.isAdmin = true;
                    router.push('/manage');
                } else {
                    router.push('/home');
                }

            }
        });


}
export function logout() {
    session.user = null;
    session.isAdmin = null;
    router.push('/signin')
}
export class User {
    public email?: string;
    public password?: string;
    public _id?: string;
    public username: string;
}
export default session;