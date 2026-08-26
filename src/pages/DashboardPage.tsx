import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { inquiryApi } from '../services';
import type { QuoteRequest } from '../types';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

  useEffect(() => {
    inquiryApi.getMyQuotes().then((r) => setQuotes(r.data.data)).catch(() => {});
  }, []);

  if (!user) return null;

  const statusColors: Record<string, string> = {
    new: 'text-technical',
    'under-review': 'text-amber',
    contacted: 'text-ice',
    'quote-prepared': 'text-technical',
    'quote-sent': 'text-technical',
    approved: 'text-green-400',
    declined: 'text-red-400',
    closed: 'text-steel',
  };

  return (
    <>
      <SEO title="Dashboard — UR Aerotech" />
      <section className="section-padding bg-graphite !pt-32 min-h-screen">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
            <div>
              <p className="technical-label text-technical mb-2">Dashboard</p>
              <h1 className="heading-lg">Welcome, {user.firstName}</h1>
            </div>
            <div className="flex gap-3">
              <Button to="/quote" variant="amber">New Quote</Button>
              <button onClick={() => logout()} className="btn-secondary !px-4">Logout</button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="data-plate p-6">
              <h2 className="font-heading text-lg mb-4">Profile</h2>
              <div className="space-y-2 text-sm">
                <p><span className="text-steel">Email:</span> {user.email}</p>
                <p><span className="text-steel">Account:</span> <span className="capitalize">{user.accountType}</span></p>
                {user.company && <p><span className="text-steel">Company:</span> {user.company}</p>}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h2 className="font-heading text-lg mb-4">Quote History</h2>
              {quotes.length === 0 ? (
                <div className="data-plate p-8 text-center">
                  <p className="text-steel mb-4">No quote requests yet.</p>
                  <Button to="/quote" variant="primary">Request a Quote</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {quotes.map((q) => (
                    <div key={q._id} className="data-plate p-4 flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <p className="font-mono text-sm text-technical">{q.reference}</p>
                        <p className="text-sm text-steel mt-1">{q.service || 'General'} — {new Date(q.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`font-mono text-xs uppercase ${statusColors[q.status] || 'text-steel'}`}>
                        {q.status.replace(/-/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
