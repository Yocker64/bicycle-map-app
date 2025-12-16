import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faEllipsis, 
    faLocationDot, 
    faTag, 
    faMessage, 
    faShareNodes,
    faFlag
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

const MarketPostPage = () => {
    // Placeholder data to simulate a fetched item
    const item = {
        id: 1,
        title: "Sony WH-1000XM4 ノイズキャンセリングヘッドホン",
        price: "220.00ドル",
        condition: "中古 - 新品同様",
        description: "ほとんど使用されておらず、オリジナルのケースとケーブルが付属しています。詳細なサウンドと完璧なノイズキャンセリング。XM5にアップグレードしたため出品します。市内中心部での直接取引を希望。",
        location: "京都、日本",
        category: "エレクトロニクス",
        createdAt: "2時間前",
        seller: {
            username: "audio_fan_99",
            profilePictureUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            rating: 4.8
        },
        images: [
            "https://placehold.co/600x400/222/FFF?text=Headphones+Front",
            "https://placehold.co/600x400/222/FFF?text=Headphones+Case",
            "https://placehold.co/600x400/222/FFF?text=Accessories"
        ]
    };

    // Simple state just for UI toggling (visual only)
    const [isSaved, setIsSaved] = useState(false);

    return (
        <div className="container mx-auto p-6 black-800 text-gray-100 min-h-screen">
            <div className="post-item rounded-lg mb-6 relative">
          <div className='border-t border-gray-700 my-6'></div>
                
                {/* --- HEADER: Seller Info & Menu --- */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        {/* Seller Avatar */}
                        <img 
                            src={item.seller.profilePictureUrl} 
                            alt={`${item.seller.username}'s profile`} 
                            className="w-12 h-12 rounded-full object-cover cursor-pointer hover:opacity-80" 
                        />
                        <div>
                            {/* Seller Name */}
                            <h3 className="text-lg font-semibold text-amber-600 cursor-pointer hover:underline">
                                @{item.seller.username}
                            </h3>
                            
                            {/* Meta Info: Category & Time */}
                            <div className="flex items-center text-sm text-gray-400">
                                <span>{item.createdAt}</span>
                                <span className="mx-2">•</span>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={faTag} className="mr-1 text-gray-500" />
                                    <span className="font-semibold text-gray-300">{item.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Context Menu */}
                    <div className="flex items-center px-3 text-gray-400">
                        <Menu as="div" className="relative">
                            <MenuButton>
                                <FontAwesomeIcon icon={faEllipsis} className="hover:text-gray-300 text-lg cursor-pointer"/>
                            </MenuButton>
                            <MenuItems className="absolute right-0 mt-2 black-700 bg-gray-900 border border-gray-700 text-gray-200 rounded-md w-40 shadow-lg z-10">
                                <MenuItem>
                                    <button className='pl-6 text-left space-x-3 w-full py-2 text-sm hover:bg-gray-800'>
                                        <FontAwesomeIcon icon={faShareNodes} />
                                        <span>共有</span>
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button className='pl-6 text-left space-x-3 w-full py-2 text-sm hover:bg-gray-800 text-red-400'>
                                        <FontAwesomeIcon icon={faFlag} />
                                        <span>報告</span>
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>

                {/* --- CONTENT: Item Details --- */}
                <div className="mb-4">
                    {/* Title and Price Row */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-2">
                        <h3 className="text-2xl font-bold text-gray-100 overflow-hidden text-ellipsis break-all">
                            {item.title}
                        </h3>
                        <span className="text-2xl font-bold text-green-400 whitespace-nowrap">
                            {item.price}
                        </span>
                    </div>

                    {/* Location & Condition Tags */}
                    <div className="flex flex-wrap gap-3 mb-4">
                        <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm flex items-center">
                            <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-amber-600"/> 
                            {item.location}
                        </span>
                        <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                            状態: <span className="text-white font-medium">{item.condition}</span>
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 overflow-hidden text-ellipsis whitespace-pre-wrap leading-relaxed">
                        {item.description}
                    </p>

                    {/* Image Grid */}
                    {item.images && item.images.length > 0 && (
                        <div className="flex flex-wrap gap-4 mb-4">
                            {item.images.map((imgUrl, index) => (
                                <img
                                    key={index}
                                    src={imgUrl}
                                    alt={`商品プレビュー ${index + 1}`}
                                    className="w-full md:w-64 h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-200 border border-gray-700"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* --- FOOTER: Actions --- */}
                <div className="post-meta pt-4 border-t border-gray-700 flex items-center justify-between">
                    
                    {/* Left: Primary Actions */}
                    <div className="flex gap-4">
                        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2">
                            <FontAwesomeIcon icon={faMessage} />
                            出品者に連絡
                        </button>
                        
                        <button 
                            onClick={() => setIsSaved(!isSaved)}
                            className={`px-4 py-2 rounded-md font-medium border transition-colors flex items-center gap-2 
                            ${isSaved 
                                ? 'bg-gray-700 border-gray-600 text-red-400' 
                                : 'border-gray-600 text-gray-300 hover:bg-gray-800'}`}
                        >
                            <FontAwesomeIcon icon={faHeart} className={isSaved ? "text-red-500" : ""} />
                            {isSaved ? "保存済み" : "保存"}
                        </button>
                    </div>

                    {/* Right: Seller Rating (Optional Visual) */}
                    <div className="hidden sm:block text-gray-400 text-sm">
                        出品者評価: <span className="text-yellow-400 font-bold">{item.seller.rating} ★</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketPostPage;