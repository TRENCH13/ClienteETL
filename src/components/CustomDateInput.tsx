import { forwardRef } from "react";

type Props = {
    value?: string;
    onClick?: () => void;
};

const CustomDateInput = forwardRef<HTMLDivElement, Props>(({ value, onClick }, ref) => {
    return (
        <div
            ref={ref}
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: 20,
                padding: '8px 14px',
                backgroundColor: '#fff',
                width: 180,
                cursor: 'pointer',
                userSelect: 'none',
            }}
        >
            <img
                src="/calendar-icon.svg" // Asegúrate de tener este ícono en tu carpeta public
                alt="calendar"
                style={{ width: 18, height: 18, marginRight: 8 }}
            />
            <span style={{ color: '#999', fontSize: 14 }}>
                {value || 'Selecciona una fecha'}
            </span>
        </div>
    );
});

export default CustomDateInput;
