'use client';
import { Menu as MenuIcon, X as CloseIcon, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface NavLink {
    link: string;
    title: string;
    children?: { title: string; link: string }[];
}

const navLinks: NavLink[] = [
    { link: '/', title: 'Home' },
    { link: '/about', title: 'About' },
    { link: '/news', title: 'News' },
    {
        link: '#',
        title: 'Services',
        children: [
            { link: '/services/web', title: 'Web Development' },
            { link: '/services/seo', title: 'SEO Optimization' },
        ],
    },
    { link: '/contact', title: 'Contact' },
];

const Header = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const toggleDropdown = (title: string) => {
        setOpenDropdown((prev) => (prev === title ? null : title));
    };

    return (
        <header className="w-full bg-black text-white">
            <nav className="max-w-7xl mx-auto flex items-center justify-between p-2 relative">
                <div className="text-2xl font-bold">My App</div>

                {/* Desktop Nav */}
                <ul className="hidden lg:flex space-x-4 items-center">
                    {navLinks.map((navLink) => (
                        <li key={navLink.title} className="relative">
                            {!navLink.children ? (
                                <a href={navLink.link} className="p-3 hover:bg-zinc-700 rounded">
                                    {navLink.title}
                                </a>
                            ) : (
                                <div className="relative">
                                    <button
                                        onClick={() => toggleDropdown(navLink.title)}
                                        className="p-3 hover:bg-zinc-700 rounded inline-flex items-center gap-1"
                                    >
                                        {navLink.title}
                                        <ChevronDown size={16} />
                                    </button>
                                    {openDropdown === navLink.title && (
                                        <div className="absolute bg-white text-black top-full mt-1 rounded shadow-lg min-w-[180px] z-40">
                                            {navLink.children.map((sub) => (
                                                <a
                                                    key={sub.link}
                                                    href={sub.link}
                                                    className="block px-4 py-2 hover:bg-gray-200"
                                                >
                                                    {sub.title}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Icon */}
                <button type="button" className="lg:hidden" onClick={() => setToggleMenu(true)}>
                    <MenuIcon />
                </button>
            </nav>

            {/* Mobile Drawer */}
            {toggleMenu && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col p-6 space-y-6 text-white">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold">My App</div>
                        <button onClick={() => setToggleMenu(false)}>
                            <CloseIcon />
                        </button>
                    </div>

                    <ul className="flex flex-col space-y-4 mt-6">
                        {navLinks.map((navLink) => (
                            <li key={navLink.title}>
                                {!navLink.children ? (
                                    <a
                                        href={navLink.link}
                                        className="block p-3 text-lg hover:bg-zinc-700 rounded"
                                        onClick={() => setToggleMenu(false)}
                                    >
                                        {navLink.title}
                                    </a>
                                ) : (
                                    <div>
                                        <button
                                            onClick={() => toggleDropdown(navLink.title)}
                                            className="block w-full text-left p-3 text-lg hover:bg-zinc-700 rounded inline-flex items-center gap-1"
                                        >
                                            {navLink.title}
                                            <ChevronDown size={16} />
                                        </button>
                                        {openDropdown === navLink.title && (
                                            <div className="ml-4 mt-2 space-y-2">
                                                {navLink.children.map((sub) => (
                                                    <a
                                                        key={sub.link}
                                                        href={sub.link}
                                                        className="block text-sm px-4 py-2 hover:bg-zinc-800 rounded"
                                                        onClick={() => setToggleMenu(false)}
                                                    >
                                                        {sub.title}
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    )
}
export default Header
