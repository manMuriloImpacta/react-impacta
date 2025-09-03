import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import type { Role } from "~/models";
import * as roleService from "~/services/role.service";

export default function UpdateRolePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [role, setRole] = useState<Role>({
    id: parseInt(id!, 10),
    name: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      roleService
        .get(parseInt(id, 10))
        .then((foundRole) => {
          if (foundRole) {
            setRole(foundRole);
          } else {
            alert("Role não encontrada!");
            navigate("/users");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar a role:", error);
          navigate("/users");
        });
    }
  }, [id, navigate]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setRole((prevRole) => ({
      ...prevRole,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    roleService
      .update(role)
      .then(() => {
        navigate("/users");
      })
      .catch((error) => {
        console.error("Erro ao atualizar a role:", error);
        alert("Erro ao atualizar a role. Tente novamente.");
      });
  }

  return (
    <div className="page">
      <header>
        <h3>Atualizar Role</h3>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="div-input">
            <input
              type="text"
              name="name"
              placeholder="Nome da Role"
              value={role.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="div-input">
            <input
              type="text"
              name="description"
              placeholder="Descrição"
              value={role.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="div-input">
            <button type="submit" className="blue">
              Salvar
            </button>
            <NavLink to="/users" className="red">
              Cancelar
            </NavLink>
          </div>
        </form>
      </main>
    </div>
  );
}
