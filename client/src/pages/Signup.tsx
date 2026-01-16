import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { endpoints } from "../api/api";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Brain } from "lucide-react";

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        setLoading(true);
        try {
            await api.post(endpoints.auth.signup, {
                username,
                email,
                password,
            });
            alert("Signup Successful! Please Login.");
            navigate("/signin");
        } catch (error: any) {
            alert(error.response?.data?.message || "Signup failed");
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
                    <h2 className="text-center text-lg text-gray-500 font-semibold">Create an Account</h2>
                    <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <Button onClick={handleSignup} loading={loading} variant="primary" size="md" className="w-full mt-4">
                        Sign Up
                    </Button>

                    <p className="text-center text-sm text-gray-600 mt-2">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-purple-600 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
