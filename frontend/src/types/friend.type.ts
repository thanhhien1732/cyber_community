import { TBaseTimestamps } from "./base.type";
import { TUser } from "./user.type";

export type TFriendShip = {
    id: string;
    userId: string;
    friendId: string;
    status: TStatusFriend;
    Friends: TUser;
} & TBaseTimestamps;

export type TfriendshipAction = {
    userId: string;
    friendId: string;
    status?: TStatusFriend;
};

export type TStatusResult = {
    targetStatus: TStatusFriend;
    text: string;
    disabled: boolean;
};

export type TStatusFriend = "pending" | "accepted" | "declined" | "removed";
