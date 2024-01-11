import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styled from '@emotion/styled';
const OperatorInfo = () => {
  return (
    <Wrapper>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'>
          <Typography>Operator Rules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <li>
              Maximum number of operators is capped at 5 to ensure optimal
              management and efficiency.
            </li>
            <li>
              Only the admin has the authority to add new operators, ensuring
              controlled access and security.
            </li>
            <li>
              Operators are granted view-only access to data, maintaining data
              integrity by prohibiting alterations.
            </li>
          </List>
        </AccordionDetails>
      </Accordion>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 1rem;
  width: 100%;
`;
const List = styled.ul`
  list-style: none;
  padding: 0rem;
  margin: 0rem;
  li {
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
  }
`;
export default OperatorInfo;
