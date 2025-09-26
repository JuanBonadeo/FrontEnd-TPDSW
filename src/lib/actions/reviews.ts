'use server';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

interface UpdateUserRoleResult {
  success: boolean;
  data: {
    userId?: string;
    role?: string;
    [key: string]: unknown;
  };
  error?: string;
  code?: string;
}
// Versión alternativa si prefieres manejar el token desde localStorage en el cliente
// y pasarlo como parámetro
export async function updateUserRoleWithToken(
  userId: string,
  token: string,
  newRole?: string
): Promise<UpdateUserRoleResult> {
  try {
    const url = `${API_BASE}/users/${userId}`;
    
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const body = newRole ? { role: newRole } : undefined;

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const json = await response.json();

    if (!response.ok || !json.success) {
      const code = json.code || `HTTP_${response.status}`;
      const message = json.message || json.error || `Error ${response.status}`;

      return {
        success: false,
        data: {},
        error: message,
        code: code
      };
    }

    return {
      success: true,
      data: json.data
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error de red";
    
    return {
      success: false,
      data: {},
      error: errorMessage,
      code: "FETCH_ERROR"
    };
  }
}