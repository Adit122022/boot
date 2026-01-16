import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    username: string | null;
    email: string | null;
    loading: boolean;
    login: (token: string, username: string, email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
    const [email, setEmail] = useState<string | null>(localStorage.getItem("email"));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if token exists on mount (already initialized via useState, but could add verify call here)
        const storedToken = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username");
        const storedEmail = localStorage.getItem("email");
        if (storedToken) {
            setToken(storedToken);
        }
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedEmail) {
            setEmail(storedEmail);
        }
        setLoading(false);
    }, []);

    const login = (newToken: string, newUsername: string, newEmail: string) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("username", newUsername);
        localStorage.setItem("email", newEmail);
        setToken(newToken);
        setUsername(newUsername);
        setEmail(newEmail);
    };
 

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        setToken(null);
        setUsername(null);
        setEmail(null);
    };

    return (
        <AuthContext.Provider value={{ token, username, email, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
