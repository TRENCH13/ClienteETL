vi.mock('../../services/ReporteService', async () => {
    return {
        getReportesDeHoy: vi.fn(),
        getReportesCriticosNoAcusados: vi.fn(),
        acusarReporte: vi.fn(),
    };
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MorningReportScreen from './MorningReportScreen';
import { ThemeProvider } from '../../context/ThemeContext';
import * as ReporteService from '../../services/ReporteService';

const renderWithProviders = () =>
    render(
        <MemoryRouter>
            <ThemeProvider>
                <MorningReportScreen />
            </ThemeProvider>
        </MemoryRouter>
    );

beforeEach(() => {
    localStorage.setItem('token', 'mock-token');
    vi.clearAllMocks();
    vi.spyOn(console, 'warn').mockImplementation((msg) => {
        if (typeof msg === 'string' && msg.includes('"shadow*" style props are deprecated')) return;
        console.warn(msg);
    });
});

describe('MorningReportScreen', () => {
    it('renderiza correctamente con reportes normales y críticos', async () => {
        const mockReportes = [
            {
                idReporte: 1,
                statusReporte: 'Exitoso',
                etl: { idEtl: 101, nombreEtl: 'CargaClientes', tipoEtl: 'Carga' },
            },
        ];

        const mockCriticos = [
            {
                idReporte: 2,
                statusReporte: 'Fallido',
                etl: { idEtl: 102, nombreEtl: 'VentasDiarias', tipoEtl: 'Crítico' },
            },
        ];

        (ReporteService.getReportesDeHoy as vi.Mock).mockResolvedValue(mockReportes);
        (ReporteService.getReportesCriticosNoAcusados as vi.Mock).mockResolvedValue(mockCriticos);

        renderWithProviders();

        expect(await screen.findByText(/Bienvenido/i)).toBeInTheDocument();
        expect(screen.getByText('CargaClientes')).toBeInTheDocument();
    });

    it('muestra mensaje de error si falla la carga de reportes', async () => {
        (ReporteService.getReportesDeHoy as vi.Mock).mockRejectedValue(new Error('Error'));
        (ReporteService.getReportesCriticosNoAcusados as vi.Mock).mockResolvedValue([]);

        renderWithProviders();

        expect(await screen.findByText(/No se pudo conectar/i)).toBeInTheDocument();
    });

    it('muestra mensaje si no hay reportes del día', async () => {
        (ReporteService.getReportesDeHoy as vi.Mock).mockResolvedValue([]);
        (ReporteService.getReportesCriticosNoAcusados as vi.Mock).mockResolvedValue([]);

        renderWithProviders();

        expect(await screen.findByText(/no hay reportes disponibles/i)).toBeInTheDocument();
    });

});
