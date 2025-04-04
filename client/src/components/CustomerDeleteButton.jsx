import React from "react";
import axios from "axios";
import { Typography } from "@mui/material";

const CustomerDeleteButton = ({ id, onDeleteSuccess }) => {
    const deleteCustomer = async () => {
        try {
            const url = "/api/customer";
            const formData = new FormData();
            formData.append("method", "delete");
            formData.append("id", String(id));

            await axios.post(url, formData);
            alert(`고객 ${id} 삭제 완료`);

            // 삭제 후 리스트 갱신 요청
            if (onDeleteSuccess) 
            {
                onDeleteSuccess();
            }
        } catch (error) {
            console.error("❌ 고객 삭제 실패:", error);
            alert("고객 삭제 중 오류 발생");
        }
    };

    return (
        <div>
        <button onClick={deleteCustomer}>{id} 삭제</button>
        
        </div>    
    );
};

export default CustomerDeleteButton;
