import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookies, setCookies] = useCookies();

    const navigate = useNavigate();
    const handlerLogin = () => {

        if (email.length === 0 || password.length === 0) {
            alert('이메일과 비밀번호를 입력하세요.');
            return;
        }

        const data = {
            email,
            password,
        };

        axios.post('http://localhost:8080/api/user/login', data)
            .then(response => {
                const accessToken = response.headers['authorization'];

                console.log(accessToken);

                if (!accessToken) {
                    alert("로그인에 실패했습니다.");
                    return;
                }
                
                //localStorage.setItem("accessToken", accessToken);
                setCookies('token', accessToken);
                axios.defaults.headers.common['Authorization'] = accessToken;
                navigate('/');
            })
            .catch(error => {
                console.error("로그인 요청 실패:", error);
                alert("로그인에 실패했습니다.");
            });

    };

    return (
        <div>
            <div className="flex items-center justify-center h-screen">
                <div className="w-96 flex flex-col border bg-white px-6 py-14 shadow-md rounded-[4px]">
                    <div className="mb-8 flex justify-center">
                        <img className="w-24" src="/images/logo4.png" alt="logo"/>
                    </div>
                    <div className="flex text-sm rounded-md flex-col">
                        <input
                            className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-green-500"
                            type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input
                            className="border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-green-500"
                            type="password" placeholder="비밀번호" value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button
                        className="mt-5 w-full border p-2 bg-gradient-to-r from-green-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300"
                        type="submit" onClick={handlerLogin}>로그인
                    </button>
                    <div className="mt-5 flex justify-end text-sm text-gray-600">
                        <a href="/signUp">회원가입</a>
                    </div>
                    <div className="flex justify-center mt-5 text-sm">
                        <p className="text-gray-400">다른 방법으로 로그인하기</p>
                    </div>
                    <div className="mt-5 flex justify-center gap-3">
                        <img className="h-7 grayscale cursor-pointer hover:grayscale-0 scale-105 duration-300"
                             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFbUlEQVRoge1ZXWwUVRT+zszs2nZbiUARui2b1lCgJAiWFAMRIoEHFYOtqSL4wAMQGyDxwUQMmiAhSh+NbRFN1AeaQGpacZUHTIjRItLQpCApPw0GdttSUihIty3dnZnjw5T+7Nz52c4WH+j3NHvvd875zt479+cMMI1pPNmgdDjhSshDaqiMSX8ZjFIGLQIwD0D2CCUGoJvAV0FoJcinM5feaKH90L3G9pTA4Ka8Al1SdgF4F0AwRfNOAEcl0mqzGrs6J6thUgn0V87NheY/SIxtAPyTDT6COAPfsqp+8nS4+06qxiknEKsIbQHzlwBmpmrrgLsM3p3TFD2WipHrBHhnqS/W21tHwPbUtbkHA0eyc3P30NetCTd8Vwnw63lZA4r8A0CveJPnEoyTAU2tpHD3oBNVcvS1s9T3WMUDAOHVAVk5wZVLHN8vxwRivb11j1X8IxDWx9T+L5xpNoiVh7YCfDR9qlIHE2/OaYwet+q3TOBBeXCWBPkKgNlTosw9+nRVXWi1xFpOISL5M/z/4gFgpiz7PrXqFI7AYEUwX2f5Ohw2KXnZGiirXoO0uAzSrLkAAL2vB3p7C9TmMLSLzV6Ej0dcVpQFmQ3/RJI7FBFbZ3k3bMRLwSL4q6ohl5SZ+/KKIOUVQVm/GVp7C+I1H0DvuelFPAD4NVWtAvBRcodpBHg/pIEL828CyBd5kpe8iKf2fgMKPO0qsnalFQ/3vQkwp6jZhK6AEglRA7TxjaYRGLoQWgmwULwULJooPhFH4lQ91D9OQI9cNTgFxVDWlsO3YQv07usYrt6RDvEAEBxK5JcCnS22CRhHYvHi5K+qHhXPfT14eHAb9BuXJ3D0jjbEO9qg/noMfO82+EGfK3WBRmOaDVSELDk6SesA2CegM1aI5MvPvzQ25xNxofgJfm5a900WBJQmt5mWUQIVi4yV1RtHnxOn6m3FTxUYWJjcJlqF5omMpcVjK476+4/CAI+mgRX0rusY2rPOlj++TTCdTNpEG1m2oA0069nRZ4522Aq1Ao3sFR6Qk9wg3AemDPrE1Wj8P+zmJRZBlEAMgtsW370NChYBAKhgAbijzWQoCi4tfAGZnzcZPvp6UhInQL/Jv4B0S2SpXx5bvZS15a4jKmvGuHp7iw3TFUzaTAkw+JrIUm0Ojz77NmyBVFjiGE0qXALfhnfGfJwJW3IHKkKO04eAq6YYpgbCeZGxdrEZWvs544fPj4x939kmIRWWIOPj7wHFZ9hfOgvt7z9tBTqBYdYm2Afk01YO4nV7wbF/Dd7Mucis/gn+7QcgFS8HZQSAjCxIxcvh334AmYdOgJ6ZYwSO3Uf88F5P4gGAiE3arA5zNwAUiJzIJSuN81D2DFdBOXYfw4d2QPM6/5kjgWXRwuRqnnkEDEK9lR+t/RwefrgJ2qW/HGNql84aXO8vLyBRvagU6e1Cs3Q1lFUbIZWUgWYbmyTfuWVcaM6EPc/5cRiWFP25rIbOruQOyztxf/n8wwS8ly4FXkDENYHG6B5Rn+WdWFf0fQBSrlVOAe5qCc3yTmyZwIyGzj4GC7N+nGCgyq7oa1vYymmKHmPgSPpluQOBa3OaIg12HMfKXLYS2cVE4vPz1OKXrHvR951IjglQA7TsRGIrGCfTo8sVfg6o6lv0G1QnomMCAEDh7sHAnNw3GPjKuzaHWODawL1IuZvKtMFPEf0VBW8TUw3SXrWjXgbvcprzyXA1AuOR0xg9rkNbREx1AIZTtRdgmIhrNEVblKp4wOtHvsr8oK5KuwFshcXZyQZREI5Ksl4r2mHdIj2fWfdDGmrLX6GTtI6A0pHqQRATPrNSJ4GvMXCeiE9nLY22puMz6zSm8aTjPy9i6LxlaK5BAAAAAElFTkSuQmCC"
                             alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};
