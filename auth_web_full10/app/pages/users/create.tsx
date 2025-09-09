import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as userService from "~/services/user.service";
import * as roleService from "~/services/role.service";
import MyInput from "~/components/my.input";
import MyMultiSelect from "~/components/my.multiselect";
import type { User, Role } from "~/models";

export default function UserCreatePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useEffect(() => {
    roleService
      .getList()
      .then((roles) => {
        setAvailableRoles(roles);
      })
      .catch((error) => {
        console.error("Erro ao buscar roles:", error);
      });
  }, []);

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
    if (username === "") {
      alert("Login é obrigatório");
      return;
    }
    if (password === "") {
      alert("Senha é obrigatória");
      return;
    }
    if (password !== confirmPass) {
      alert("Senha não confere");
      return;
    }

    const newUser: User = {
      name,
      username,
      password,
      roles: selectedRoles,
    };

    userService
      .create(newUser)
      .then((result) => {
        if (result === true) {
          goBack();
        } else if (result === false) {
          alert("Login já existe!");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Erro ao criar usuário:", error);
        alert("Ocorreu um erro ao salvar o usuário.");
      });
  }

  return (
    <div className="page">
      <header>
        <h3>Novo Usuário</h3>
      </header>

      <main>
        <MyInput title="Nome" value={name} change={setName} />
        <MyInput title="Login" value={username} change={setUsername} />
        <MyInput
          type="password"
          title="Senha"
          value={password}
          change={setPassword}
        />
        <MyInput
          type="password"
          title="Confirmar Senha"
          value={confirmPass}
          change={setConfirmPass}
        />

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
