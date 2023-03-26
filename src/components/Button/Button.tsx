import { MouseEventHandler } from 'react';
import style from './Button.module.css';

interface Props {
  title: string;
  onClick?: MouseEventHandler<HTMLElement>;
}

function Button({ title, onClick }: Props) {
  return (
    <button className={style.btn} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
