import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Customer from './components/Customer';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, AppBar, Toolbar, IconButton, Typography, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import CustomerPopAdd from './components/CustomerPopAdd';

const theme = createTheme();

function App() {

  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ 검색어 상태 추가

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

 // 검색어 입력 시 데이터 다시 불러오기
useEffect(() => {
     callList(searchTerm)
    .then(res => setCustomers(res))
    .catch(err => console.log(err));
}, [searchTerm]);


const callList = async (searchTerm = "") => {
  const url = "/api/list";

  const response = await axios.post(url, { search: searchTerm }, {
      headers: { "Content-Type": "application/json" } // ✅ JSON 형식 명시
  });

  return response.data; // ✅ 응답 데이터 반환
};
  

const onDbSuccess = () => {

     callList(searchTerm)

    .then(res => setCustomers(res))
    .catch(err => console.error(err));
};

// ✅ 검색어가 포함된 고객 리스트 필터링
const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.gender.toLowerCase().includes(searchTerm.toLowerCase())
);

  const cellList = ["번호", "이미지", "이름", "생일", "성별", "직업", "설정"];

  return (
    <ThemeProvider theme={theme}>
      <>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              MUI
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="검색어 입력"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm} // ✅ 입력값 바인딩
                onChange={(e) => setSearchTerm(e.target.value)} // ✅ 검색어 변경 이벤트 추가
              />
            </Search>
          </Toolbar>
        </AppBar>

        <Paper sx={{ width: '100%', overflowX: 'auto', padding: 2 }}>
          <Table sx={{ minWidth: 1080 }}>
            <TableHead>
              <TableRow>
                {cellList.map((c, index) => (
                  <TableCell key={index}>{c}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((c) => (
                  <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}  onDbSuccess={onDbSuccess}/>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <CustomerPopAdd onDbSuccess={onDbSuccess} /> 

        </Paper>

       

      </>
    </ThemeProvider>
  );
}

export default App;
