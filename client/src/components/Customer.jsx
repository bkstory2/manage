import React from 'react';
import { TableRow , TableCell } from '@mui/material';

const Customer = ({ id, name, image, birthday, gender, job }) => (
       <TableRow>
        <TableCell>{id}</TableCell>
        <TableCell>
          <img src={image} alt={name} style={{ width: 40, height: 40, objectFit: 'cover' }} />
        </TableCell>        
        <TableCell>{name}</TableCell>
        <TableCell>{birthday}</TableCell>
        <TableCell>{gender}</TableCell>
        <TableCell>{job}</TableCell>        
      </TableRow> 
);
export default    Customer;


