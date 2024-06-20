export type UsersAttributes = {
    id: number;
    name: string;
    photo: string;
};

export type UsersResponse = {
    result: boolean,
    data: UsersAttributes[];
};

export type UserAttributes = {
    id: number;
    name: string;
    birthday: string;
    startWork: string;
    telegram: string;
    city: string;
    email: string;
    phoneNumber: string;
    login: string;
    isActive: boolean;
    role: string;
    photo: string;
};


export type UserResponse = {
    result: boolean,
    data: UserAttributes;
};

export type GetUserData = (id: number) => Promise<UserResponse>;
export type GetUsersData = () => Promise<UsersResponse>;
export type DeleteUser = (id: number) => Promise<boolean>;
export type CreateUser = (
    name: string,
    birthday: string,
    startWork: string,
    telegram: string,
    city: string,
    email: string,
    phoneNumber: string,
    login: string,
    role: string,
    photo: File
) => Promise<UserResponse>;


export type AuditAttributes = {
    requestTime: string;
    name: string;
    role: string;
    requestType: string;
    body: string;
};

export type AuditResponse = {
    result: boolean,
    data: AuditAttributes[];
};

export type GetAudit = () => Promise<AuditResponse>

export type UpdateUser = (
    id: number,
    field: string,
    newValue: string,
) => Promise<UserResponse>;

export type UpdatePhoto = (
    id: number,
    newValue: File,
) => Promise<UserResponse>;

export type UpdateData = {
    id: number,
    [key: string]: any, 
};