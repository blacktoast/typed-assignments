import { TypedIcon } from 'typed-design-system';
import Button from '../../components/Button/Button';
import ResourceView from '../../components/ResourceView';
import style from './Main.module.css';
import { useEffect, useRef, useState } from 'react';

function Main() {
  const [isShowUrlInput, setShowUrlInput] = useState(false);
  const [isShowImgInput, setShowImgInput] = useState(false);

  const inputUrl = useRef<HTMLInputElement>(null);
  const inputImg = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isShowUrlInput && inputUrl.current) {
      inputUrl.current.focus();
    }
  }, [isShowUrlInput]);

  useEffect(() => {
    if (isShowImgInput && inputImg.current) {
      inputImg.current.focus();
    }
  }, [isShowImgInput]);

  const onClickUrlInput = () => {
    setShowUrlInput(true);
  };

  const onClickImgInput = () => {
    setShowImgInput(true);
  };

  const onFocusOutInput = () => {
    setShowUrlInput(false);
    setShowImgInput(false);
  };

  return (
    <div className="flex">
      <div className={style.sideBar}>
        <div className={style.sideBar__nav}>
          <Button title="URL 추가" onClick={onClickUrlInput}></Button>
          <Button title="이미지 추가" onClick={onClickImgInput}></Button>
          {isShowUrlInput && (
            <div className={style.inputContainer}>
              <input
                className={style.inputUrl}
                type="text"
                ref={inputUrl}
                onBlur={onFocusOutInput}
              />
            </div>
          )}
          {isShowImgInput && (
            <div className={style.inputContainer}>
              <input
                className={style.inputUrl}
                type="text"
                ref={inputImg}
                onBlur={onFocusOutInput}
              />
            </div>
          )}
        </div>
      </div>
      <ResourceView />
    </div>
  );
}

export default Main;
