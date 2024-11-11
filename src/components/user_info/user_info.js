import { useEffect, useState } from "react";
import axiosInstance from "../../service/axiosInstance";

export const User_info = () => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        axiosInstance.get('/api/user/info')
            .then(res => {
                console.log(res)
                setUserInfo(res.data.data);  // 서버에서 받은 데이터를 userInfo에 저장
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div>
            {userInfo.name}
        </div>
    );
};
