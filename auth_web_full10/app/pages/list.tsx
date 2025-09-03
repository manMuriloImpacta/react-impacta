import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import type { User, Role } from "~/models";
import * as userService from "~/services/user.service";
import * as roleService from "~/services/role.service";

export default function ListUserPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  const fetchUsers = () => {
    userService
      .getList()
      .then((list) => {
        setUsers(list ? list : []);
      })
      .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
        navigate("/");
      });
  };

  const fetchRoles = () => {
    roleService
      .getList()
      .then((list) => {
        setRoles(list ? list : []);
      })
      .catch((error) => {
        console.error("Erro ao buscar roles:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const update = (user: User) => {
    navigate(`/users/${user.id}`);
  };

  const remove = (user: User) => {
    userService.remove(user.id!).then((result) => {
      if (result === true) {
        fetchUsers();
      } else {
        navigate("/");
      }
    });
  };

  const updateRole = (role: Role) => {
    navigate(`/roles/${role.id}`);
  };

  const removeRole = (role: Role) => {
    roleService.remove(role.id!).then((result) => {
      if (result === true) {
        fetchRoles();
      } else {
        alert("Role não encontrada!");
      }
    });
  };

  return (
    <div className="page">
           {" "}
      <header>
                <h3>Listagem de Usuários e Roles</h3>     {" "}
      </header>
           {" "}
      <main style={{ alignItems: "flex-start" }}>
               {" "}
        <div style={{ display: "flex", gap: "10px" }}>
                    <NavLink to="/users/create">Adicionar Usuário</NavLink>     
              <NavLink to="/roles/create">Gerenciar Roles</NavLink>       {" "}
        </div>
               {" "}
        <div style={{ marginTop: "20px", width: "100%" }}>
                    <h4>Usuários</h4>         {" "}
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                  width: "100%",
                  borderRadius: "4px",
                }}
              >
                               {" "}
                <div style={{ fontWeight: "bold" }}>{user.name}</div>           
                   {" "}
                {user.roles && user.roles.length > 0 && (
                  <p style={{ fontSize: "0.9rem", color: "#fff" }}>
                                        Roles: {user.roles.join(", ")}         
                           {" "}
                  </p>
                )}
                               {" "}
                <div style={{ display: "flex", gap: "5px" }}>
                                   {" "}
                  <button onClick={() => update(user)} className="blue">
                                        Editar                  {" "}
                  </button>
                                   {" "}
                  <button onClick={() => remove(user)} className="red">
                                        Remover                  {" "}
                  </button>
                                 {" "}
                </div>
                             {" "}
              </div>
            ))
          ) : (
            <p>Nenhum usuário cadastrado.</p>
          )}
                 {" "}
        </div>
               {" "}
        <div
          style={{
            width: "100%",
            borderTop: "1px solid #ccc",
            margin: "20px 0",
          }}
        ></div>
               {" "}
        <div style={{ width: "100%" }}>
                    <h4>Roles Existentes</h4>         {" "}
          {roles.length > 0 ? (
            roles.map((role) => (
              <div
                key={role.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  marginBottom: "10px",
                  width: "100%",
                  borderRadius: "4px",
                }}
              >
                                <strong>{role.name} </strong> -{" "}
                {role.description}               {" "}
                <p style={{ fontSize: "0.9rem", color: "#555" }}></p>           
                   {" "}
                <div style={{ display: "flex", gap: "5px" }}>
                                   {" "}
                  <button onClick={() => updateRole(role)} className="blue">
                                        Editar                  {" "}
                  </button>
                                   {" "}
                  <button onClick={() => removeRole(role)} className="red">
                                        Remover                  {" "}
                  </button>
                                 {" "}
                </div>
                             {" "}
              </div>
            ))
          ) : (
            <p>Nenhuma role cadastrada.</p>
          )}
                 {" "}
        </div>
             {" "}
      </main>
           {" "}
      <footer>
                Temos {users.length} usuários e {roles.length} roles
        cadastrados.      {" "}
      </footer>
         {" "}
    </div>
  );
}
