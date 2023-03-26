import { resourceType } from '../../types/index';
import style from './ResourceView.module.css';
import { TypedIcon } from 'typed-design-system';
import { MouseEventHandler } from 'react';

interface Props {
  resource: resourceType;
  onClickClose: MouseEventHandler;
}

function ResourceView({ resource, onClickClose }: Props) {
  return (
    <div className={style.main}>
      <div className={style.title}>
        {resource.title}
        <button onClick={onClickClose}>
          <TypedIcon
            icon="close_19"
            style={{ fontSize: '14px', cursor: 'pointer' }}
          ></TypedIcon>
        </button>
      </div>
      <div className={style.content}>
        {resource?.file ? (
          <img className={style.img} src={resource.imgUrl}></img>
        ) : (
          <iframe className={style.content_url} src={resource?.url}></iframe>
        )}
      </div>
    </div>
  );
}

export default ResourceView;
