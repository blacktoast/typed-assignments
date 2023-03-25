import { TypedIcon } from 'typed-design-system';
import Button from '../../components/Button/Button';
import ResourceView from '../../components/ResourceView';
import style from './Main.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from 'react';
import { resourceType } from '../../types';
import { v4 } from 'uuid';

function Main() {
  const [isShowUrlInput, setShowUrlInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [resources, setResource] = useState<resourceType[]>([]);

  const inputUrlRef = useRef<HTMLInputElement>(null);
  const inputImgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isShowUrlInput && inputUrlRef.current) {
      inputUrlRef.current.value = 'https://';
      inputUrlRef.current.focus();
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
    const url = inputUrlRef.current?.value;

    if (!url) {
      return;
    }

    if (!validateUrl(url)) {
      setIsModalOpen(true);
    } else {
      setShowUrlInput(false);
      storeResource({ id: v4(), data: url });
    }
  };

  const handleReEnter = () => {
    setIsModalOpen(false);
    setShowUrlInput(true);
    inputUrlRef.current?.focus();
  };

  const handleExitWithoutSaving = () => {
    setIsModalOpen(false);
    setShowUrlInput(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      storeImages(event.target.files);
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
      storeImages(files);
    }
  };

  const storeImages = (images: FileList) => {
    const validFiles = Array.from(images).filter(
      (file) => file.type === 'image/png' || file.type === 'image/jpeg'
    );

    validFiles.forEach((file) => {
      storeResource({ id: v4(), data: file });
    });
  };

  const storeResource = (resource: resourceType) => {
    const delay = Math.floor(Math.random() * (1000 - 300 + 1)) + 300;
    const isSuccess = Math.random() <= 0.8;
    const { data } = resource;
    console.log(resource);
    setResource((prevResources) => [
      { ...resource, isFetching: true },
      ...prevResources,
    ]);

    setTimeout(() => {
      if (isSuccess) {
        setResource((prevResources) =>
          prevResources.map((prev) =>
            prev.id === resource.id ? { ...resource, isFetching: false } : prev
          )
        );

        data instanceof File
          ? toast.success(`${data.name} 등록에 성공 했습니다.`)
          : toast.success(`${data} 등록에 성공 했습니다.`);
      } else {
        data instanceof File
          ? toast.error(`${data.name} 등록에 실패 했습니다.`)
          : toast.error(`${data} 등록에 실패 했습니다.`);
        setResource((prevResources) =>
          prevResources.filter((prev) => prev.id !== resource.id)
        );
      }
    }, 1000);
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
                  ref={inputUrlRef}
                  onBlur={onFocusOutUrlInput}
                />
              </div>
            )}
          </div>
          {resources.map((resource) => {
            if (resource?.isFetching) {
              return <div key={resource.id}>loadings</div>;
            }

            if (resource.data instanceof File) {
              return <div key={resource.id}>{resource.data.name}</div>;
            }

            return <div key={resource.id}>{resource.data}</div>;
          })}
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
              <Button title="다시 입력하기" onClick={handleReEnter} />
              <Button
                title="저장 하지 않고 종료"
                onClick={handleExitWithoutSaving}
              />
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default Main;
