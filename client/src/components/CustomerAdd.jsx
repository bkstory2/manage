import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const CustomerAdd = ({ onCustomerAddSuccess, resetForm, setResetForm }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [job, setJob] = useState("");
    const fileInputRef = useRef(null);

    // resetForm 값이 변경되면 입력 필드 초기화
    useEffect(() => {
        if (resetForm) {
            setFile(null);
            setName("");
            setBirthday("");
            setGender("");
            setJob("");
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setResetForm(false); // 초기화 후 다시 false로 변경
        }
    }, [resetForm, setResetForm]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await addCustomer();
            alert("고객이 추가되었습니다!");

            if (onCustomerAddSuccess) {
                onCustomerAddSuccess();
            }
        } catch (error) {
            console.error("고객 추가 실패:", error);
            alert("고객 추가 중 오류가 발생했습니다.");
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const addCustomer = () => {
        const url = "/api/customer";
        const formData = new FormData();

        formData.append("method", "add");
        formData.append("image", file);
        formData.append("name", name);
        formData.append("birthday", birthday);
        formData.append("gender", gender);
        formData.append("job", job);

        return axios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <h1>추가</h1>
            <label>
                프로필 이미지:
                <input type="file" ref={fileInputRef} onChange={handleFileChange} />
            </label>
            <br />

            <label>
                이름: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />

            <label>
                생일: <input type="text" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
            </label>
            <br />

            <label>
                성별: <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
            </label>
            <br />

            <label>
                직업: <input type="text" value={job} onChange={(e) => setJob(e.target.value)} />
            </label>
            <br />

            <button type="submit">추가</button>
        </form>
    );
};

export default CustomerAdd;
