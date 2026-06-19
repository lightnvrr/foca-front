const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export type Role = "PROFESSOR" | "COORDENADOR";

export interface CriarMembroPayload {
  nome: string;
  email: string;
  senha: string;
  role: Role;
  escola_id?: number;
}

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  role: Role;
  ativo: boolean;
  criado_em: string;
}

export async function criarMembro(
  data: CriarMembroPayload
): Promise<UsuarioResponse> {
  const res = await fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      (err as { message?: string }).message ?? `Erro ${res.status}`
    );
  }

  return res.json() as Promise<UsuarioResponse>;
}
