import {
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import { TypedIcon } from 'typed-design-system';
import style from './ResourceCard.module.css';
import { resourceType } from '../../types/index';

interface Props {
  resource: resourceType;
  editResource: (resource: resourceType) => boolean;
  onClickDelete: (
    e: MouseEvent<HTMLButtonElement>,
    resource: resourceType
  ) => void;
  onClickCard: (id: string) => void;
}

function ResourceCard({
  resource,
  onClickDelete,
  editResource,
  onClickCard,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(resource.title);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const onChangeResource = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const onClickEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      const isEditSuccess = editResource({ ...resource, title: editedTitle });
      if (!isEditSuccess) {
        setEditedTitle(resource.title);
      }
    }
  };

  const onBlur = () => {
    setIsEditing(false);
    const isEditSuccess = editResource({ ...resource, title: editedTitle });
    if (!isEditSuccess) {
      setEditedTitle(resource.title);
    }
  };

  return (
    <div className={style.card} onClick={() => onClickCard(resource.id)}>
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
        <p className={style.text}>{resource.title}</p>
      )}
      <div className={style.btnContainer}>
        <button onClick={onClickEdit}>
          <TypedIcon icon="edit_19"></TypedIcon>
        </button>
        <button onClick={(e) => onClickDelete(e, resource)}>
          <TypedIcon icon="trash_19"></TypedIcon>
        </button>
      </div>
    </div>
  );
}

export default ResourceCard;
