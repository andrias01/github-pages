import { createContext, useEffect, useState } from "react";

const PropertyContext = createContext();

function PropertyProviderWrapper(props) {
    const [propertys, setPropertys] = useState([]);
    const [filteredPropertys, setFilteredPropertys] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    // Obtener todos los administradores
    const getProperty = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://backend-victusrenderservidor.onrender.com/victusresidencias/api/v1/administrator/all");
            if (!res.ok) throw new Error("No se pudo obtener la lista de administradores");
      
            const data = await res.json();
            setPropertys(data.data || []);
            setFilteredPropertys(data.data || []);
            setError(null); // limpia cualquier error anterior
          } catch (err) {
            console.error("Error al cargar administradores:", err);
            setError("No se pudo cargar la lista de administradores. Intenta más tarde.");
          } finally {
            setLoading(false);
          }
    };

    useEffect(() => {
        getProperty();
    }, []);

    // Buscar por nombre
    const filterPropertys = (name) => {
        const filtered = propertys.filter(property =>
            property.name.toLowerCase().includes(name.toLowerCase())
        );
        setFilteredPropertys(filtered);
    };

    const findPropertysByName = async (name) => {
        try {
            const response = await fetch("https://backend-victusrenderservidor.onrender.com/victusresidencias/api/v1/administrator/all");
            const data = await response.json();
            const allPropertys = data.data;

            // Filtra por nombre
            const filtered = allPropertys.filter((property) =>
                property.name.toLowerCase().includes(name.toLowerCase())
            );

            return filtered;
        } catch (error) {
            console.error("Error filtrando administradores:", error);
            return [];
        }
    };


    // Crear nuevo administrador
    const createProperty = async (newProperty) => {
        try {
            const response = await fetch("https://backend-victusrenderservidor.onrender.com/victusresidencias/api/v1/administrator/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProperty)
            });
            if (response.ok) {
                await getProperty();
            }
        } catch (e) {
            console.error("Error al crear administrador:", e);
        }
    };

    // Eliminar un administrador por ID
    const deleteProperty = async (id) => {
        try {
            const response = await fetch(`https://backend-victusrenderservidor.onrender.com/victusresidencias/api/v1/administrator/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                await getProperty();
            }
        } catch (e) {
            console.error("Error al eliminar administrador:", e);
        }
    };

    // Modificar un administrador por ID
    const updateProperty = async (id, updatedData) => {
        try {
            const response = await fetch(`https://backend-victusrenderservidor.onrender.com/victusresidencias/api/v1/administrator/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData)
            });
            if (response.ok) {
                await getProperty();
            }
        } catch (e) {
            console.error("Error al actualizar administrador:", e);
        }
    };

    return (
        <PropertyContext.Provider value={{
            propertys,
            filteredPropertys,
            setPropertys,
            getProperty,
            filterPropertys,
            createProperty,
            deleteProperty,
            updateProperty,
            findPropertysByName,
            error,
            loading,
        }}>
            {props.children}
        </PropertyContext.Provider>
    );
}

export { PropertyContext, PropertyProviderWrapper };
