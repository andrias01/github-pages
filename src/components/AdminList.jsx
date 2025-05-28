import React, { useEffect, useState } from "react";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAdmin = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://victus-api-9g73.onrender.com/victusresidenciasEasy/api/v1/administradores/todos");
      if (!res.ok) throw new Error("No se pudo obtener la lista de administradores");

      const data = await res.json();
      setAdmins(data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error al cargar administradores:", err);
      setError("No se pudo cargar la lista de administradores. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Lista de Administradores</h2>

      {loading && <p>Cargando administradores...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {admins.map((admin) => (
        <div
          key={admin.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><strong>ID:</strong> {admin.id}</p>
          <p><strong>Nombre:</strong> {admin.nombre}</p>
          <p><strong>Correo:</strong> {admin.correo}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminList;
