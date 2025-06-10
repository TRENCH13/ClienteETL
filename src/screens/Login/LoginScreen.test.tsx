import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginScreen from './LoginScreen';
import { BrowserRouter } from 'react-router-dom';
import * as AuthService from '../../services/AuthService';
import { ThemeProvider } from '../../context/ThemeContext';

vi.mock('../../services/AuthService');

const mockLogin = AuthService.login as vi.Mock;


const renderLogin = () => {
    render(
        <BrowserRouter>
            <ThemeProvider>
                <LoginScreen />
            </ThemeProvider>
        </BrowserRouter>
    );
};

describe('LoginScreen', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        localStorage.clear();
    });

    it('renderiza correctamente', () => {
        renderLogin();
        expect(screen.getByPlaceholderText('user')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
        expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    });

    it('realiza login exitosamente', async () => {
        mockLogin.mockResolvedValue({
            mensaje: 'Usuario creado',
            token: 'abc123',
            usuario: { nombre: 'Juan', rol: 'Consultor' },
        });

        renderLogin();

        const input = screen.getByPlaceholderText('user');
        fireEvent.change(input, { target: { value: 'juan' } });

        const button = screen.getByText('Iniciar Sesión');
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({ nombreUsuario: 'juan' });
        });

        expect(localStorage.getItem('token')).toBe('abc123');
        expect(localStorage.getItem('user')).toContain('Juan');
    });

    it('muestra alerta si login falla con mensaje conocido', async () => {
        mockLogin.mockRejectedValue({ message: 'Credenciales inválidas' });

        window.alert = vi.fn();

        renderLogin();

        const input = screen.getByPlaceholderText('user');
        fireEvent.change(input, { target: { value: 'maria' } });

        const button = screen.getByText('Iniciar Sesión');
        fireEvent.click(button);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith(
                'Error al iniciar sesión, revise sus credenciales o compruebe la conexión con el servidor'
            );
        });
    });

    it('muestra alerta si login falla con error desconocido', async () => {
        mockLogin.mockRejectedValue({});

        window.alert = vi.fn();

        renderLogin();

        const input = screen.getByPlaceholderText('user');
        fireEvent.change(input, { target: { value: 'carlos' } });

        const button = screen.getByText('Iniciar Sesión');
        fireEvent.click(button);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Error desconocido al iniciar sesión');
        });
    });

    it('no llama a login si username está vacío', async () => {
        renderLogin();

        const button = screen.getByText('Iniciar Sesión');
        fireEvent.click(button);

        await waitFor(() => {
            expect(mockLogin).not.toHaveBeenCalled();
        });
    });

    it('cambia el icono de tema entre 🌞 y 🌙', () => {
        renderLogin();
        const icon = screen.getByText('🌙');
        fireEvent.click(icon);
        expect(screen.getByText('🌞')).toBeInTheDocument();
    });
});
