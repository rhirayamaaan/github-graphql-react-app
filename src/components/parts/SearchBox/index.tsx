import React, { FC, useRef, useState, useEffect } from 'react';
import styles from './styles.scss';

interface SearchBoxProps {
  isDisabled?: boolean;
  query?: string;
  onSubmit: (value?: string) => void;
  className?: string;
}

const SearchBox: FC<SearchBoxProps> = ({ isDisabled = false, query = '', className = '', onSubmit }) => {
  const inputElementRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  return (
    <div className={[styles.searchBox, className].join(' ').trim()}>
      <input
        type="search"
        className={styles.searchBox__input}
        placeholder="Search to..."
        value={inputValue}
        onChange={() => {
          setInputValue(inputElementRef.current?.value || '');
        }}
        onKeyPress={event => {
          if (event.charCode === 13) {
            inputElementRef.current?.blur();
            onSubmit(inputElementRef.current?.value || '');
          }
        }}
        disabled={isDisabled}
        ref={inputElementRef}
      />
      <button
        type="button"
        className={styles.searchBox__submit}
        onClick={() => {
          onSubmit(inputElementRef.current?.value || '');
        }}
        disabled={isDisabled}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className={styles.searchBox__submit}
        >
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
    </div>
  );
};

export { SearchBox as default, SearchBoxProps };
