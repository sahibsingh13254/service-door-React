export default function Footer() {
return (
<footer className="border-t border-white/10 bg-black">
<div className="container-page py-10 text-sm text-white/60">
<div className="flex items-center justify-between">
<span>© {new Date().getFullYear()} PhoneDoor</span>
<nav className="flex gap-6">
<a href="#support" className="hover:text-white">Support</a>
<a href="#terms" className="hover:text-white">Terms</a>
<a href="#privacy" className="hover:text-white">Privacy</a>
</nav>
</div>
</div>
</footer>
);
}