import Signup from "./Signup";
import Login from "./Login";

const authRoutes = [
    {
        path: '/signup',
        element: <Signup />
    },

    {
        path: '/login',
        element: <Login />
    }
]

export default authRoutes;