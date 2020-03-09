import React, { FC } from 'react';
import styles from './styles.scss';
import SearchBox, { SearchBoxProps } from '../../parts/SearchBox';

interface GlobalHeaderProps {
  isSearchDisabled: SearchBoxProps['isDisabled'];
  query: SearchBoxProps['query'];
  onSearchSubmit: SearchBoxProps['onSubmit'];
  className?: string;
}

const GlobalHeader: FC<GlobalHeaderProps> = ({
  isSearchDisabled = false,
  query = '',
  className = '',
  onSearchSubmit
}) => (
  <div className={[styles.globalHeader, className].join(' ').trim()}>
    <h1 className={styles.globalHeader__title}>Users Search Service for Github</h1>
    <div className={styles.globalHeader__search}>
      <SearchBox isDisabled={isSearchDisabled} query={query} onSubmit={onSearchSubmit} />
    </div>
  </div>
);

export { GlobalHeader as default, GlobalHeaderProps };
