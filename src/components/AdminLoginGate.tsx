import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { verifyAdminPasscode, getLockoutRemainingSeconds } from '../services/authService';
import { NovitiateLogo } from './NovitiateLogo';

interface AdminLoginGateProps {
  onAuthenticated: () => void;
  onCancel: () => void;
}

export const AdminLoginGate: React.FC<AdminLoginGateProps> = ({
  onAuthenticated,
  onCancel
}) => {
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(getLockoutRemainingSeconds());

  // Countdown timer for lockout if active
  useEffect(() => {
    if (lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setError(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode) {
      setError('Please enter the admin password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await verifyAdminPasscode(passcode, rememberMe);
      if (res.success) {
        onAuthenticated();
      } else {
        setError(res.error || 'Authentication failed. Incorrect password.');
        const remaining = getLockoutRemainingSeconds();
        if (remaining > 0) {
          setLockoutSeconds(remaining);
        }
      }
    } catch {
      setError('An error occurred during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50/70">
      <div className="max-w-md w-full space-y-6">
        
        {/* Back Link */}
        <div>
          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </button>
        </div>

        {/* Login Container with Brand Accent Line */}
        <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xl">
          {/* Trademark 4-Color Stripe */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#F59415] via-[#E84144] via-[#5C96D2] to-[#72A346]" />

          <div className="p-8 sm:p-10 space-y-6">
            
            {/* Header: Logo & Security Badge */}
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-1">
                <NovitiateLogo size="md" variant="horizontal" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-[11px] font-bold">
                <Lock className="w-3.5 h-3.5 text-[#E84144]" />
                <span>Restricted Operations Console</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                Admin Authentication
              </h1>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                This management area is strictly reserved for authorized Novitiate website administrators and coordinators.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="leading-tight">
                  <span className="font-bold">Access Denied:</span> {error}
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Admin Passcode
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyRound className="w-4 h-4 text-neutral-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passcode}
                    disabled={lockoutSeconds > 0 || loading}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Enter confidential administrator passcode..."
                    autoFocus
                    className="w-full pl-9 pr-10 py-2.5 text-xs font-mono bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#E84144] focus:border-transparent transition-all disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-700 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-neutral-300 text-[#E84144] focus:ring-[#E84144] w-4 h-4 cursor-pointer"
                  />
                  <span>Keep session active on this browser</span>
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading || lockoutSeconds > 0}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-[#E84144] to-[#F59415] hover:opacity-95 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Verifying Credentials...</span>
                ) : lockoutSeconds > 0 ? (
                  <span>Locked ({lockoutSeconds}s)</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Unlock Admin Console</span>
                  </>
                )}
              </button>
            </form>

            {/* Security Notice Box (Confidential) */}
            <div className="pt-2 border-t border-neutral-100">
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-neutral-600 text-xs flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-semibold text-neutral-800">Confidential Portal:</span> Multiple invalid passcode attempts will trigger a security lockout. Passcodes can be updated inside Console settings after login.
                </div>
              </div>
            </div>

            {/* Compliance Guarantee */}
            <div className="pt-1 text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#72A346]" />
              <span>SHA-256 Encrypted Session · Rate-Limited</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
