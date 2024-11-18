import React from "react";

type HeaderProps = {}; // No props for this component

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="w-full border-b-8 border-[#1976d2]">
      <div className="flex justify-between items-center w-full p-4">
        <h1 className="text-[#1976d2] font-semibold text-2xl" aria-label="Logo">
          PAYNOW
        </h1>
        <NavigationMenu />
      </div>
    </header>
  );
};

const NavigationMenu: React.FC = () => {
  return (
    <nav aria-label="Main Navigation">
      <ul className="flex text-gray-600 gap-4 no-underline">
        <NavItem href="#" label="Dashboard" />
        <NavItem href="#" label="Transaction" isActive />
        <NavItem href="#" label="Filter" />
      </ul>
    </nav>
  );
};

type NavItemProps = {
  href: string;
  label: string;
  isActive?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ href, label, isActive }) => {
  return (
    <li>
      <a
        href={href}
        className={`${
          isActive ? "text-[#1976d2] font-semibold" : ""
        } hover:underline`}
      >
        {label}
      </a>
    </li>
  );
};

export default Header;
