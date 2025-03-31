import './App.css';
import Customer from './components/Customer';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const customers = [
  {
    id: '1',
    image: '/upload/bbb.jpg',
    name: 'cc2',
    birthday: '730202',
    gender: 'M',
    job: 'dev',
  },
  {
    id: '2',
    image: '/upload/bbb.jpg',
    name: 'cc222',
    birthday: '730202',
    gender: 'M',
    job: 'dev',
  },
  {
    id: '3',
    image: '/upload/bbb.jpg',
    name: 'cc3332',
    birthday: '730303',
    gender: 'M',
    job: 'dev',
  },
];

function App() {
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
          {customers.map((c) => (
            <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default App;
