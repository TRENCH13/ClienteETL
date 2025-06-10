# Cliente de Monitoreo de ETLs para Chedraui

Este proyecto es la interfaz web del sistema de monitoreo de procesos ETL desarrollado para Chedraui. Su objetivo es centralizar y visualizar de manera eficiente los reportes de ejecución de los procesos ETL, eliminando la dependencia del correo electrónico y mejorando la supervisión matutina de estos procesos críticos.

## Características

- Visualización en tiempo real de reportes ETL
- Gestión de accesos por usuario y permisos de visualización
- Soporte para tema claro y oscuro
- Tabla reutilizable para distintos reportes
- Integración con servicios API para carga de datos

## Tecnologías

- [React](https://reactjs.org/) con [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Native Web](https://necolas.github.io/react-native-web/)
- [Axios](https://axios-http.com/) para consumo de APIs
- [MUI Date Pickers](https://mui.com/x/react-date-pickers/) para selección de fechas

## Instalación y ejecución en desarrollo

1. **Clona el repositorio**

El primer paso es clonar el repositorio dentro de la máquina deseada

```bash
git clone https://github.com/tu-usuario/cliente-monitor-etl.git
cd cliente-monitor-etl
```

2. **Instala las dependencias**

Este sistema funciona mediante paquetes npm que permite obtener ciertos componentes, por lo que es necesario instalar
los paquetes para que pueda correr la aplicación

```bash
npm install
```

3. **Ejecuta la aplicación o pruebas**

Una vez instalados los paquetes npm, si se desea iniciar la aplicación para su uso normal es necesario usar este comando:

```bash
npm run
```

Si se desea ejecutar las pruebas automatizadas (igualmente es necesario tener los paquetes npm previamente instalados):

```bash
npm run test
```

## Scripts disponibles

- `npm run dev`: Inicia la aplicación en modo desarrollo
- `npm run `: Inicia la aplicación
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la versión de producción
- `npm run test`: Ejecuta las pruebas automatizadas
- `npm run lint`: Ejecuta ESLint para verificar errores de estilo y sintaxis

## Estructura del Proyecto

```plaintext
├── src/
│   ├── components/        # Componentes reutilizables
│   ├── context/           # Contextos globales (tema, usuario)
│   ├── screens/           # Vistas del sistema
│   ├── services/          # Comunicación con el API del Monitoreo
│   └── App.tsx            # Punto de entrada de la aplicación
├── public/
├── vite.config.ts
└── package.json
```

## Requisitos

- Node.js 18 o superior
- Navegador moderno compatible (Chrome, Firefox, Edge, Safari)


---

Para más información sobre el backend o integración con otros servicios, consulta la documentación del proyecto principal o contacta con el equipo de desarrollo.