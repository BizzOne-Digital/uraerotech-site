import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/ui/SEO';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'superadmin')) {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Admin Sign In — UR Aerotech" />
      <section className="min-h-screen flex items-center justify-center bg-graphite section-padding technical-grid">
        <div className="data-plate p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 border border-technical/40 flex items-center justify-center mx-auto mb-4">
              <span className="font-heading text-technical font-bold">UR</span>
            </div>
            <h1 className="font-heading text-2xl">Admin Sign In</h1>
            <p className="text-steel text-sm mt-2">Staff access to the admin panel</p>
          </div>

          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="technical-label block mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
            </div>
            <div>
              <label className="technical-label block mb-2">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
            </div>
            <Button type="submit" variant="primary" disabled={loading} className="w-full justify-center">
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="mt-6 text-center">
            <Link to="/" className="text-sm text-technical hover:underline">
              Back to website
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
