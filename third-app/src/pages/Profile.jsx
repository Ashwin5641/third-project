import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";

export default function Profile() {
    
    const {user} = useAuth();

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
        </div>
    )
}