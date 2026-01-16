import { Brain, Twitter, Youtube, FileText, Link as LinkIcon, Hash, LogOut, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./Button";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const location = useLocation();
    const { logout, username, email } = useAuth();
    const links = [
        { name: "All Content", icon: <Hash className="w-5 h-5" />, path: "/dashboard" },
        { name: "Tweets", icon: <Twitter className="w-5 h-5" />, path: "/dashboard?type=twitter" },
        { name: "Videos", icon: <Youtube className="w-5 h-5" />, path: "/dashboard?type=youtube" },
        { name: "Documents", icon: <FileText className="w-5 h-5" />, path: "/dashboard?type=article" },
        { name: "Links", icon: <LinkIcon className="w-5 h-5" />, path: "/dashboard?type=link" },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={onClose}
                />
            )}

            <div className={`
                fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 
                transform transition-transform duration-200 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:static md:h-screen
            `}>
                <div className="flex flex-col h-full">
                    {/* Header & Profile */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Brain className="w-8 h-8 text-purple-600" />
                                <span className="text-xl font-bold">Omoide (思い出)</span>
                            </div>
                            <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Profile Section */}
                        {username && (
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-lg shrink-0">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate" title={username}>
                                        {username}
                                    </p>
                                    {email && (
                                        <p className="text-xs text-gray-500 truncate" title={email}>
                                            {email}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                        {links.slice(1).map((link) => {
                            const isActive = location.pathname === link.path && location.search === (link.path.split("?")[1] ? `?${link.path.split("?")[1]}` : "");
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => window.innerWidth < 768 && onClose()}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium ${isActive
                                        ? "bg-purple-50 text-purple-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Logout Footer */}
                    <div className="p-4 border-t border-gray-100">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={logout}
                            className="w-full py-2 justify-start font-bold text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-100"
                            startIcon={<LogOut className="w-4 h-4" />}
                        >
                            <span className="font-bold">Log Out</span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};
