import api from './Api.ts';

export type Etl = {
    id: number;
    nombre: string;
    tipo: string;
    descripcion: string;
    createdAt: string;
    updatedAt: string;
};

export type CrearEtlPayload = {
    nombre: string;
    tipo: string;
    descripcion: string;
};

export type CrearEtlResponse = {
    id: number;
    nombre: string;
    tipo: string;
    descripcion: string;
    createdAt: string;
    updatedAt: string;
    mensaje: string;
};

export type ActualizarEtlPayload = {
    nombre: string;
    tipo: string;
    descripcion: string;
};


export const getTodosLosEtls = async (token: string): Promise<Etl[]> => {
    const response = await api.get('/etls', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const crearEtl = async (
    nuevoEtl: CrearEtlPayload,
    token: string
): Promise<CrearEtlResponse> => {
    const response = await api.post<CrearEtlResponse>('/etls', nuevoEtl, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const actualizarEtl = async (
    idEtl: number,
    datos: ActualizarEtlPayload,
    token: string
): Promise<{ mensaje: string }> => {
    const response = await api.put<{ mensaje: string }>(`/etls/${idEtl}`, datos, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const eliminarEtl = async (
    idEtl: number,
    token: string
): Promise<{ mensaje: string }> => {
    const response = await api.delete<{ mensaje: string }>(`/etls/${idEtl}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

