
export type Language = 'en' | 'es';

export const translations = {
  en: {
    title: 'ApexTune Telemetry',
    subtitle: 'Racing Setup Manager',
    newSetup: 'New Setup',
    saveSetup: 'Save Configuration',
    editSetup: 'Edit Setup',
    deleteSetup: 'Delete',
    cancel: 'Cancel',
    dashboard: 'Dashboard',
    noSetups: 'No configurations found. Start by creating a new one.',
    
    // Form Labels
    name: 'Setup Name',
    car: 'Vehicle Model',
    track: 'Circuit / Track',
    tirePressure: 'Tire Pressures (PSI)',
    aerodynamics: 'Aerodynamics',
    suspension: 'Suspension',
    
    // Detailed Technical Terms
    fl: 'Front Left',
    fr: 'Front Right',
    rl: 'Rear Left',
    rr: 'Rear Right',
    frontWing: 'Front Wing Angle',
    rearWing: 'Rear Wing Angle',
    stiffness: 'Spring Stiffness',
    rideHeight: 'Ride Height (mm)',
    
    // Placeholders
    placeholderName: 'e.g. Monza Qualy Run',
    placeholderCar: 'e.g. GT3-R 2024',
    placeholderTrack: 'e.g. Spa-Francorchamps',
    
    // UI
    theme: 'Theme',
    language: 'Language',
    stats: 'Performance Data'
  },
  es: {
    title: 'ApexTune Telemetría',
    subtitle: 'Gestor de Setups',
    newSetup: 'Nuevo Setup',
    saveSetup: 'Guardar Configuración',
    editSetup: 'Editar Setup',
    deleteSetup: 'Eliminar',
    cancel: 'Cancelar',
    dashboard: 'Panel de Control',
    noSetups: 'No se encontraron configuraciones. Comienza creando una nueva.',
    
    // Form Labels
    name: 'Nombre del Setup',
    car: 'Modelo de Vehículo',
    track: 'Circuito / Pista',
    tirePressure: 'Presión de Neumáticos (PSI)',
    aerodynamics: 'Aerodinámica',
    suspension: 'Suspensión',
    
    // Detailed Technical Terms
    fl: 'Delantero Izq.',
    fr: 'Delantero Der.',
    rl: 'Trasero Izq.',
    rr: 'Trasero Der.',
    frontWing: 'Ángulo Alerón Del.',
    rearWing: 'Ángulo Alerón Tras.',
    stiffness: 'Rigidez de Muelles',
    rideHeight: 'Altura al Suelo (mm)',
    
    // Placeholders
    placeholderName: 'ej. Monza Clasificación',
    placeholderCar: 'ej. GT3-R 2024',
    placeholderTrack: 'ej. Spa-Francorchamps',
    
    // UI
    theme: 'Tema',
    language: 'Idioma',
    stats: 'Datos de Rendimiento'
  }
};
