import "./App.css";
import { useEffect, FC, useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import AuthStore from "./store/store.ts";
import PrivateRoute from "./privateRoute.tsx";
import LoginPage from "./views/login-page";
import UsersPage from "./views/users-page";
import AuditPage from "./views/audit-page";
import NewsPage from "./views/news-page";
import InfoPage from "./views/info-page";
import ProfilePage from "./views/profile-page";
import WorktimePage from "./views/worktime-page";
import { QueryClient, QueryClientProvider } from "react-query";

const App: FC = observer(() => {
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');
    const [id, setId] = useState(0);

    const queryClient = new QueryClient();

    useEffect(() => {
        const checkAuth = async () => {
            await AuthStore.checkAuth();
            setLoading(false);
        };

        if (window.location.href !== "http://localhost:5173/") {
            checkAuth();
        }
        else {
            setLoading(false);
        }
    }, [AuthStore.isAuth]);

    useEffect(() => {
        setRole(AuthStore.role);
        setId(AuthStore.id)
    }, [loading]);

    let tabs = [
        { label: "Новости", link: "/news" },
        { label: "О компании", link: "/company" },
        { label: "Сотрудники", link: "/users" },
        { label: "Часы работы", link: "/worktime" },
        { label: "Профиль", link: "/profile" },
    ];

    if (role === "admin") {
        tabs = [
            { label: "Новости", link: "/news" },
            { label: "О компании", link: "/company" },
            { label: "Сотрудники", link: "/users" },
            { label: "Аудит", link: "/admin" },
            { label: "Профиль", link: "/profile" },
        ];
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route
                        path="/admin"
                        element={
                            AuthStore.isAuth ? (
                                <AuditPage tabs={tabs} role={AuthStore.role} />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/news"
                        element={
                            AuthStore.isAuth ? (
                                <NewsPage tabs={tabs} role={role} />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/company"
                        element={
                            AuthStore.isAuth ? (
                                <InfoPage tabs={tabs} role={role} />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                                <ProfilePage
                                    tabs={tabs}
                                    role={role}
                                    id={id}
                                />
                        }
                    />
                    <Route
                        path="/worktime"
                        element={
                            AuthStore.isAuth ? (
                                <WorktimePage
                                    tabs={tabs}
                                    role={role}
                                />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />

                    <Route path="/users" element={<PrivateRoute />}>
                        <Route path="" element={<UsersPage tabs={tabs} role={role}/>} />
                    </Route>
                    <Route path="*" element={
                            AuthStore.isAuth ? (
                                <UsersPage tabs={tabs} role={role} />
                            ) : (
                                <Navigate to="/" />
                            )
                        } />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
});

export default App;
