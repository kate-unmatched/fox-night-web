import { instance } from "./api.config.ts";
import {
    CreateUser,
    DeleteUser,
    GetUserData,
    GetUsersData,
    UserResponse,
    UsersResponse,
    UpdateUser,
    UpdateData,
    UpdatePhoto,
    GetAudit,
    AuditResponse,
} from "./types.ts";

export const getUsers: GetUsersData = async () => {
    const users = await instance.get<UsersResponse>("/users");

    return users.data;
};

export const getUser: GetUserData = async (id) => {
    const user = await instance.get<UserResponse>(`/users/${id}`);

    return user.data;
};

export const deleteUser: DeleteUser = async (id) => {
    const user = await instance.delete<boolean>(`/users/${id}`);

    return user.data;
};

export const createUser: CreateUser = async (
    name,
    birthday,
    startWork,
    telegram,
    city,
    email,
    phoneNumber,
    login,
    role,
    photo
) => {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify({
        name,
        birthday,
        startWork,
        telegram,
        city,
        email,
        phoneNumber,
        login,
        role
    })], { type: 'application/json' }));
    formData.append('photo', photo);

    const response = await instance.post<UserResponse>('/users', formData);

    return response.data;
};

export const updateUser: UpdateUser = async (
    id,
    field,
    newValue,
) => {
    const updateData: UpdateData = { id };
    updateData[field] = newValue;

    const user = await instance.post<UserResponse>(`/users/${id}`, updateData);

    return user.data;
};

export const updatePhoto: UpdatePhoto = async (
    id,
    newValue,
) => {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify({
        id,
    })], { type: 'application/json' }));
    formData.append('photo', newValue);


    const user = await instance.post<UserResponse>(`/users/${id}`, formData);

    return user.data;
};

export const getAudit: GetAudit = async () => {
    const audit = await instance.get<AuditResponse>(`/rest-audit`);

    return audit.data;
}