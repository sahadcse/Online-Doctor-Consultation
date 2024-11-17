const { useSelector } = require("react-redux")

const useUserData = () => {
    const data = useSelector((state) => state.user.userInfo);
    return data;
}

export default useUserData;