import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { endpoints } from "../api/api";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Brain } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth(); // Use login from context

    const handleSignin = async () => {
        setLoading(true);
        try {
            const response = await api.post(endpoints.auth.signin, {
                email,
                password,
            });
            console.log(response.data)
            login(response.data.token, response.data.username, response.data.email); // Update context
            navigate("/dashboard");
        } catch (error: any) {
            alert(error.response?.data?.message || "Signin failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white rounded-xl border border-gray-200 min-w-80 p-8 shadow-xl">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Brain className="w-10 h-10 text-purple-600" />
                        <span className="text-2xl font-bold">Second Brain</span>
                    </div>
                    <h2 className="text-center text-lg text-gray-500 font-semibold">Welcome Back</h2>
                    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <Button onClick={handleSignin} loading={loading} variant="primary" size="md" className="w-full mt-4">
                        Sign In
                    </Button>

                    <p className="text-center text-sm text-gray-600 mt-2">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-purple-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
