import React, { useState, useEffect } from 'react';
import './App.css';
import Customer from './components/Customer';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

function App() {


  const [customers, setCustomers] = useState([]); // 상태 초기화


  useEffect(() => {

    callList()
      .then(res => setCustomers(res))
      .catch(err => console.log(err));
      
  }, []); // []를 넣으면 컴포넌트가 처음 마운트될 때만 실행됨

  const callList = async () => {
    const response = await fetch('/api/list');
    const body = await response.json();
    return body;
  };

  return (
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
  );
}

export default App;
