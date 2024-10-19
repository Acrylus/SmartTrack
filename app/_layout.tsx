import { Stack } from "expo-router";
import { useState, useEffect } from "react";

export default function RootLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Simulate an authentication check (e.g., check token in async storage)
        // Set isAuthenticated to true if user is logged in, otherwise false
        const checkAuth = async () => {
            // Example: AsyncStorage or SecureStore to check login status
            const loggedIn = false; // Change this logic based on your auth check
            setIsAuthenticated(loggedIn);
        };

        checkAuth();
    }, []);

    return (
        <Stack>
            {/* If the user is authenticated, show the (tabs), otherwise show Login/Register */}
            {isAuthenticated ? (
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            ) : (
                <>
                    <Stack.Screen
                        name="auth/login"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="auth/register"
                        options={{ headerShown: false }}
                    />
                </>
            )}
        </Stack>
    );
}
