export function Badge({
  name,
  price,
  desc,
}: { name: string; price: string; desc: string }) {
  return (
    <div className="rounded-2xl p-6 ring-1 ring-zinc-800">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-3xl font-bold mt-2">₹{price}</p>
      <p className="mt-2 text-zinc-400">{desc}</p>
    </div>
  );
}
