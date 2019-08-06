import React, { useState, useRef, useEffect } from 'react';
import { NOOP } from '../utils';
import { PrimaryButton, Input } from './atoms';

export function TodoAdder({ onAddTodo = NOOP }) {
  const [draft, setDraft] = useState('');
  const inputRef = useRef();
  useEffect(() => {
    const tid = setTimeout(() => console.log('No input for a while...'), 3000);
    return () => clearTimeout(tid);
  }, [draft]);
  useEffect(() => {
    const actualInputNode = inputRef.current;
    actualInputNode.focus();
  }, []);
  return (
    <>
      <Input
        ref={inputRef}
        value={draft}
        onChange={event => setDraft(event.target.value)}
        placeholder="Write your todo here..."
      />
      <PrimaryButton
        onClick={() => {
          onAddTodo(draft);
          setDraft('');
        }}
        disabled={!draft}
      >
        Add Todo
      </PrimaryButton>
    </>
  );
}
