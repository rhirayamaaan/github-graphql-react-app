import React, { FC } from 'react';
import styles from './styles.scss';
import GlobalHeader, { GlobalHeaderProps } from '../../modules/GlobalHeader';
import UserList, { UserListProps } from '../../modules/UserList';
import CommunicationMessage, { CommunicationMessageTypes } from '../../modules/CommunicationMessage';
import Loading, { LoadingProps } from '../../parts/Loading';
import { SearchBoxProps } from '../../parts/SearchBox';

enum TopCommunicationTypes {
  INITIAL = 'INITIAL',
  NETWORK_ERROR = 'NETWORK_ERROR',
  ERROR = 'ERROR',
  ZERO_MATCH = 'ZERO_MATCH'
}

interface TopProps {
  isLoading: LoadingProps['isLoading'];
  query: SearchBoxProps['query'];
  users?: UserListProps['users'];
  onSearchSubmit: GlobalHeaderProps['onSearchSubmit'];
  communicationType?: TopCommunicationTypes;
}

function matchCommunicationMessageType(types?: TopCommunicationTypes) {
  switch (types) {
    case TopCommunicationTypes.NETWORK_ERROR: {
      return CommunicationMessageTypes.NETWORK_ERROR;
    }
    case TopCommunicationTypes.ERROR: {
      return CommunicationMessageTypes.ERROR;
    }
    case TopCommunicationTypes.ZERO_MATCH: {
      return CommunicationMessageTypes.ZERO_MATCH;
    }
  }
}

const Top: FC<TopProps> = ({ isLoading = false, query = '', users = [], onSearchSubmit, communicationType }) => (
  <div className={styles.top}>
    <div className={styles.top__header}>
      <GlobalHeader isSearchDisabled={isLoading} query={query} onSearchSubmit={onSearchSubmit} />
    </div>
    <div className={styles.top__main}>
      {communicationType !== TopCommunicationTypes.INITIAL ? (
        <Loading isLoading={isLoading}>
          <CommunicationMessage type={matchCommunicationMessageType(communicationType)}>
            <UserList users={users} />
          </CommunicationMessage>
        </Loading>
      ) : null}
    </div>
  </div>
);

export { Top as default, TopProps, TopCommunicationTypes };
