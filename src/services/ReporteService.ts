import api from './Api.ts';

export type Reporte = {
    idReporte: number;
    fechaReporte: string;
    statusReporte: string;
    etl: {
        idEtl: number;
        nombreEtl: string;
        tipoEtl: string;
    };
};

export type DetalleReporte = {
    idReporte: number;
    fechaReporte: string;
    statusReporte: string;
    etl: {
        idEtl: number;
        nombreEtl: string;
        tipoEtl: string;
    };
    detalleProcesamiento?: {
        nombre: string;
        nombreArchivo: string;
        status: string;
        mensaje: string;
    };
    detalleArchivo?: {
        status: string;
        mensaje: string;
    };
    detalleAlerta?: {
        nombre: string;
        hostname: string;
        mensaje: string;
        horario: string;
        tiempoEjecucion: string;
    };
};


export const getReportesDeHoy = async (token: string): Promise<Reporte[]> => {
    const response = await api.get('/reportes/hoy', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const getReportesCriticosNoAcusados = async (token: string) => {
    const response = await api.get('/reportes/criticos-no-acusados', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const acusarReporte = async (idReporte: number, token: string): Promise<any> => {
    const response = await api.post(`/reportes/${idReporte}/acusar`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    });
    return response.data;
};

export const getReportesPorFecha = async (fecha: string, token: string): Promise<Reporte[]> => {
    const response = await api.get('/reportes/por-fecha', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        params: {
            fecha
        }
    });
    return response.data;
};

export const getDetalleReporte = async (
    idReporte: number,
    token: string
): Promise<DetalleReporte> => {
    const response = await api.get(`/reportes/${idReporte}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};
