import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/login.tsx"),
  route("users", "pages/list.tsx"),
  route("users/create", "pages/users/create.tsx"),
  route("users/:id", "pages/users/update.tsx"),
  route("roles/create", "pages/roles/create.tsx"),
  route("roles/:id", "pages/roles/update.tsx"),
] satisfies RouteConfig;
