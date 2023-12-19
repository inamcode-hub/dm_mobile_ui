import styled from '@emotion/styled';
import { Button, Divider, Icon, Paper } from '@mui/material';
import { green } from '@mui/material/colors';
import { FaCheck } from 'react-icons/fa';
import { format, sub } from 'date-fns';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Subscription = () => {
  const { isSubscriptionActive, subscriptionExpiry } = useSelector(
    (state) => state.user
  );
  const date =
    subscriptionExpiry && format(new Date(subscriptionExpiry), 'PPP');
  const features = [
    'Remote Access to your Dryer Master 24/7',
    'Change Moisture Set Points remotely',
    'Receive alerts and notifications',
    'Track your dryer’s performance',
    'Access to your dryer’s historical data',
  ];
  useEffect(() => {}, []);
  return (
    <Wrapper $isSubscriptionActive={isSubscriptionActive}>
      <div className='heading'>
        <h1>Subscription Plan</h1>
        <span>
          {isSubscriptionActive
            ? `Your subscription expires on `
            : `Your subscription expired on `}
          <strong>{date}</strong>
        </span>
      </div>
      <div className='card'>
        <Paper elevation={3}>
          <div className='card-heading'>
            <div className='title'>
              <h3>Premium</h3>
              <small>{isSubscriptionActive ? 'Active' : 'Expired'}</small>
            </div>
            <div className='card-heading-price'>
              $100<span>/Year</span>
            </div>
            <small>New customers get 1 year free trial</small>
          </div>
          <Divider />
          <div className='card-body'>
            <ul>
              {features.map((feature, index) => (
                <li key={index}>
                  <FaCheck />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className='card-footer'>
            {isSubscriptionActive ? (
              <Button
                variant='contained'
                color='error'>
                Cancel Subscription
              </Button>
            ) : (
              <Button
                variant='contained'
                color='success'>
                Renew Subscription
              </Button>
            )}
          </div>
        </Paper>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 1rem;
  .heading {
    text-align: center;
    padding: 1rem 0;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;
    h1 {
      font-size: 2.5rem;
      margin: 0;
    }
    strong {
      color: ${(props) => (props.$isSubscriptionActive ? green[500] : 'red')};
    }
  }
  .card {
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    .card-heading {
      padding: 1rem;
      border-radius: 10px 10px 0 0;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        small {
          font-size: 0.75rem;
          color: #fff;
          background-color: ${(props) =>
            props.$isSubscriptionActive ? green[500] : 'red'};
          padding: 0.25rem 0.5rem;
          border-radius: 5px;
        }
      }
      h3 {
        margin: 0;
        font-size: 2rem;
      }
      .card-heading-price {
        font-size: 1.5rem;
        font-weight: 700;
        span {
          font-size: 0.75rem;
          font-weight: 400;
        }
      }
    }
    .card-body {
      padding: 1rem;
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          padding: 0.5rem 0;
          display: flex;
          align-items: center;
          svg {
            margin-right: 0.5rem;
            color: ${green[500]};
          }
        }
      }
    }
    .card-footer {
      padding: 1rem;
      button {
        width: 100%;
      }
    }
  }
`;
export default Subscription;
