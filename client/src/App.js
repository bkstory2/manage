import React, { useState, useEffect } from 'react';
import './App.css';
import Customer from './components/Customer';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import CustomerAdd from './components/CustomerAdd';

function App() {

  const [customers, setCustomers] = useState([]);
  const [resetForm, setResetForm] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/list');
      const body = await response.json();
      setCustomers(body);
    } catch (err) {
      console.error(err);
    }
  };

  // 삭제 후 실행할 함수 (리스트 갱신 + CustomerAdd 초기화)
  const handleListPage = async () => {
    console.log("  front handleListPage  call..     ") ; 
    await fetchCustomers();
    setResetForm(true); // CustomerAdd 초기화
  };

  return (
    <div>
      <Paper sx={{ width: '100%', overflowX: 'auto', padding: 2 }}>
        <Table sx={{ minWidth: 1080 }}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>삭제</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((c) => (
                <Customer 
                  key={c.id} 
                  id={c.id} 
                  image={c.image} 
                  name={c.name} 
                  birthday={c.birthday} 
                  gender={c.gender} 
                  job={c.job} 
                  onDeleteSuccess={handleListPage} // 삭제 후 리스트 갱신 + CustomerAdd 초기화
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* 고객 추가 후 handleListPage 실행 */}
      <CustomerAdd onCustomerAddSuccess={handleListPage} resetForm={resetForm} setResetForm={setResetForm} />
    </div>
  );
}

export default App;
