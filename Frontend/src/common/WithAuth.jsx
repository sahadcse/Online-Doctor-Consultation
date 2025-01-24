'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useIsAuthenticated from "../hooks/useIsAuthenticated";
import useUserData from "@/hooks/useUserData";

export default function withAuth(Component, allowedRoles = []) {
    return function ProtectedPage(props) {
        const isAuthenticated = useIsAuthenticated();
        const userData = useUserData();
        const role = userData?.role || null; // Safe navigation
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
                router.push('/login');
            }
        }, [isAuthenticated, role, allowedRoles]);

        if (!isAuthenticated || (allowedRoles.length > 0 && !allowedRoles.includes(role))) {
            return null;
        }

        return <Component {...props} />;
    };
}