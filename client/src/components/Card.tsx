import { Share2, Trash2, FileText, Youtube, Twitter, Link as LinkIcon } from "lucide-react";
import { motion } from "framer-motion";

interface CardProps {
    _id: string; // Add ID so we can identify for deletion
    title: string;
    link: string;
    type: "twitter" | "youtube" | "link" | "article"; // Ensure these match your API types
    onDelete?: (id: string) => void;
}

const getIcon = (type: string) => {
    switch (type) {
        case "twitter":
            return <Twitter className="w-5 h-5 text-blue-400" />;
        case "youtube":
            return <Youtube className="w-5 h-5 text-red-500" />;
        case "article":
            return <FileText className="w-5 h-5 text-gray-600" />;
        default:
            return <LinkIcon className="w-5 h-5 text-gray-600" />; // Default icon
    }
};

export const Card = ({ _id, title, link, type, onDelete }: CardProps) => { // Destructure onDelete

    // Helper to extract YouTube video ID
    const getYoutubeEmbedUrl = (url: string) => {
        try {
            const videoId = url.split("v=")[1]?.split("&")[0];
            if (videoId) return `https://www.youtube.com/embed/${videoId}`;
            // Handle shortened URLs (youtu.be)
            const shortId = url.split("youtu.be/")[1]?.split("?")[0];
            if (shortId) return `https://www.youtube.com/embed/${shortId}`

            return null;
        } catch (e) {
            return null
        }
    };

    // Helper for twitter embed - simplified, ideally use twitter-embed lib
    const isTwitter = type === "twitter";
    const tweetId = isTwitter ? link.split("status/")[1]?.split("?")[0] : null;


    return (
        <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Constraints effectively remove the free movement but keep the drag animation feel or limit it. 
            // Actually, if we want them to be arrangeable, we might need a library like dnd-kit or react-beautiful-dnd. 
            // But user asked for framer motion draggable cards. 
            // Let's set some constraints so they don't fly off screen easily, or just `drag` for fun physics.
            whileDrag={{ scale: 1.05, zIndex: 10, cursor: "grabbing" }}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-4 max-w-sm w-full flex flex-col gap-3 h-fit cursor-grab hover:shadow-lg transition-shadow"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                    {getIcon(type)}
                    <span className="text-xs font-medium uppercase tracking-wider">{type}</span>
                </div>
                <div className="flex items-center gap-2">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Share2 className="w-4 h-4" />
                    </a>
                    {onDelete && ( // Only show delete if handler provided
                        <button onClick={() => onDelete(_id)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="font-semibold text-lg line-clamp-2 text-gray-800">
                {title}
            </div>

            <div className="w-full rounded-md overflow-hidden bg-gray-50 border border-gray-100 mt-1">
                {type === 'youtube' && getYoutubeEmbedUrl(link) ? (
                    <iframe
                        className="w-full aspect-video"
                        src={getYoutubeEmbedUrl(link) || ""}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                ) : isTwitter && tweetId ? (
                    <div className="p-3 text-sm text-gray-500 italic bg-blue-50">
                        {/* Basic fallback for now as full twitter embed is heavy */}
                        <p>Tweet from X/Twitter</p>
                        <a href={link} target="_blank" className="text-blue-500 hover:underline truncate block w-full">{link}</a>
                    </div>
                ) : (
                    <div className="p-2 bg-gray-50 text-gray-500 text-sm flex flex-col gap-1">
                        <div className="flex items-center gap-1">
                            <LinkIcon className="w-3 h-3" />
                            <span className="text-xs">Link Preview</span>
                        </div>
                        <a href={link} target="_blank" className="text-blue-600 hover:underline truncate">{link}</a>
                    </div>
                )}
            </div>

            {/* Tags placeholder */}
            <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">#ideas</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">#readlator</span>
            </div>

        </motion.div>
    );
};
