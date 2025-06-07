import api from "./Api.ts";

type LoginRequest = {
    nombreUsuario: string;
};

type UserData = {
    id: number;
    nombre: string;
    rol: string;
};

type LoginResponse = {
    mensaje: string;
    token: string;
    usuario: UserData;
};

interface AxiosErrorWithResponse {
    response: {
        status: number;
        data?: {
            mensaje?: string;
        };
    };
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/auth/login', data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'response' in error
        ) {
            const err = error as AxiosErrorWithResponse;
            const { status, data } = err.response;

            if (status === 401) {
                throw {
                    code: 401,
                    message: 'Credenciales incorrectas.',
                };
            }

            throw {
                code: status,
                message: data?.mensaje || 'Error desconocido al iniciar sesión.',
            };
        }

        throw {
            code: 0,
            message: 'No hay conexión con el servidor.',
        };
    }
};
