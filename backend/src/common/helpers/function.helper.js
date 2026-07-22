export const createKeyForChatOne = (userId1, userId2) => {
    return [userId1, userId2].sort((x, y) => x - y).join("-")
}