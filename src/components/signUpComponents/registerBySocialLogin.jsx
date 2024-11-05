import React, {useEffect, useState} from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import DaumPostcodeEmbed from "react-daum-postcode";
import {toast, ToastContainer} from "react-toastify";
import async from "async";
import { Cookies } from "react-cookie";
import axiosInstance from "../../service/axiosInstance"

export const RegisterBySocialLogin = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [streetAdr, setAddress] = useState("");
    const [detailAdr, setDetailAddress] = useState("");
    const navigate = useNavigate();
    const [isProcessing, setIsPrecessing] = useState(true);

    const notify = async (data, state) => {
        if(state === 'error') {
            toast.error(data, {position: "top-center", hideProgressBar: true, autoClose: 1500, className: 'mx-auto w-80 lg:w-auto lg:my-auto my-12'})}
        else if(state === 'success') {
            toast.success(data, {position: "top-center", hideProgressBar: true, autoClose: 1500, className: 'mx-auto w-80 lg:w-auto lg:my-auto my-12'});
        }
    };


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

    const cookie = new Cookies();

    const handleSignup = async () => {
        setIsPrecessing(false);
        try {
            if (!email || !name || !phone || !streetAdr) {
                await notify('모든 정보를 입력하세요.', 'error');
                setIsPrecessing(true);
                return;
            }


            const userData = {
                name,
                phone,
                email,
                streetAdr,
                detailAdr,
                zipcode
            };


            const response = axiosInstance.patch({
                data : userData
            });
            
            if (response.data.error !== null) {
                await notify("회원가입 성공에 성공했습니다.");
                navigate('/login');
            } else {
                await notify("회원가입에 실패했습니다.", 'error');
            }
        } catch (error) {
            console.error("회원가입 요청 실패:", error);
            await notify("회원가입에 실패했습니다.");
        }
    };

    const handleComplete = (data) => {
        // 시.도 저장
        const q1 = (data.sido);
        // 구.군 저장
        const q2 = (
            data.sigungu.length > 3
                ? data.sigungu.split("").splice(0, 3).join("")
                : data.sigungu
        );
        setZipcode(data.zonecode);
        // 상세주소 앞 2단어 제외하고 저장 ('서울 강남구' 제외하고 저장)
        let splitAddress = data.address.split(" ").splice(2).join(" ");
        setAddress(q1 + " " + q2 + " " + splitAddress);
        handleModal();
    };

    const [modalOpen, setModalOpen] = useState(false);

    const handleModal = () => {
        setModalOpen(!modalOpen);
    }

    const handleIsProcessing = () => {
        setIsPrecessing(false);
        const timer = setTimeout(() => {
            setIsPrecessing(true);
        }, 1500); // 3초 후 실행
        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
    }
    const location = useLocation();
    const strings = location.search;

    useEffect(() => {
        setEmail(strings.slice(7));

    }, [])

    return (
        <div>
            <ToastContainer/>
            <div className="flex items-center justify-center h-screen mt-10">
                <div className="w-80 flex flex-col border bg-white px-6 py-14 shadow-md rounded-[4px]">
                    <div className="mb-8 flex justify-center">
                        <img className="w-24" src="/images/logo3.png" alt="logo"/>
                    </div>
                    <div className="flex text-sm rounded-md flex-col gap-x-4">
                        <input
                            className="mb-5 rounded-[4px] text-gray-400 border p-3 hover:outline-none focus:outline-none hover:border-green-500"
                            type="text" placeholder="이메일" value={email} disabled={true}
                            onChange={(e) => setEmail(e.target.value)}/>
                        <input
                            className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-green-500"
                            type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input
                            className="mb-1 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-green-500"
                            type="tel" placeholder="전화번호 (예: 010-1234-5678)" maxLength={13} value={phone}
                            onChange={handlePhoneChange}/>
                        <span className="mb-5">숫자로만 적어주세요.</span>

                        <div className="flex justify-center items-center gap-x-5">
                            <input
                                className="flex rounded-[4px] w-7/12 text-gray-400 border p-3 hover:outline-none focus:outline-none hover:border-green-500"
                                type="text" placeholder="주소" value={streetAdr}
                                onChange={(e) => setAddress(e.target.value)}
                                disabled={true}
                            />
                            <button className="flex btn btn-sm h-10 border w-24 p-3 text-center" onClick={handleModal}>
                                주소 검색
                            </button>
                        </div>

                        <input
                            className="flex rounded-[4px] mt-5 border p-3 hover:outline-none focus:outline-none hover:border-green-500"
                            type="text" placeholder="상세 주소를 입력해주세요" value={detailAdr}
                            onChange={(e) => setDetailAddress(e.target.value)}
                        />
                    </div>
                    <button
                        className="mt-5 w-full border p-2 bg-gradient-to-r from-green-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300"
                        type="submit" onClick={handleSignup}>
                        {isProcessing ? ("회원가입") : (
                            <span className="loading loading-spinner loading-xs"></span>
                        )}
                    </button>
                    {modalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="modal-box bg-white p-5 rounded shadow-lg">
                                <DaumPostcodeEmbed onComplete={handleComplete}/>
                                <button onClick={handleModal}
                                        className="mt-3 w-full border p-2 bg-gray-500 text-white rounded">
                                    닫기
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};