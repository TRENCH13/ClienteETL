import api from './Api.ts';

export type Usuario = {
    id: number;
    nombre: string;
    rol: 'Administrador' | 'Consultor';
    createdAt: string;
    updatedAt: string;
    etlAccess?: number;
};

export type NuevoUsuarioPayload = {
    nombreUsuario: string;
    etlIds: number[];
};

export type UsuarioCreadoResponse = {
    idUsuario: number;
    nombreUsuario: string;
    etlIdsAsignados: number[];
    mensaje: string;
};

export type Permiso = {
    idPermiso: number;
    idEtl: number;
    nombreEtl: string;
    descripcionEtl: string;
    tipoEtl: string;
};

export type PermisosDeUsuarioResponse = {
    idUsuario: number;
    nombreUsuario: string;
    permisos: Permiso[];
};


export const getTodosLosUsuarios = async (token: string): Promise<Usuario[]> => {
    const response = await api.get('/usuarios', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    return response.data;
};

export const crearNuevoUsuario = async (
    data: NuevoUsuarioPayload,
    token: string
): Promise<UsuarioCreadoResponse> => {
    const response = await api.post('/usuarios', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const getPermisosDeUsuario = async (
    idUsuario: number,
    token: string
): Promise<PermisosDeUsuarioResponse> => {
    const response = await api.get(`/usuarios/${idUsuario}/permisos`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
};

export const actualizarPermisosUsuario = async (
    idUsuario: number,
    etlIds: number[],
    token: string
): Promise<{ idusuario: number; etlIdsAsignados: number[]; mensaje: string }> => {
    const response = await api.put(`/usuarios/${idUsuario}/permisos`, { etlIds }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};
