import type { Role } from "~/models";
import { getLoggedUser } from "./auth.service";

const URL_BASE = "http://localhost:3030/roles";

export async function getList() {
  const logged = getLoggedUser();

  if (!logged || !logged.token) {
    throw new Error("Usuário não autenticado.");
  }

  const response = await fetch(URL_BASE, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${logged?.token}`,
    },
  });

  if (response.status === 200) {
    const data: Role[] = await response.json();
    return data;
  }

  throw new Error(response.statusText);
}

export async function create(role: Role) {
  const logged = getLoggedUser();

  const response = await fetch(URL_BASE, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${logged?.token}`,
    },
    body: JSON.stringify(role),
  });

  if (response.status === 201) {
    return true;
  } else if (response.status === 400) {
    return false;
  } else {
    return null;
  }
}

export async function get(id: number) {
  const logged = getLoggedUser();

  const response = await fetch(`${URL_BASE}/${id}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${logged?.token}`,
    },
  });

  if (response.status === 200) {
    return await response.json();
  } else {
    throw Error(response.statusText);
  }
}

export async function update(role: Role) {
  const logged = getLoggedUser();

  console.log("Entrou aqui");

  const response = await fetch(`${URL_BASE}/${role.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${logged?.token}`,
    },
    body: JSON.stringify(role),
  });

  if (response.status !== 200) {
    throw Error(response.statusText);
  }
}

export async function remove(id: number) {
  const logged = getLoggedUser();

  const response = await fetch(`${URL_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${logged?.token}`,
    },
  });

  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}
