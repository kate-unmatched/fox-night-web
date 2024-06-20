import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AuthStore from "./store/store.ts";

const PrivateRoute = observer(() => {
    if (AuthStore.isAuthInProgress) {
        return <div>Проверка авторизации...</div>;
    }

    return AuthStore.isAuth ? <Outlet /> : <Navigate to="/" />;
});

export default PrivateRoute;
