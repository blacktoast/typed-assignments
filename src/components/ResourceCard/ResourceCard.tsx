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
import { resourceType } from '../../types/index';

interface Props {
  resource: resourceType;
  editResource?: () => {};
  onClickDelete?: MouseEventHandler<HTMLElement>;
}

function ResourceCard({ resource, onClickDelete }: Props) {
  const title =
    resource.data instanceof File ? resource.data.name : resource.data;
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
    //수정을 걸었다가. 만약 수정에 실패하면> 토스만 띄워줄까? 그렇게되면 수정전 데이터터로 롤백이 되야함.
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
