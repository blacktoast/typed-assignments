import { TypedIcon } from 'typed-design-system';
import Button from '../../components/Button/Button';
import ResourceView from '../../components/ResourceView';
import style from './Main.module.css';

function Main() {
  return (
    <div className="flex">
      <div className={style.sideBar}>
        <div className={style.sideBar__nav}>
          <Button title="URL 추가"></Button>
          <Button title="이미지 추가"></Button>
        </div>
      </div>
      <ResourceView />
    </div>
  );
}

export default Main;
