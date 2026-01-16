import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import api, { endpoints } from "../api/api";

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void; // Callback to refresh content
}

export const CreateContentModal = ({ open, onClose, onSuccess }: CreateContentModalProps) => {
    if (!open) return null;

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [type, setType] = useState("audio"); // Default type
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await api.post(endpoints.content.add, {
                title,
                link,
                type
            })
            onSuccess();
            onClose();
            // Reset form
            setTitle("");
            setLink("");
            setType("link");
        } catch (error) {
            console.error("Failed to add content", error);
            alert("Failed to add content. Please check input.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-4 relative animate-fade-in-up">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-bold text-center mb-2">Add New Content</h2>

                <div className="flex flex-col gap-4">
                    <Input
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        placeholder="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Type</label>
                        <div className="flex gap-2">
                            {['article', 'video', 'audio', 'image'].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setType(t)}
                                    className={`px-3 py-1.5 rounded-md text-sm transition-colors border ${type === t
                                            ? "bg-purple-100 border-purple-200 text-purple-700"
                                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {t.charAt(0).toUpperCase() + t.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <Button onClick={handleSubmit} loading={loading} variant="primary" size="md">
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    );
};
