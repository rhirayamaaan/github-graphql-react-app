import React, { FC, ReactNode } from 'react';
import styles from './styles.scss';

interface LoadingProps {
  isLoading?: boolean;
  className?: string;
  children?: ReactNode;
}

const Loading: FC<LoadingProps> = ({ isLoading = false, className = '', children }) =>
  isLoading ? (
    <div className={[styles.loading, className].join(' ').trim()}>
      <div className={styles.loading__item} aria-label="Loading..."></div>
    </div>
  ) : children ? (
    <>{children}</>
  ) : null;

export { Loading as default, LoadingProps };
