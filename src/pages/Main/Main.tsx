import { TypedIcon } from 'typed-design-system';
import Button from '../../components/Button/Button';
import ResourceView from '../../components/ResourceView';
import style from './Main.module.css';
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';

function Main() {
  const [isShowUrlInput, setShowUrlInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<File>();

  const inputUrl = useRef<HTMLInputElement>(null);
  const inputImgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isShowUrlInput && inputUrl.current) {
      inputUrl.current.value = 'https://';
      inputUrl.current.focus();
    }
  }, [isShowUrlInput]);

  const onClickUrlInput = () => {
    setShowUrlInput(true);
  };

  const onClickImgInput = () => {
    if (inputImgRef.current) {
      inputImgRef.current.click();
    }
  };

  const onFocusOutUrlInput = () => {
    const url = inputUrl.current?.value;

    if (url && !validateUrl(url)) {
      setIsModalOpen(true);
    } else {
      setShowUrlInput(false);
      console.log('store!');
      //나중에 저장 로직 구현
    }
  };

  const handleReEnter = () => {
    setIsModalOpen(false);
    setShowUrlInput(true);
    inputUrl.current?.focus();
  };

  const handleExitWithoutSaving = () => {
    setIsModalOpen(false);
    setShowUrlInput(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        // Process each uploaded image file here (e.g., display a preview, upload to a server, etc.)
        console.log('Image file:', file);
        setImage(file);
      });
    }
  };

  const validateUrl = (url: string) => {
    const urlPattern = /^(https?:\/\/)/;
    return urlPattern.test(url);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    const hasFile = files && event.dataTransfer.files.length > 0;

    if (hasFile) {
      console.log(files);
      const validFiles = Array.from(event.dataTransfer.files).filter(
        (file) => file.type === 'image/png' || file.type === 'image/jpeg'
      );

      validFiles.forEach((file) => {
        // Process each uploaded image file here (e.g., display a preview, upload to a server, etc.)
        console.log('Image file:', file);
      });
    }
  };

  return (
    <>
      <div className="flex">
        <div
          className={style.sideBar}
          style={{
            border: isDragging ? '2px dashed gray' : 'none',
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className={style.sideBar__nav}>
            <Button title="URL 추가" onClick={onClickUrlInput}></Button>
            <Button title="이미지 추가" onClick={onClickImgInput}></Button>
            <input
              type="file"
              ref={inputImgRef}
              onChange={handleFileChange}
              accept=".png, .jpg, .jpeg"
              multiple
              style={{ display: 'none' }}
            />

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
          </div>
        </div>
        <ResourceView />
        {image && <img src={URL.createObjectURL(image)} alt="" />}
      </div>

      {isModalOpen && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <h2>올바르지 않는 URL</h2>
            <p>
              URL 스킴에는 반드시 "http://" 또는 "https://" 이 입력 돼야 합니다.
            </p>
            <div className={style.modalActions}>
              <Button title="다시 입력하기" onClick={handleReEnter} />
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
