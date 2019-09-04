import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { NOOP } from 'utils';

function useInputForm(onSubmit, autoSubmitInterval) {
  const [draft, setDraft] = useState('');
  const onChange = e => setDraft(e.target.value);
  const submit = useCallback(
    function(e) {
      e && e.preventDefault();
      if (draft) {
        onSubmit(draft);
        setDraft('');
      }
    },
    [draft, onSubmit]
  );
  useEffect(() => {
    if (autoSubmitInterval) {
      const tid = setTimeout(submit, autoSubmitInterval);
      return () => clearTimeout(tid);
    }
  }, [submit, autoSubmitInterval]);
  return { value: draft, onChange, submit };
}

export function TodoAdder({ onAddTodo = NOOP }) {
  const { submit, value, onChange } = useInputForm(onAddTodo, 3000);
  const inputRef = useRef();
  useEffect(() => {
    const input = inputRef.current;
    input.focus();
  }, []);
  return (
    <form onSubmit={submit}>
      <Input ref={inputRef} type="text" {...{ value, onChange }} />
      <Button disabled={!value}>Add</Button>
    </form>
  );
}

const Input = styled.input`
  color: ${props => props.theme.palette.textColor};
  &:focus {
    background-color: ${props => props.theme.palette.active};
  }
`;

const Button = styled.button`
  background-color: ${props => props.theme.palette.primary};
  color: ${props => props.theme.palette.primaryText};
  border-radius: 100%;

  &:disabled {
    visibility: hidden;
  }
`;