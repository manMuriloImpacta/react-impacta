import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as userService from "../../services/user.service";
import * as roleService from "../../services/role.service";
import MyInput from "../../components/my.input";
import type { User, Role } from "~/models";
import MyMultiSelect from "~/components/my.multiselect";

export default function UserUpdatePage() {
  const navigate = useNavigate();
  const params = useParams();
  const userId = Number(params.id);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useEffect(() => {
    // Fetch user data
    userService
      .get(userId)
      .then((data) => {
        setName(data.name);
        setUsername(data.username);
        setSelectedRoles(data.roles || []);
      })
      .catch((error) => {
        navigate("/");
      });

    // Fetch all available roles
    roleService
      .getList()
      .then((roles) => {
        setAvailableRoles(roles);
      })
      .catch((error) => {
        console.error("Erro ao buscar roles:", error);
      });
  }, [userId, navigate]);

  function goBack() {
    navigate(-1);
  }

  function handleRoleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const options = event.target.options;
    const value: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedRoles(value);
  }

  function save() {
    if (name === "") {
      alert("Nome é obrigatório");
      return;
    }

    const user: User = { id: userId, name, username, roles: selectedRoles };

    userService
      .update(user)
      .then(() => {
        goBack();
      })
      .catch((error) => {
        alert("Login já existe!");
        navigate("/");
      });
  }

  return (
    <div className="page">
      <header>
        <h3>Alterar Usuário</h3>
      </header>

      <main>
        <MyInput title="Login" value={username} change={setUsername} readOnly />
        <MyInput title="Nome" value={name} change={setName} />
        <MyMultiSelect
          title="Roles"
          options={availableRoles}
          selectedValues={selectedRoles}
          onChange={handleRoleChange}
        />
      </main>

      <footer>
        <button className="gray" onClick={goBack}>
          Cancelar
        </button>
        <button className="green" onClick={save}>
          Salvar
        </button>
      </footer>
    </div>
  );
}
