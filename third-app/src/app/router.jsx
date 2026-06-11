import { useRoutes } from "react-router-dom";
import ProtectedRoute from "../shared/guards/ProtectedRoute";

import Home from "../pages/Home";
import Profile from "../pages/Profile";

import authRoutes from "../features/auth/routes";

export default function AppRouter() {
    const routes = [
        {
            path: '/home',
            element: <Home />
        },

        ...authRoutes.map((route) => ({
            ...route,
            element: route.element
        })),

        {
            path: '/profile',
            element: (
                <ProtectedRoute>
                    <Profile />
                </ProtectedRoute>
            )
        },

        {
            path: '/',
            element: <Home />
        },

        {
            path: '*',
            element: <Home />
        }
    ]

    return useRoutes(routes)
}