import { randomBytes } from 'crypto';

export function generateTrackingId(): string {
  const now = new Date();
  const timestamp = now.getFullYear().toString() +
                    String(now.getMonth() + 1).padStart(2, '0') +
                    String(now.getDate()).padStart(2, '0');
  const rand = randomBytes(3).toString('hex').toUpperCase(); // Generates a 6-char hex string
  return `TRK-${timestamp}-${rand}`;
}
