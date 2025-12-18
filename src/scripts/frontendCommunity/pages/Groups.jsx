import { useState } from "react";
import RealmsList from "../components/GroupsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Realms = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('all');

    return (
        <div className="black-800 text-white p-6">
            {/* Page Title and Tabs */}
            <div className="container mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">グループ</h1>
                    {/* Tabs for All, Joined, and Created */}
                    <div className="flex space-x-4 text-xs sm:text-base">
                        <button
                            onClick={() => setSelectedTab('all')}
                            className={`px-4 py-2 rounded-lg transition-colors ${selectedTab === 'all' ? 'bg-black-600 text-white' : 'black-800 text-gray-400'} hover:bg-black-700`}
                        >
                            すべて
                        </button>
                        <button
                            onClick={() => setSelectedTab('joined')}
                            className={`px-4 py-2 rounded-lg transition-colors ${selectedTab === 'joined' ? 'bg-black-600 text-white' : 'black-800 text-gray-400'} hover:bg-black-700`}
                        >
                            参加済み
                        </button>
                        <button
                            onClick={() => setSelectedTab('created')}
                            className={`px-4 py-2 rounded-lg transition-colors ${selectedTab === 'created' ? 'bg-black-600 text-white' : 'black-800 text-gray-400'} hover:bg-black-700`}
                        >
                            作成済み
                        </button>
                        <button onClick={() => navigate('/submit-realm')}
                            className={`px-4 py-2 rounded-lg bg-black-500`}
                        >
                            <FontAwesomeIcon icon={faPlus} className="mr-2"/>
                            新規グループ
                        </button>
                    </div>
                </div>

                {/* Groups Content */}
                <RealmsList type={selectedTab} />
            </div>
        </div>
    );
};

export default Realms;