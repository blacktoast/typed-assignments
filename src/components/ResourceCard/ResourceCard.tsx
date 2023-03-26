import {
  ChangeEvent,
  MouseEventHandler,
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
} from 'react';
import { TypedIcon } from 'typed-design-system';
import style from './ResourceCard.module.css';

interface Props {
  id: string;
  title: string;
  onClickEdit?: MouseEventHandler<HTMLElement>;
  onClickDelete?: MouseEventHandler<HTMLElement>;
}

function ResourceCard({ id, title, onClickDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onChangeResource = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const onClickEdit = () => {
    setIsEditing(!isEditing);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      console.log('store!@');
    }
  };

  const onBlur = () => {
    setIsEditing(false);
    console.log('store');
  };

  return (
    <div className={style.card}>
      {isEditing ? (
        <input
          className={style.text}
          value={editedTitle}
          onChange={onChangeResource}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          ref={inputRef}
        />
      ) : (
        <p className={style.text}>{title}</p>
      )}
      <div className={style.btnContainer}>
        <button onClick={onClickEdit}>
          <TypedIcon icon="edit_19"></TypedIcon>
        </button>
        <button onClick={onClickDelete}>
          <TypedIcon icon="trash_19"></TypedIcon>
        </button>
      </div>
    </div>
  );
}

export default ResourceCard;
