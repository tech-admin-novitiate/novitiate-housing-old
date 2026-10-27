/**
 * Admin Authentication & Security Service
 * Handles password hashing, verification, session persistence, and lockout protection.
 */

const STORAGE_KEYS = {
  ADMIN_AUTH_TOKEN: 'novitiate_admin_session_token',
  ADMIN_HASH: 'novitiate_admin_password_hash',
  ADMIN_SALT: 'novitiate_admin_salt',
  LAST_LOGIN: 'novitiate_admin_last_login',
  ATTEMPTS: 'novitiate_admin_failed_attempts',
  LOCKOUT_UNTIL: 'novitiate_admin_lockout_until'
};

// Default fallback passcode for initial setup
export const DEFAULT_ADMIN_PASSCODE = 'novitiate@admin2024';

// Helper to hash password using SHA-256 via browser Crypto API
async function sha256(str: string): Promise<string> {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Initialize stored hash if not already set
async function ensurePasswordInitialized(): Promise<void> {
  const existing = localStorage.getItem(STORAGE_KEYS.ADMIN_HASH);
  if (!existing) {
    const defaultHash = await sha256(DEFAULT_ADMIN_PASSCODE);
    localStorage.setItem(STORAGE_KEYS.ADMIN_HASH, defaultHash);
  }
}

// Check if currently authenticated
export function isAdminAuthenticated(): boolean {
  const sessionToken = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH_TOKEN);
  const localToken = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH_TOKEN);
  return Boolean(sessionToken || localToken);
}

// Get lockout status (if user entered wrong password 5 times)
export function getLockoutRemainingSeconds(): number {
  const lockoutUntilStr = localStorage.getItem(STORAGE_KEYS.LOCKOUT_UNTIL);
  if (!lockoutUntilStr) return 0;
  const lockoutUntil = Number(lockoutUntilStr);
  const now = Date.now();
  if (now < lockoutUntil) {
    return Math.ceil((lockoutUntil - now) / 1000);
  }
  localStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
  localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
  return 0;
}

// Authenticate with passcode
export async function verifyAdminPasscode(passcode: string, rememberMe: boolean = false): Promise<{ success: boolean; error?: string }> {
  await ensurePasswordInitialized();

  // Check lockout
  const remaining = getLockoutRemainingSeconds();
  if (remaining > 0) {
    return {
      success: false,
      error: `Too many failed attempts. Console locked for ${remaining} more seconds.`
    };
  }

  const inputHash = await sha256(passcode);
  const storedHash = localStorage.getItem(STORAGE_KEYS.ADMIN_HASH);

  if (inputHash === storedHash) {
    // Reset failed attempts
    localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
    localStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);

    // Create a unique session token
    const token = `adm_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH_TOKEN, token);
    } else {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH_TOKEN, token);
    }

    localStorage.setItem(STORAGE_KEYS.LAST_LOGIN, new Date().toISOString());

    // Dispatch event so UI updates immediately
    window.dispatchEvent(new Event('novitiate_auth_changed'));

    return { success: true };
  } else {
    // Increment failed attempts
    const attempts = Number(localStorage.getItem(STORAGE_KEYS.ATTEMPTS) || '0') + 1;
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, String(attempts));

    if (attempts >= 5) {
      const lockDurationMs = 30 * 1000; // 30 second cooldown
      localStorage.setItem(STORAGE_KEYS.LOCKOUT_UNTIL, String(Date.now() + lockDurationMs));
      return {
        success: false,
        error: 'Too many incorrect attempts. Console locked for 30 seconds for security.'
      };
    }

    return {
      success: false,
      error: `Incorrect admin password. (${5 - attempts} attempts remaining)`
    };
  }
}

// Log out admin
export function logoutAdmin(): void {
  sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH_TOKEN);
  window.dispatchEvent(new Event('novitiate_auth_changed'));
}

// Change admin password
export async function changeAdminPassword(currentPass: string, newPass: string): Promise<{ success: boolean; error?: string }> {
  await ensurePasswordInitialized();
  const currentHash = await sha256(currentPass);
  const storedHash = localStorage.getItem(STORAGE_KEYS.ADMIN_HASH);

  if (currentHash !== storedHash) {
    return { success: false, error: 'Current password is incorrect.' };
  }

  if (newPass.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters long.' };
  }

  const newHash = await sha256(newPass);
  localStorage.setItem(STORAGE_KEYS.ADMIN_HASH, newHash);
  return { success: true };
}

// Reset password to default (emergency helper)
export async function resetAdminPasswordToDefault(): Promise<void> {
  const defaultHash = await sha256(DEFAULT_ADMIN_PASSCODE);
  localStorage.setItem(STORAGE_KEYS.ADMIN_HASH, defaultHash);
  localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
  localStorage.removeItem(STORAGE_KEYS.LOCKOUT_UNTIL);
}

// Get last login formatted string
export function getLastLoginTime(): string | null {
  const lastLogin = localStorage.getItem(STORAGE_KEYS.LAST_LOGIN);
  if (!lastLogin) return null;
  try {
    return new Date(lastLogin).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return null;
  }
}
