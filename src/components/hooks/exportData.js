
export const useDatosExportados = (datos) => {

    const datosExportar = datos === 0 ? '':
     datos.map(({ name_event, date, hour }) => ({
      Events: name_event, // Reemplazar "name_event" con "boton"
      Dates: new Date(date).toLocaleDateString(), // Formatear "date" según el formato deseado
      Hours: hour.substring(0, 5), // Formatear "hour" según el formato deseado
    }));
    
    return datosExportar;
};