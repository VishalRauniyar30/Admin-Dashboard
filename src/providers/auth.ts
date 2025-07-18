import { AuthProvider } from '@refinedev/core'
import { API_URL, dataProvider } from './data'

export const authCredentials = {
    email: "vishalkgupta9966@gmail.com",
    password: "123123123",
}

export const authProvider: AuthProvider = {
    login: async ({ email }) => {
        try {
            const { data } = await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
                meta: {
                    variables: { email },
                    // pass the email to see if the user exists and if so, return the accessToken
                    rawQuery: `
                        mutation Login($email: String!) {
                            login(loginInput: { email: $email }) {
                                accessToken
                            }
                        }
                    `,
                }
            })

            localStorage.setItem("access_token", data.login.accessToken)
            return {
                success: true,
                redirectTo: "/"
            }
        } catch (e) {
            const error = e as Error

            return {
                success: false,
                error: {
                    message: "message" in error ? error.message : "Login Failed",
                    name: "name" in error ? error.name : "Invalid email or password"
                }
            }
        }
    },
    logout: async () => {
        localStorage.removeItem("access_token")
        return {
            success: true,
            redirectTo: '/login',
        }
    },
    onError: async(error) => {
        // a check to see if the error is an authentication error
        // if so, set logout to true
        if (error.statusCode === "UNAUTHENTICATED") {
            return {
                logout: true,
                ...error,
            }
        }

        return { error }
    },
    check: async() => {
        try {
            await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
                meta: {
                rawQuery: `query Me {
                        me { name }
                    }`,
                },
            })
            // if the user is authenticated, redirect to the home page
            return {
                authenticated: true,
                redirectTo: "/",
            }
        } catch (error) {
            return {
                authenticated: false,
                redirectTo: '/login',
            }
        }
    },
    getIdentity: async() => {
        const accessToken = localStorage.getItem('access_token')
        try {
            // call the GraphQL API to get the user information
            // we're using me:any because the GraphQL API doesn't have a type for the me query yet.
            // we'll add some queries and mutations later and change this to User which will be generated by codegen
            const { data } = await dataProvider.custom<{ me: any }>({
                url: API_URL,
                method: 'post',
                headers: accessToken 
                ? {
                    Authorization: `Bearer ${accessToken}`
                } : {},
                meta: {
                    rawQuery: `
                        query Me {
                            me {
                                id,
                                name,
                                email,
                                phone,
                                jobTitle,
                                timezone,
                                avatarUrl
                            }
                        }
                    `,
                }
            })
            return data.me
        } catch (error) {
            return undefined
        }
    }
}