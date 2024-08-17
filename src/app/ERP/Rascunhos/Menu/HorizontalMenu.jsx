import { useState } from 'react';
import { HomeIcon, UserIcon, CogIcon } from '@heroicons/react/solid'; // Exemplo de ícones

const HorizontalMenu = () => {
    return (
        <div className="flex justify-center items-center space-x-4 bg-gray-800 p-4">
            <MenuItem icon={<HomeIcon className="h-6 w-6 text-white" />} label="Home" />
            <MenuItem icon={<UserIcon className="h-6 w-6 text-white" />} label="Profile" />
            <MenuItem icon={<CogIcon className="h-6 w-6 text-white" />} label="Settings" />
        </div>
    );
};

const MenuItem = ({ icon, label }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flex items-center space-x-2 text-white cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div>{icon}</div>
            {isHovered && <span className="text-white">{label}</span>}
        </div>
    );
};

export default HorizontalMenu;
