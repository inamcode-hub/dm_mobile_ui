import styled from '@emotion/styled';
import { Button, Divider, Icon, Paper } from '@mui/material';
import { blue, green } from '@mui/material/colors';
import { FaCheck } from 'react-icons/fa';
import { format, sub } from 'date-fns';
import { useSelector } from 'react-redux';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import CardWrapper from '../../../../styles/warppers/CardWrapper';
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
        <CardWrapper>
          <div className='card-heading'>
            <div className='title'>
              <h3>
                Premium
                <MdOutlineWorkspacePremium />
              </h3>

              {isSubscriptionActive ? (
                <small className='active'>Active</small>
              ) : (
                <small className='expired'>Expired</small>
              )}
            </div>
            <div className='card-heading-price'>
              100 USD<span>/year</span>
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
            {!isSubscriptionActive && (
              <Button
                variant='contained'
                color='success'>
                Renew Subscription
              </Button>
            )}
          </div>
        </CardWrapper>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .heading {
    text-align: center;
    padding: 1rem 0;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1rem;
    h1 {
      font-size: 2.5rem;
      font-weight: 500;
      margin: 0;
    }
    strong {
      color: ${(props) =>
        props.$isSubscriptionActive ? green[500] : blue[500]};
    }
  }
  .card {
    border-radius: 10px;
    width: 100%;
    display: flex;
    max-width: 500px;
    margin: 0 auto;
    justify-content: center;
    .card-heading {
      border-radius: 10px 10px 0 0;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        small {
          font-size: 0.85rem;
          font-weight: 400;
          padding: 0.25rem 0.5rem;
          border-radius: 5px;
          &.active {
            background-color: ${green[500]};
            color: #fff;
          }
          &.expired {
            background-color: ${blue[500]};
            color: #fff;
          }
        }
      }
      h3 {
        margin: 0;
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        font-weight: 500;
        background-color: ${({ theme }) =>
          theme.palette.mode === 'dark'
            ? 'var(--primary-16)'
            : 'var(--primary-2)'};
        color: ${({ theme }) =>
          theme.palette.mode === 'dark'
            ? 'var(--primary-2)'
            : 'var(--primary-text)'};
        padding: 0 0.5rem;
        border-radius: 5px;
        margin-bottom: 0.5rem;
      }
      .card-heading-price {
        font-size: 1.5rem;
        font-weight: 500;
        span {
          font-size: 0.85rem;
          margin-left: 0.25rem;
          font-weight: 500;
        }
      }
    }
    .card-body {
      padding: 1rem 0;
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
      button {
        width: 100%;
      }
    }
  }
`;
export default Subscription;
