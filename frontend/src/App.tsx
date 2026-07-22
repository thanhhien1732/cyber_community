import RootPage from "@/components/root-page/RootPage";
import Template from "@/template/template";
import AdminLayout from "@/layouts/admin-layout/AdminLayout";
import AuthLayout from "@/layouts/auth-layout/AuthLayout";
import ClientLayout from "@/layouts/client-layout/ClientLayout";
import Dashboard from "@/page/admin/dashboard/Dashboard";
import Permission from "@/page/admin/permission/Permission";
import Role from "@/page/admin/role/Role";
import RoleDetail from "@/page/admin/role/role-detail/RoleDetail";
import Login from "@/page/auth/login/Login";
import LoginCallback from "@/page/auth/login/login-callback/LoginCallback";
import Register from "@/page/auth/register/Register";
import Home from "@/page/home/Home";
import { Profile } from "@/page/profile/Profile";
import Setting from "@/page/setting/Setting";
import Test from "@/page/test/Test";
import UserDetail from "@/page/user/user-detail/UserDetail";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

function AuthRouteLayout() {
   return (
      <AuthLayout>
         <Outlet />
      </AuthLayout>
   );
}

function ClientRouteLayout() {
   return (
      <ClientLayout>
         <Template protect>
            <Outlet />
         </Template>
      </ClientLayout>
   );
}

function AdminRouteLayout() {
   return (
      <AdminLayout>
         <Template protect>
            <Outlet />
         </Template>
      </AdminLayout>
   );
}

const page = (content: React.ReactNode) => <RootPage>{content}</RootPage>;

export default function App() {
   return (
      <Routes>
         <Route element={<AuthRouteLayout />}>
            <Route path="/login" element={<Template>{page(<Login />)}</Template>} />
            <Route path="/register" element={<Template>{page(<Register />)}</Template>} />
         </Route>

         <Route element={<ClientRouteLayout />}>
            <Route index element={page(<Home />)} />
            <Route path="profile" element={page(<Profile />)} />
            <Route path="setting" element={page(<Setting />)} />
            <Route path="user/:id" element={page(<UserDetail />)} />
         </Route>

         <Route path="/admin" element={<AdminRouteLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={page(<Dashboard />)} />
            <Route path="permission" element={page(<Permission />)} />
            <Route path="role" element={page(<Role />)} />
            <Route path="role/:id" element={page(<RoleDetail />)} />
         </Route>

         <Route path="/login-callback" element={page(<LoginCallback />)} />
         <Route path="/test" element={<Test />} />
         <Route path="*" element={<div>Not Found</div>} />
      </Routes>
   );
}
