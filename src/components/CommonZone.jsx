import React, { useState, useEffect, useContext } from "react";
import "../cssComponents/AdminManagement.css"; // O usa Tailwind si prefieres
import Header from "./Header"
import { CommonZoneContext } from "../contexts/CommonZone.context";
import { Link } from 'react-router-dom';

function ZonaComun() {
  const {
    commonZone,
    getCommonZone,
    createCommonZone,
    updateCommonZone,
    deleteCommonZone,
    findCommonZoneByName,
    error,
    loading
  } = useContext(CommonZoneContext);

  const [filteredCommonZone, setFilteredCommonZone] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    peopleCapacity: "",
    usageTime: "",
    usingTimeUnit: "",
    rule: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
      getCommonZone();
    }, []);

  useEffect(() => {
    if(searchTerm.trim()=== ""){
      setFilteredCommonZone(commonZone);
    }else{
      findCommonZoneByName(searchTerm).then((results) => {
        setFilteredCommonZone(results);
      });
    }
  }, [searchTerm, commonZone]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.peopleCapacity) return;

    const payload = {
      name: form.name,
      description: form.description,
      peopleCapacity: form.peopleCapacity,
      usageTime: form.usageTime,
      usingTimeUnit: form.usingTimeUnit,
      rule: form.rule
    };
    
    if(isEditing && form.id){
      await updateCommonZone (form.id, payload);
    }else{
      await createCommonZone(payload);
    }

    await getCommonZone();

    setForm({id: null, name: "", description: "", peopleCapacity: "", usageTime: "", usingTimeUnit: "", rule: ""})
    setIsEditing(false);
  };

  const handleEdit = (commonZone) => {
    setForm({
      id: commonZone.id || "",
      name: commonZone.name || "",
      description: commonZone.description || "",
      peopleCapacity: commonZone.peopleCapacity || "",
      usageTime: commonZone.usageTime || "",
      usingTimeUnit: commonZone.usingTimeUnit || "",
      rule: commonZone.rule || ""
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta zona común?")) {
      await deleteCommonZone(id);
      await getCommonZone();
    }
  };
  return (
    <>
        <Header />
        <div className="admin-management-container">
          <Link className="ButtonLogOut" to={"/"}>
            Cerrar Sesión
          </Link>
        <h2>Gestión de Zonas Comunes</h2>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={form.name}
              onChange={handleInputChange}
              required
            />
          <input
              type="description"
              name="description"
              placeholder="Descripciòn"
              value={form.description}
              onChange={handleInputChange}
            />
            <input
              type="peopleCapacity"
              name="peopleCapacity"
              placeholder="Capacidad de Personas"
              value={form.peopleCapacity}
              onChange={handleInputChange}
              required
            />
            {/* Poner Tiempo de uso, ya que no se sabe si se tendrà horas fijas o que el usuario ponga la hora */}

            <input
              type="norms"
              name="norms"
              placeholder="Normas De Uso"
              value={form.rule}
              onChange={handleInputChange}
              required
            />
            
            <button type="submit">{isEditing ? "Actualizar" : "Crear"}</button>

            {/* 🔍 Buscador */}
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </form>
          {loading && <p>Cargando Zonas...</p>}
          {error && <p style={{ color: "red" , margin: 10}}>{error}</p>}

          {/* 📋 Lista */}
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Capacidad</th>
                <th>Reglas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCommonZone?.map((commonZone) => (
                <tr key={commonZone.id}>
                  <td>{commonZone.name}</td>
                  <td>{commonZone.description}</td>
                  <td>{commonZone.peopleCapacity0}</td>
                  <td>
                    <button onClick={() => handleEdit(admin)}>Editar</button>
                    <button onClick={() => handleDelete(admin.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            
        </div>
    </>
  )
}

export default ZonaComun