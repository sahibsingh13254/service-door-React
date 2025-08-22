import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
const nav = "px-3 py-2 rounded-md text-sm font-medium hover:text-brand-600";
return (
<header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
<div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
<Link to="/" className="font-bold text-brand-600 text-lg">PhoneDoor</Link>
<nav className="flex items-center gap-2">
<NavLink to="/services" className={nav}>Services</NavLink>
<NavLink to="/book" className={nav}>Book</NavLink>
<NavLink to="/about" className={nav}>About</NavLink>
</nav>
</div>
</header>
);
}