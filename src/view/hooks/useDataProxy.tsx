import { useEffect } from 'react';
import {
  PROXY_GET_ARTICLE_LSIT,
  PROXY_GET_CHANNEL_LIST,
  PROXY_GET_ARTICLE_LIST_IN_CHANNEL,
  MANUAL_SYNC_UNREAD,
} from '../../event/constant';
import { useEventPub } from './useEventPub';

export const useDataProxy = () => {
  const { emit, on } = useEventPub();
  const proxy = (name: string, data?: any) => {
    return new Promise((resolve, reject) => {
      on(name, (_event, result) => {
        return resolve(result);
      });

      emit(name, data);
    });
  };

  useEffect(() => {});

  function getChannelList(): Promise<any> {
    return proxy(PROXY_GET_CHANNEL_LIST);
  }

  function getArticleList(): Promise<any> {
    return proxy(PROXY_GET_ARTICLE_LSIT);
  }

  function getArticleListInChannel(params: any): Promise<any> {
    return proxy(PROXY_GET_ARTICLE_LIST_IN_CHANNEL, params);
  }

  function syncArticleList(params: { channelId: string }): Promise<any> {
    return proxy(MANUAL_SYNC_UNREAD);
  }

  return {
    getChannelList,
    getArticleList,
    getArticleListInChannel,

    syncArticleList,
  };
};
