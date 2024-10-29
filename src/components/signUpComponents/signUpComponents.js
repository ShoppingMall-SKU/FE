import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUpComponents = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();
    const [checkEmail, setCheckEmail] = useState("중복확인 하십시오.");

    // 전화번호 입력 시 자동으로 '-' 추가
    const formatPhoneNumber = (input) => {
        // 숫자 이외의 문자 제거
        const phoneNumber = input.replace(/\D/g, '');
        // 전화번호 포맷 적용
        const formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{3,4})(\d{4})/, '$1-$2-$3');
        return formattedPhoneNumber;
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        const formattedPhoneNumber = formatPhoneNumber(input);
        setPhone(formattedPhoneNumber);
    };

    const handleCheck = async () => {
        if(!email) {
            alert("이메일을 입력하십시오.");
            return;
        }
        const response = await axios.get(`http://localhost:8080/api/user/check/email/${email}`)
        if (response.data) {
            setCheckEmail("사용 가능한 이메일 입니다.")
        }
        else {
            alert("해당 이메일이 이미 존재합니다.")
            return;
        }
    }

    const handleSignup = async () => {
        try {
            if (!email || !password || !passwordCheck || !name || !phone || !address) {
                alert('모든 정보를 입력하세요.');
                return;
            }

            if (password !== passwordCheck) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            const userData = {
                name,
                password,
                phone,
                email,
                address
            };

            const response = await axios.post('http://localhost:8080/api/user/signup', userData);
            if (response.status === 200) {
                alert("회원가입 성공");
                navigate('/login');
            } else {
                alert("회원가입에 실패했습니다.");
            }
        } catch (error) {
            console.error("회원가입 요청 실패:", error);
            alert("회원가입에 실패했습니다.");
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center h-screen mt-10">
                <div className="w-96 flex flex-col border bg-white px-6 py-14 shadow-md rounded-[4px]">
                    <div className="mb-8 flex justify-center">
                        <img className="w-24" src="/images/logo3.png" alt="logo" />
                    </div>
                    <div className="flex text-sm rounded-md flex-col">
                        <div className="flex-row mb-1">
                            <input className="w-9/12 mr-4 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-green-500" type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <button className="w-16" onClick={handleCheck}>중복 확인</button>
                        </div>
                        <span className="mb-5 text-red-500">{checkEmail}</span>
                        <input className="mb-5 border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-green-500" type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input className="mb-5 border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-green-500" type="password" placeholder="비밀번호 확인" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} />
                        <input className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-green-500" type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
                        <input className="mb-1 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-green-500" type="tel" placeholder="전화번호 (예: 010-1234-5678)" maxLength={13} value={phone} onChange={handlePhoneChange} />
                        <span className="mb-5">숫자로만 적어주세요.</span>
                        <input className="rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-green-500" type="text" placeholder="주소" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <button className="mt-5 w-full border p-2 bg-gradient-to-r from-green-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300" type="submit" onClick={handleSignup}>회원가입</button>
                    <div className="mt-5 flex justify-end text-sm text-gray-600">
                        <a href="/login">로그인</a>
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
