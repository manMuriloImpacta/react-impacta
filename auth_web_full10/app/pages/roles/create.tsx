import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import type { Role } from "~/models";
import * as roleService from "~/services/role.service";

export default function CreateRolePage() {
  const navigate = useNavigate();

  const [role, setRole] = useState<Role>({
    name: "",
    description: "",
  });

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
      .create(role)
      .then((result) => {
        if (result === true) {
          navigate("/users");
        } else if (result === false) {
          alert("Erro ao criar a role. Tente novamente.");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Erro ao criar a role:", error);
        navigate("/");
      });
  }

  return (
    <div className="page">
      <header>
        <h3>Criar Nova Role</h3>
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
