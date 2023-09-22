import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { NavLink} from "react-router-dom";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Recent Deposits</Title>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2023
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          <NavLink to="/Contact">View Balance</NavLink>
        </Link>
      </div>
    </React.Fragment>
  );
}
