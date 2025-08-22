export default function Testimonials() {
const data = [
{ name: "Aarav", text: "Technician arrived on time and fixed my screen in 30 minutes." },
{ name: "Neha", text: "Super convenient. No more service center queues!" },
{ name: "Karan", text: "Transparent pricing and friendly support." }
];
return (
<section className="py-16 bg-brand-50">
<div className="max-w-7xl mx-auto px-4">
<h2 className="text-3xl font-semibold mb-8">What customers say</h2>
<div className="grid md:grid-cols-3 gap-6">
{data.map((t, i) => (
<div key={i} className="p-6 bg-white rounded-lg border">
<p className="text-gray-700">“{t.text}”</p>
<p className="mt-4 font-semibold">{t.name}</p>
</div>
))}
</div>
</div>
</section>
);
}