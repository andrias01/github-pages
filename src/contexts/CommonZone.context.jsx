import { createContext, useEffect, useState } from "react";

const CommonZoneContext = createContext();

function CommonZoneProviderWrapper(props) {
    const [commonZones, setCommonZones] = useState([]);
    const [filteredCommonZones, setFilteredCommonZones] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    // Obtener todos los administradores
    const getCommonZone = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://backend-victusrenderservidor.onrender.com/victusresidencias/api/v1/administrator/all");
            if (!res.ok) throw new Error("No se pudo obtener la lista de administradores");
      
            const data = await res.json();
            setCommonZones(data.data || []);
            setFilteredCommonZones(data.data || []);
            setError(null); // limpia cualquier error anterior
          } catch (err) {
            console.error("Error al cargar administradores:", err);
            setError("No se pudo cargar la lista de administradores. Intenta más tarde.");
          } finally {
            setLoading(false);
          }
    };

    useEffect(() => {
        getCommonZone();
    }, []);

    // Buscar por nombre
    const filterCommonZones = (name) => {
        const filtered = commonZones.filter(commonZone =>
            commonZone.name.toLowerCase().includes(name.toLowerCase())
        );
        setFilteredCommonZones(filtered);
    };

    const findCommonZonesByName = async (name) => {
        try {
            const response = await fetch("https://backend-victusrenderservidor.onrender.com/victusresidencias/api/v1/administrator/all");
            const data = await response.json();
            const allCommonZones = data.data;

            // Filtra por nombre
            const filtered = allCommonZones.filter((commonZone) =>
                commonZone.name.toLowerCase().includes(name.toLowerCase())
            );

            return filtered;
        } catch (error) {
            console.error("Error filtrando administradores:", error);
            return [];
        }
    };


    // Crear nuevo administrador
    const createCommonZone = async (newCommonZone) => {
        try {
            const response = await fetch("https://backend-victusrenderservidor.onrender.com/victusresidencias/api/v1/administrator/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCommonZone)
            });
            if (response.ok) {
                await getCommonZone();
            }
        } catch (e) {
            console.error("Error al crear administrador:", e);
        }
    };

    // Eliminar un administrador por ID
    const deleteCommonZone = async (id) => {
        try {
            const response = await fetch(`https://backend-victusrenderservidor.onrender.com/victusresidencias/api/v1/administrator/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                await getCommonZone();
            }
        } catch (e) {
            console.error("Error al eliminar administrador:", e);
        }
    };

    // Modificar un administrador por ID
    const updateCommonZone = async (id, updatedData) => {
        try {
            const response = await fetch(`https://backend-victusrenderservidor.onrender.com/victusresidencias/api/v1/administrator/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData)
            });
            if (response.ok) {
                await getCommonZone();
            }
        } catch (e) {
            console.error("Error al actualizar administrador:", e);
        }
    };

    return (
        <CommonZoneContext.Provider value={{
            commonZones,
            filteredCommonZones,
            setCommonZones,
            getCommonZone,
            filterCommonZones,
            createCommonZone,
            deleteCommonZone,
            updateCommonZone,
            findCommonZonesByName,
            error,
            loading,
        }}>
            {props.children}
        </CommonZoneContext.Provider>
    );
}

export { CommonZoneContext, CommonZoneProviderWrapper };
