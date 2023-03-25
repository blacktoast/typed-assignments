import { TypedIcon } from 'typed-design-system';
import Button from '../../components/Button/Button';
import ResourceView from '../../components/ResourceView';
import style from './Main.module.css';
import { useEffect, useRef, useState } from 'react';

function Main() {
  const [isShowUrlInput, setShowUrlInput] = useState(false);
  const [isShowImgInput, setShowImgInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputUrl = useRef<HTMLInputElement>(null);
  const inputImg = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isShowUrlInput && inputUrl.current) {
      inputUrl.current.value = 'https://';
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

  const onFocusOutUrlInput = () => {
    const url = inputUrl.current?.value;

    if (url && !validateUrl(url)) {
      setIsModalOpen(true);
    } else {
      setShowUrlInput(false);
      //나중에 저장 로직 구현
    }
  };

  const handleReenter = () => {
    setIsModalOpen(false);
    setShowUrlInput(true);
    inputUrl.current?.focus();
  };

  const handleExitWithoutSaving = () => {
    setIsModalOpen(false);
    setShowUrlInput(false);
  };

  const onFocusOutInput = () => {
    setShowUrlInput(false);
    setShowImgInput(false);
  };

  const validateUrl = (url: string) => {
    const urlPattern = /^(https?:\/\/)/;
    return urlPattern.test(url);
  };

  return (
    <>
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
                  onBlur={onFocusOutUrlInput}
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

      {isModalOpen && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h2>올바르지 않는 URL</h2>
            <p>
              URL 스킴에는 반드시 "http://" 또는 "https://" 이 입력 돼야 합니다.
            </p>
            <div className={style.modalActions}>
              <Button title="다시 입력하기" onClick={handleReenter} />
              <Button
                title="저장 하지 않고 종료"
                onClick={handleExitWithoutSaving}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Main;
