export interface IUser {
    _id: string;
    id: string;
    username: string;
    email: string;
    password: string;
    name: string;
    avatar?: {
        public_id?: string;
        url: string;
    } | null;
    public_id?: string;
    url: string;
    bio?: string;
    status?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    name: string;
    bio: string;
}
export interface File {
    buffer: Buffer;
    mimetype: string;
}

export interface RegisterResponse {
    token: string;
    user: IUser;
}

export interface LoginRequest {
    emailOrUsername: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: IUser;
}

export interface ErrorResponse {
    message: string;
    stack: string;
}

export interface IMessage {
    _id: string;
    sender: string;
    receiver: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    _id: string;
    name: string;
    username: string;
    email: string;
    avatar?: {
        public_id?: string;
        url: string;
    } | null;
    bio?: string;
    status?: string;
    friends?: string[];
    friendRequests?: FriendRequest[];
    createdAt: Date;
    updatedAt: Date;
}

export interface FriendRequest {
    _id: string;
    from: User; // User ID
    status: 'pending' | 'accepted' | 'rejected';
    createdAt: Date;
}

export interface SearchUserPayload {
    q: string;
}

export interface SendFriendRequestPayload {
    userId: string;
}

export interface Conversation {
    _id: string;
    participants: User[];
    lastMessage?: IMessage;
    isGroup: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type Friend = User;