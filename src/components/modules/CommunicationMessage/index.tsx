import React, { FC, ReactNode } from 'react';
import styles from './styles.scss';

enum CommunicationMessageTypes {
  ERROR = 'ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  ZERO_MATCH = 'ZERO_MATCH'
}

interface CommunicationMessageProps {
  type?: CommunicationMessageTypes;
  children?: ReactNode;
  className?: string;
}

const CommunicationMessageNetworkError: FC<{ type?: CommunicationMessageTypes }> = ({ type }) =>
  type === CommunicationMessageTypes.NETWORK_ERROR ? (
    <>
      <h2 className={styles.communicationMessage__title}>エラーが発生しました</h2>
      <p className={styles.communicationMessage__description}>
        通信中に問題が発生しました。時間を空けて再度お試しください。
      </p>
    </>
  ) : null;

const CommunicationMessageError: FC<{ type?: CommunicationMessageTypes }> = ({ type }) =>
  type === CommunicationMessageTypes.ERROR ? (
    <>
      <h2 className={styles.communicationMessage__title}>エラーが発生しました</h2>
      <p className={styles.communicationMessage__description}>
        予期せぬエラーが発生しました。解消されない場合は<a href="mailto:hiraryo.0213@gmail.com">こちら</a>
        にご連絡ください。
      </p>
    </>
  ) : null;

const CommunicationMessageZeroMatch: FC<{ type?: CommunicationMessageTypes }> = ({ type }) =>
  type === CommunicationMessageTypes.ZERO_MATCH ? (
    <>
      <h2 className={styles.communicationMessage__title}>検索結果がありませんでした</h2>
      <p className={styles.communicationMessage__description}>別の単語で、再度検索し直してください。</p>
    </>
  ) : null;

const CommunicationMessage: FC<CommunicationMessageProps> = ({ type, children, className = '' }) =>
  type ? (
    <div className={[styles.communicationMessage, className].join(' ').trim()}>
      <CommunicationMessageNetworkError type={type} />
      <CommunicationMessageError type={type} />
      <CommunicationMessageZeroMatch type={type} />
    </div>
  ) : children ? (
    <>{children}</>
  ) : null;

export { CommunicationMessage as default, CommunicationMessageProps, CommunicationMessageTypes };
