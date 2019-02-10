const updateObject = (oldState, updatedData) => {
    return {
        ...oldState,
        ...updatedData
    }
}
export default updateObject;