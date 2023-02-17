export const reducer = (state, action) => {
    if (action.type === "ACTIVE") {
        return action.payload;
    }
    return state
}