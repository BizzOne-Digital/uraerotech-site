import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import { adminApi } from '../services';

function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    adminApi.getDashboard().then((r) => setStats(r.data.data)).catch(() => {});
  }, []);

  const cards = [
    { label: 'Products', value: stats?.totalProducts || 0, color: 'text-technical' },
    { label: 'Quote Requests', value: stats?.totalQuotes || 0, color: 'text-amber' },
    { label: 'New Quotes', value: stats?.newQuotes || 0, color: 'text-ice' },
    { label: 'Unread Messages', value: stats?.unreadContacts || 0, color: 'text-technical' },
    { label: 'Users', value: stats?.totalUsers || 0, color: 'text-steel' },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl mb-8">Dashboard Overview</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="data-plate p-6">
            <p className="font-mono text-[10px] text-steel uppercase">{c.label}</p>
            <p className={`font-heading text-3xl mt-2 ${c.color}`}>{String(c.value)}</p>
          </div>
        ))}
      </div>
      <div className="data-plate p-6">
        <h2 className="font-heading text-lg mb-4">Recent Quote Requests</h2>
        {(stats?.recentQuotes as Array<{ reference: string; fullName: string; status: string }>)?.map((q) => (
          <div key={q.reference} className="flex justify-between py-2 border-b border-steel/10 last:border-0 text-sm">
            <span className="font-mono text-technical">{q.reference}</span>
            <span>{q.fullName}</span>
            <span className="text-steel capitalize">{q.status.replace(/-/g, ' ')}</span>
          </div>
        )) || <p className="text-steel text-sm">No recent quotes</p>}
      </div>
    </div>
  );
}

function AdminQuotes() {
  const [quotes, setQuotes] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    adminApi.getQuotes().then((r) => setQuotes(r.data.data)).catch(() => {});
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await adminApi.updateQuoteStatus(id, { status });
    adminApi.getQuotes().then((r) => setQuotes(r.data.data));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-2xl">Quote Requests</h1>
        <button onClick={() => adminApi.exportQuotes().then((r) => {
          const url = URL.createObjectURL(r.data);
          const a = document.createElement('a');
          a.href = url; a.download = 'quotes-export.csv'; a.click();
        })} className="btn-secondary !text-xs !px-4 !py-2">Export CSV</button>
      </div>
      <div className="data-plate overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-steel/10">
              <th className="p-3 text-left font-mono text-[10px] text-steel uppercase">Reference</th>
              <th className="p-3 text-left font-mono text-[10px] text-steel uppercase">Name</th>
              <th className="p-3 text-left font-mono text-[10px] text-steel uppercase">Email</th>
              <th className="p-3 text-left font-mono text-[10px] text-steel uppercase">Status</th>
              <th className="p-3 text-left font-mono text-[10px] text-steel uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q._id as string} className="border-b border-steel/5">
                <td className="p-3 font-mono text-technical">{q.reference as string}</td>
                <td className="p-3">{q.fullName as string}</td>
                <td className="p-3 text-steel">{q.email as string}</td>
                <td className="p-3">
                  <select
                    value={q.status as string}
                    onChange={(e) => updateStatus(q._id as string, e.target.value)}
                    className="bg-navy border border-steel/20 text-xs px-2 py-1"
                  >
                    {['new', 'under-review', 'contacted', 'quote-prepared', 'quote-sent', 'approved', 'declined', 'closed'].map((s) => (
                      <option key={s} value={s}>{s.replace(/-/g, ' ')}</option>
                    ))}
                  </select>
                </td>
                <td className="p-3 text-steel text-xs">{new Date(q.createdAt as string).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminProducts() {
  const [products, setProducts] = useState<Array<Record<string, unknown>>>([]);

  useEffect(() => {
    adminApi.getProducts().then((r) => setProducts(r.data.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="font-heading text-2xl mb-8">Products</h1>
      <div className="data-plate overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-steel/10">
              <th className="p-3 text-left font-mono text-[10px] text-steel uppercase">SKU</th>
              <th className="p-3 text-left font-mono text-[10px] text-steel uppercase">Name</th>
              <th className="p-3 text-left font-mono text-[10px] text-steel uppercase">Condition</th>
              <th className="p-3 text-left font-mono text-[10px] text-steel uppercase">Availability</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id as string} className="border-b border-steel/5">
                <td className="p-3 font-mono text-technical">{p.sku as string}</td>
                <td className="p-3">{p.name as string}</td>
                <td className="p-3 capitalize text-steel">{(p.condition as string)?.replace('-', ' ')}</td>
                <td className="p-3 capitalize text-steel">{(p.availability as string)?.replace('-', ' ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminSettings() {
  const [settings, setSettings] = useState<Record<string, unknown> | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    adminApi.getSettings().then((r) => setSettings(r.data.data as unknown as Record<string, unknown>)).catch(() => {});
  }, []);

  const save = async () => {
    if (!settings) return;
    await adminApi.updateSettings(settings as never);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!settings) return <p className="text-steel">Loading settings...</p>;

  const hero = (settings.hero || {}) as Record<string, string>;

  return (
    <div>
      <h1 className="font-heading text-2xl mb-8">Site Settings</h1>
      <div className="space-y-6 max-w-2xl">
        <div className="data-plate p-6 space-y-4">
          <h2 className="font-heading text-lg">Hero Section</h2>
          {['eyebrow', 'headline', 'subheadline', 'image'].map((key) => (
            <div key={key}>
              <label className="technical-label block mb-1 capitalize">{key}</label>
              <input
                value={hero[key] || ''}
                onChange={(e) => setSettings({ ...settings, hero: { ...hero, [key]: e.target.value } })}
                className="input-field"
              />
            </div>
          ))}
        </div>
        <button onClick={save} className="btn-primary">{saved ? 'Saved!' : 'Save Settings'}</button>
      </div>
    </div>
  );
}

const navItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Quotes', path: '/admin/quotes' },
  { label: 'Products', path: '/admin/products' },
  { label: 'Settings', path: '/admin/settings' },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <>
      <SEO title="Admin Portal — UR Aerotech" />
      <div className="min-h-screen bg-graphite flex">
        <aside className="w-64 bg-navy border-r border-steel/10 p-6 shrink-0 hidden md:block">
          <div className="mb-8">
            <span className="font-heading text-technical text-sm tracking-wider">UR ADMIN</span>
            <p className="font-mono text-[10px] text-steel mt-1">Control Panel</p>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-2.5 text-sm transition-colors ${
                  location.pathname === item.path ? 'bg-technical/10 text-technical' : 'text-steel hover:text-offwhite'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link to="/" className="block mt-8 text-xs text-steel hover:text-technical">← Back to Website</Link>
        </aside>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <Routes>
            <Route index element={<AdminDashboard />} />
            <Route path="quotes" element={<AdminQuotes />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </>
  );
}
