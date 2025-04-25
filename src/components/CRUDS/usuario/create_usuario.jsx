import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/body.css";

const C_usuario = () => {
    const [usuario, setUsuario] = useState({
        nombre: "",
        ap_pat: "",
        ap_mat: "",
        email: "",
        password: "",
        n_tel: "",
        id_tipo: "",
        id_vehiculo: ""
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario(prevState => ({
            ...prevState,
            [name]: value,
            ...(name === "id_tipo" && (value === "2" || value === "3") ? { id_vehiculo: "1" } : {})
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoints = [
                { name: "Servidor 1 (3.88.222.39)", url: "https://3.88.222.39/api/usuario" },
                { name: "Servidor 2 (api.navtracker.xdn.com.mx)", url: "https://api.navtracker.xdn.com.mx/api/usuario/" }
            ];

            const requests = endpoints.map(endpoint =>
                axios.post(endpoint.url, usuario)
                    .then(() => ({ name: endpoint.name, status: "success" }))
                    .catch(() => ({ name: endpoint.name, status: "error" }))
            );

            const results = await Promise.all(requests);

            const successful = results.filter(r => r.status === "success");
            const failed = results.filter(r => r.status === "error");

            if (successful.length > 0) {
                let message = "✅ Usuario registrado correctamente en:\n";
                successful.forEach(s => {
                    message += `- ${s.name}\n`;
                });

                if (failed.length > 0) {
                    message += "\n❌ Falló el registro en:\n";
                    failed.forEach(f => {
                        message += `- ${f.name}\n`;
                    });
                }

                alert(message);

                setUsuario({
                    nombre: "",
                    ap_pat: "",
                    ap_mat: "",
                    email: "",
                    password: "",
                    n_tel: "",
                    id_tipo: "",
                    id_vehiculo: ""
                });

                navigate('/login');
            } else {
                alert("❌ No se pudo registrar el usuario en ninguno de los servidores.");
            }

        } catch (error) {
            console.error("Error inesperado al registrar usuario", error);
            alert("Error inesperado al registrar usuario");
        }
    };

    const handleNavigate = () => {
        navigate('/excel_usuario'); 
    };

    return (
        <div className="container mb-0">
            <h2 className="text-center mb-4">Registro de Usuario</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre" 
                        value={usuario.nombre} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="ap_pat" 
                        placeholder="Apellido Paterno" 
                        value={usuario.ap_pat} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="ap_mat" 
                        placeholder="Apellido Materno" 
                        value={usuario.ap_mat} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="tel" 
                        name="n_tel" 
                        placeholder="Teléfono" 
                        value={usuario.n_tel} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <select 
                        name="id_tipo" 
                        value={usuario.id_tipo} 
                        onChange={handleChange} 
                        required 
                        className="form-select"
                    >
                        <option value="">Tipo de usuario</option>
                        <option value="1">Conductor</option>
                        <option value="2">Pasajero</option>
                        <option value="3">Administrador</option>
                    </select>
                </div>

                {usuario.id_tipo === "1" && (
                    <div className="mb-3">
                        <select 
                            name="id_vehiculo" 
                            value={usuario.id_vehiculo} 
                            onChange={handleChange} 
                            required 
                            className="form-select"
                        >
                            <option value="">Tipo de vehículo</option>
                            <option value="1">Automóvil</option>
                            <option value="2">Autobús</option>
                        </select>
                    </div>
                )}

                <div className="mb-3">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={usuario.email} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Contraseña" 
                        value={usuario.password} 
                        onChange={handleChange} 
                        required 
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn w-100 mb-3" style={{ color: "white", backgroundColor: "#1F6527" }}>
                    Registrar Usuario
                </button>
            </form>
        </div>
    );
};

export default C_usuario;
