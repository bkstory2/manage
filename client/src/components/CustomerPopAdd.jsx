import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

const CustomerPopAdd = ({ onDbSuccess, resetForm }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [job, setJob] = useState("");
    const fileInputRef = useRef(null);
    const [popopen, setPopopen] = useState(false);

    useEffect(() => {
        if (resetForm) {
            resetFields();
            setPopopen(false);
        }
    }, [resetForm]);

    const resetFields = () => {

        setFile(null);
        setName("");
        setBirthday("");
        setGender("");
        setJob("");

        if (fileInputRef.current) fileInputRef.current.value = "";
        
    };

    const handleClickOpen = () => setPopopen(true);
    const handleClose = () => {
        resetFields();
        setPopopen(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await addCustomer();
            alert("고객이 추가되었습니다!");
            
            if (onDbSuccess)onDbSuccess();

            handleClose();
        } catch (error) {
            console.error("고객 추가 실패:", error);
            alert("고객 추가 중 오류가 발생했습니다.");
        }
    };

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const addCustomer = () => {

        const url = "/api/customer";
        const formData = new FormData();
        formData.append("method", "add");
        formData.append("image", file);
        formData.append("name", name);
        formData.append("birthday", birthday);
        formData.append("gender", gender);
        formData.append("job", job);
        return axios.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>추가</Button>

            <Dialog open={popopen} onClose={handleClose}>
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ marginBottom: 16 }} accept="image/*"  />
                    <TextField label="이름" fullWidth margin="dense" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField label="생일" fullWidth margin="dense" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                    <TextField label="성별" fullWidth margin="dense" value={gender} onChange={(e) => setGender(e.target.value)} />
                    <TextField label="직업" fullWidth margin="dense" value={job} onChange={(e) => setJob(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose} color="secondary">취소</Button>
                    <Button variant="outlined"  onClick={handleFormSubmit} color="primary" >추가</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
};

export default CustomerPopAdd;
