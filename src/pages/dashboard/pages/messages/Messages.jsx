import React, { useEffect, useState } from 'react';
import { getUserCookies } from '../../../../features/user/lib';
import { customFetch } from '../../../../lib/customeFetch';
import { useDispatch, useSelector } from 'react-redux';
import { messagesThunk } from '../../../../features/message/messageSlice';
import MessagesList from './component/MessagesList';
import Loading from '../../../../components/Loading';

const Messages = () => {
  const { isLoading, hasMore, messages } = useSelector(
    (state) => state.message
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (messages.length === 0) {
      dispatch(messagesThunk());
    }
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isLoading ||
        !hasMore
      )
        return;
      dispatch(messagesThunk());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, hasMore, dispatch]);

  if (isLoading && !hasMore) {
    return <Loading />;
  }

  return (
    <div>
      <MessagesList />
      {isLoading && <Loading />}
    </div>
  );
};

export default Messages;
