import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', phone: '', company: '',
    accountType: 'individual' as 'individual' | 'business',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch {
      setError('Registration failed. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <>
      <SEO title="Register — UR Aerotech" />
      <section className="min-h-screen flex items-center justify-center bg-graphite section-padding technical-grid">
        <div className="data-plate p-8 w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl">Create Account</h1>
            <p className="text-steel text-sm mt-2">Register for quote tracking and saved products</p>
          </div>

          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="technical-label block mb-2">First Name</label>
                <input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className="input-field" required />
              </div>
              <div>
                <label className="technical-label block mb-2">Last Name</label>
                <input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className="input-field" required />
              </div>
            </div>
            <div>
              <label className="technical-label block mb-2">Email</label>
              <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="input-field" required />
            </div>
            <div>
              <label className="technical-label block mb-2">Password</label>
              <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} className="input-field" required minLength={8} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="technical-label block mb-2">Phone</label>
                <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="technical-label block mb-2">Account Type</label>
                <select
                  value={form.accountType}
                  onChange={(e) => setForm((f) => ({ ...f, accountType: e.target.value as 'individual' | 'business' }))}
                  className="input-field"
                >
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
              </div>
            </div>
            {form.accountType === 'business' && (
              <div>
                <label className="technical-label block mb-2">Company</label>
                <input value={form.company} onChange={(e) => update('company', e.target.value)} className="input-field" />
              </div>
            )}
            <Button type="submit" variant="primary" disabled={loading} className="w-full justify-center">
              {loading ? 'Creating...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-sm text-steel text-center mt-6">
            Already have an account? <Link to="/login" className="text-technical hover:underline">Sign In</Link>
          </p>
        </div>
      </section>
    </>
  );
}
