import React, { useState, useEffect } from 'react';
import './App.css';
import Customer from './components/Customer';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

import CustomerAdd from './components/CustomerAdd';

function App() {
  const [customers, setCustomers] = useState([]);

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

  // 새 고객 추가 후 리스트 업데이트
  const handleCustomerAdd = () => {
    fetchCustomers(); // 고객 추가 후 최신 데이터 다시 불러오기
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
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((c) => (
                <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

      {/* 고객 추가 후 handleCustomerAdd 실행 */}
      <CustomerAdd onCustomerAdd={handleCustomerAdd} />
    </div>
  );
}

export default App;
