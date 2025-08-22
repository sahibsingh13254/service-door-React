const services = [
{ name: "Screen replacement", price: "From ₹1499" },
{ name: "Battery replacement", price: "From ₹999" },
{ name: "Camera repair", price: "From ₹1299" },
{ name: "Speaker/Mic fix", price: "From ₹899" }
];
export default function Services() {
return (
<section className="py-16">
<div className="max-w-7xl mx-auto px-4">
<h1 className="text-3xl font-semibold">Services & Pricing</h1>
<p className="text-gray-600 mt-2">Transparent pricing varies by model. Final quote is confirmed during booking.</p>
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
{services.map((s, i) => (
<div key={i} className="p-6 border rounded-lg">
<h3 className="text-xl font-semibold">{s.name}</h3>
<p className="mt-2 text-gray-600">{s.price}</p>
</div>
))}
</div>
</div>
</section>
);
}