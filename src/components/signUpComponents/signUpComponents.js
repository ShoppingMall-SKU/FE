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

            const response = await axios.post('/api/user/signup', userData);
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
            <div className="flex items-center justify-center h-screen">
                <div className="w-96 flex flex-col border bg-white px-6 py-14 shadow-md rounded-[4px]">
                    <div className="mb-8 flex justify-center">
                        <img className="w-24" src="/images/logo4.png" alt="logo" />
                    </div>
                    <div className="flex text-sm rounded-md flex-col">
                        <div className="flex-row mb-1">
                            <input className="w-9/12 mr-4 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-green-500" type="text" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <button className="w-16">중복 확인</button>
                        </div>
                        <span className="mb-5 text-red-500">중복 확인 하십시오.</span>
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
                        {/* 소셜 로그인 버튼 */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpComponents;