import { render, screen, waitFor } from '@testing-library/react';
import LogBookScreen from './LogBookScreen';
import { vi } from 'vitest';
import * as ReporteService from '../../services/ReporteService';
import { ThemeProvider } from '../../context/ThemeContext';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

// Mock localStorage
vi.stubGlobal('localStorage', {
    getItem: vi.fn((key) => {
        if (key === 'token') return 'fake-token';
        if (key === 'user') return JSON.stringify({ rol: 'Administrador' }); // Simula objeto válido
        return null;
    }),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
});

vi.mock('../../services/ReporteService', () => ({
    getReportesPorFecha: vi.fn(),
}));

function renderWithProviders() {
    return render(
        <BrowserRouter>
            <ThemeProvider>
                <LogBookScreen />
            </ThemeProvider>
        </BrowserRouter>
    );
}

describe('LogBookScreen', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('muestra título correctamente', () => {
        renderWithProviders();
        expect(screen.getAllByText(/Bitácora de Reportes/i)[0]).toBeInTheDocument();
    });

    it('muestra mensaje si no hay reportes', async () => {
        vi.mocked(ReporteService.getReportesPorFecha).mockResolvedValueOnce([]);
        renderWithProviders();
        await waitFor(() => {
            expect(
                screen.getByText(/No hay reportes para la fecha seleccionada/i)
            ).toBeInTheDocument();
        });
    });

    it('muestra mensaje si hay error en la carga', async () => {
        vi.mocked(ReporteService.getReportesPorFecha).mockRejectedValueOnce(new Error('Error'));
        renderWithProviders();
        await waitFor(() => {
            expect(
                screen.getByText(/No se pudo conectar con el servidor/i)
            ).toBeInTheDocument();
        });
    });


});
