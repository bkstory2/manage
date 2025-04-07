import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button , Typography } from "@mui/material";

const CustomerDeletePop = ({ id, onDbSuccess }) => {

    const [popopen, setPopopen] = useState(false);

    
    const handleClickOpen = () => setPopopen(true);

    const handleClose = () => {       
        setPopopen(false);
    };

    const Fn_deleteCustomer = async () => {
        try {
            const url = "/api/customer";
            const formData = new FormData();
            formData.append("method", "delete");
            formData.append("id", String(id));

            await axios.post(url, formData);

            handleClose(); // 먼저 팝업 닫기

            if (onDbSuccess) onDbSuccess();
            
            alert(`고객 ${id} 삭제 완료`);

        } catch (error) {
            console.error("❌ 고객 삭제 실패:", error);
            alert("고객 삭제 중 오류 발생");
        }
    };

    return (

        <div>
            
        <button varient="contained" color="secondary" onClick={handleClickOpen} >{id} 삭제</button>
            
            <Dialog open={popopen} onClose={handleClose}>
            <DialogTitle>삭제</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                    선택고객 삭제 됩니다.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}       color="secondary">취소</Button>
                <Button variant="outlined"  onClick={Fn_deleteCustomer} color="primary" >삭제 </Button>
            </DialogActions>
            </Dialog>

        </div>
    );
};

export default CustomerDeletePop;
