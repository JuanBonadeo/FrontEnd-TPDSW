export interface DecodedToken {
  userId: string;
  email: string;
  role: string;
  iat: number;  // issued at
  exp: number;  // expires at
  iss: string;  // issuer
  aud: string;  // audience
}

class TokenManager {
  private static instance: TokenManager;
  private tokenCheckInterval: NodeJS.Timeout | null = null;

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  constructor() {
    // Verificar token cada 5 minutos
    if (typeof window !== 'undefined') {
      this.startTokenValidation();
    }
  }

  // Decodificar JWT manualmente (sin verificar firma en el frontend)
  private decodeToken(token: string): DecodedToken | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = parts[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      
      // Agregar padding si es necesario
      const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
      
      const decoded = atob(padded);
      const jsonPayload = decodeURIComponent(
        decoded.split('').map(c => 
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join('')
      );
      
      return JSON.parse(jsonPayload) as DecodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Verificar si el token está vencido
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp <= now;
  }

  // Verificar si el token está próximo a vencer (30 minutos antes)
  isTokenExpiringSoon(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    
    const now = Math.floor(Date.now() / 1000);
    const thirtyMinutes = 30 * 60; // 30 minutos en segundos
    
    return decoded.exp <= (now + thirtyMinutes);
  }

  // Obtener información del token
  getTokenInfo(token: string): DecodedToken | null {
    return this.decodeToken(token);
  }

  // Obtener tiempo restante del token en minutos
  getTokenTimeRemaining(token: string): number {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return 0;
    
    const now = Math.floor(Date.now() / 1000);
    const remainingSeconds = decoded.exp - now;
    
    return Math.max(0, Math.floor(remainingSeconds / 60));
  }

  // Obtener token almacenado
  getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }

  // Verificar si el token almacenado es válido
  isStoredTokenValid(): boolean {
    const token = this.getStoredToken();
    if (!token) return false;
    
    return !this.isTokenExpired(token);
  }

  // Almacenar token
  storeToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('token', token);
  }

  // Limpiar tokens
  clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.stopTokenValidation();
  }

  // Iniciar validación periódica del token
  private startTokenValidation(): void {
    this.stopTokenValidation(); // Limpiar intervalo previo
    
    this.tokenCheckInterval = setInterval(() => {
      const token = this.getStoredToken();
      if (!token) return;

      if (this.isTokenExpired(token)) {
        console.log('Token expirado, limpiando datos...');
        this.clearTokens();
        this.emitTokenExpired();
      } else if (this.isTokenExpiringSoon(token)) {
        console.log('Token próximo a expirar en:', this.getTokenTimeRemaining(token), 'minutos');
        this.emitTokenExpiringSoon();
      }
    }, 5 * 60 * 1000); // Verificar cada 5 minutos
  }

  // Detener validación periódica
  private stopTokenValidation(): void {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
      this.tokenCheckInterval = null;
    }
  }

  // Emitir evento de token expirado
  private emitTokenExpired(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('token-expired'));
    }
  }

  // Emitir evento de token próximo a expirar
  private emitTokenExpiringSoon(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('token-expiring-soon', {
        detail: { remainingMinutes: this.getTokenTimeRemaining(this.getStoredToken()!) }
      }));
    }
  }

  // Renovar token (hacer login silencioso si es posible)
  async renewToken(): Promise<string | null> {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
    const currentToken = this.getStoredToken();
    
    if (!currentToken || this.isTokenExpired(currentToken)) {
      return null;
    }

    try {
      // Intentar renovar usando el endpoint de verificación/renovación
      // Si tu backend tiene un endpoint específico para esto
      const response = await fetch(`${API_BASE}/auth/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.token) {
          this.storeToken(data.data.token);
          return data.data.token;
        }
      }
    } catch (error) {
      console.error('Error renovando token:', error);
    }

    return null;
  }

  // Obtener token válido (verificando expiración)
  async getValidToken(): Promise<string | null> {
    const token = this.getStoredToken();
    
    if (!token) {
      return null;
    }

    if (this.isTokenExpired(token)) {
      // Token expirado, limpiar y emitir evento
      this.clearTokens();
      this.emitTokenExpired();
      return null;
    }

    // Si el token está próximo a expirar, intentar renovarlo
    if (this.isTokenExpiringSoon(token)) {
      const renewedToken = await this.renewToken();
      return renewedToken || token; // Usar el renovado o el actual
    }

    return token;
  }

  // Cleanup cuando se destruye la instancia
  destroy(): void {
    this.stopTokenValidation();
  }
}

export const tokenManager = TokenManager.getInstance();

// Limpiar cuando se cierra la ventana
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    tokenManager.destroy();
  });
}