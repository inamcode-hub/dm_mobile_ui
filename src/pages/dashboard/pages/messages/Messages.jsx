import React, { useEffect, useState } from 'react';
import { getUserCookies } from '../../../../features/user/lib';
import { customFetch } from '../../../../lib/customeFetch';
import { useDispatch, useSelector } from 'react-redux';
import { messagesThunk } from '../../../../features/message/messageSlice';
import MessagesList from './component/MessagesList';
import Loading from '../../../../components/Loading';

const Messages = () => {
  const { isLoading } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(messagesThunk());
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <MessagesList />
    </div>
  );
};

export default Messages;
