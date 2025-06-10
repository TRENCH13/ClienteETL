import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NewUserScreen from './NewUserScreen';
import { ThemeProvider } from '../../context/ThemeContext';
import * as EtlService from '../../services/EtlService';
import * as UsuarioService from '../../services/UsuarioService';
import { MemoryRouter, useNavigate } from 'react-router-dom';

// Mocks de los servicios
vi.mock('../../services/EtlService', () => ({
    getTodosLosEtls: vi.fn(),
}));

vi.mock('../../services/UsuarioService', () => ({
    crearNuevoUsuario: vi.fn(),
}));

vi.mock('react-router-dom', async (mod) => {
    const actual = await vi.importActual<typeof mod>('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

describe('NewUserScreen', () => {
    const mockNavigate = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
        vi.spyOn(window, 'alert').mockImplementation(() => {});
        (useNavigate as any).mockReturnValue(mockNavigate);
    });

    const renderPantalla = () => {
        return render(
            <MemoryRouter>
                <ThemeProvider>
                    <NewUserScreen />
                </ThemeProvider>
            </MemoryRouter>
        );
    };

    it('renderiza la pantalla correctamente', async () => {
        (EtlService.getTodosLosEtls as vi.Mock).mockResolvedValue([]);
        renderPantalla();
        expect(await screen.findByText('Crea un Nuevo Usuario')).toBeInTheDocument();
    });

    it('permite guardar un usuario con un ETL seleccionado', async () => {
        localStorage.setItem('token', '123');
        localStorage.setItem('user', JSON.stringify({ rol: 'Consultor' }));

        (EtlService.getTodosLosEtls as vi.Mock).mockResolvedValue([
            { id: 1, nombre: 'ETL Test' },
        ]);
        (UsuarioService.crearNuevoUsuario as vi.Mock).mockResolvedValue({
            mensaje: 'Usuario creado',
            idUsuario: 123,
            etlIdsAsignados: [1],
        });

        renderPantalla();

        fireEvent.change(await screen.findByPlaceholderText('Usuario del directorio activo'), {
            target: { value: 'nuevo.usuario' },
        });

        fireEvent.click(await screen.findByText(/habilitar todos/i));
        fireEvent.click(screen.getByText(/guardar usuario/i));

        await waitFor(() => {
            expect(UsuarioService.crearNuevoUsuario).toHaveBeenCalledWith(
                {
                    nombreUsuario: 'nuevo.usuario',
                    rol: 'Consultor',
                    etlIds: [1],
                },
                '123'
            );
            expect(window.alert).toHaveBeenCalled();
        });
    });

    it('no guarda si el nombre está vacío', async () => {
        localStorage.setItem('token', '123');
        localStorage.setItem('user', JSON.stringify({ rol: 'Consultor' }));

        (EtlService.getTodosLosEtls as vi.Mock).mockResolvedValue([
            { id: 1, nombre: 'ETL Test' },
        ]);

        renderPantalla();

        fireEvent.click(await screen.findByText(/habilitar todos/i));
        fireEvent.click(screen.getByText(/guardar usuario/i));

        await waitFor(() => {
            expect(UsuarioService.crearNuevoUsuario).not.toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledWith('El nombre de usuario no puede estar vacío.');
        });
    });

    it('no guarda si ningún ETL está seleccionado', async () => {
        localStorage.setItem('token', '123');
        localStorage.setItem('user', JSON.stringify({ rol: 'Consultor' }));

        (EtlService.getTodosLosEtls as vi.Mock).mockResolvedValue([
            { id: 1, nombre: 'ETL Test' },
        ]);

        renderPantalla();

        fireEvent.change(await screen.findByPlaceholderText('Usuario del directorio activo'), {
            target: { value: 'sin.etl' },
        });

        fireEvent.click(screen.getByText(/guardar usuario/i));

        await waitFor(() => {
            expect(UsuarioService.crearNuevoUsuario).not.toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledWith('Debes seleccionar al menos un ETL.');
        });
    });

    it('redirige al finalizar correctamente', async () => {
        localStorage.setItem('token', '123');
        localStorage.setItem('user', JSON.stringify({ rol: 'Consultor' }));

        (EtlService.getTodosLosEtls as vi.Mock).mockResolvedValue([
            { id: 1, nombre: 'ETL Test' },
        ]);

        (UsuarioService.crearNuevoUsuario as vi.Mock).mockResolvedValue({
            mensaje: 'Usuario creado',
            idUsuario: 123,
            etlIdsAsignados: [1],
        });

        renderPantalla();

        fireEvent.change(await screen.findByPlaceholderText('Usuario del directorio activo'), {
            target: { value: 'nuevo.usuario' },
        });

        fireEvent.click(await screen.findByText(/habilitar todos/i));
        fireEvent.click(screen.getByText(/guardar usuario/i));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalled();
        });
    });
});
