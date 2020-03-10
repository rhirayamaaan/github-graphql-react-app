import React, { FC } from 'react';
import styles from './styles.scss';

interface UserListUserProps {
  id: string;
  login: string;
  url: string;
  avatarUrl: string;
  name?: string | null;
  bio?: string | null;
}

interface UserListProps {
  users?: Array<UserListUserProps>;
  className?: string;
}

const UserListItemName: FC<Pick<UserListUserProps, 'name'>> = ({ name }) =>
  name ? <p className={styles.userList__itemName}>{name}</p> : null;

const UserListItemBio: FC<Pick<UserListUserProps, 'bio'>> = ({ bio }) =>
  bio ? <p className={styles.userList__itemBio}>{bio}</p> : null;

const UserList: FC<UserListProps> = ({ users = [], className = '' }) =>
  users.length > 0 ? (
    <div className={[styles.userList, className].join(' ').trim()}>
      <ul className={styles.userList__items}>
        {users.map(user => (
          <li className={styles.userList__item} key={user.id}>
            <a href={user.url} target="_blank" className={styles.userList__itemLink}>
              <div className={styles.userList__itemHead}>
                <div className={styles.userList__itemAvatar}>
                  <img
                    src={user.avatarUrl}
                    alt={`${user.login}'s avatar`}
                    className={styles.userList__itemAvatarImage}
                  />
                </div>
              </div>
              <div className={styles.userList__itemMain}>
                <UserListItemName name={user.name} />
                <p className={styles.userList__itemLogin}>@{user.login}</p>
                <UserListItemBio bio={user.bio} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  ) : null;

export { UserList as default, UserListProps };
