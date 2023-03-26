import Button from '../../components/Button/Button';
import style from './SideBar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { resourceType } from '../../types';
import { v4 } from 'uuid';
import ResourceCard from '../../components/ResourceCard/ResourceCard';

interface Props {
  selectedResourceId: string;
  resources: resourceType[];
  setResources: Dispatch<SetStateAction<resourceType[]>>;
  setSelectedResourceId: (id: string) => void;
}

function SideBar({
  resources,
  setResources,
  setSelectedResourceId,
  selectedResourceId,
}: Props) {
  const [isShowUrlInput, setShowUrlInput] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const inputUrlRef = useRef<HTMLInputElement>(null);
  const inputImgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isShowUrlInput && inputUrlRef.current) {
      inputUrlRef.current.value = 'https://';
      inputUrlRef.current.focus();
    }
  }, [isShowUrlInput]);

  const onClickCard = (id: string) => {
    setSelectedResourceId(id);
  };

  const onClickCardDelete = (
    e: MouseEvent<HTMLButtonElement>,
    resource: resourceType
  ) => {
    e.stopPropagation();
    setResources(
      resources.filter((prevResource) => prevResource.id !== resource.id)
    );

    if (resource.id === selectedResourceId) setSelectedResourceId('');

    if (resource?.file && resource?.imgUrl)
      URL.revokeObjectURL(resource.imgUrl);
  };

  const convertYouTubeLink = (url: string) => {
    const regex = /youtube\.com\/watch\?v=([^&]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

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
      storeUrl(url);
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      storeImages(event.target.files);
    }
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
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
      storeResource({
        id: v4(),
        title: file.name,
        file,
        imgUrl: URL.createObjectURL(file),
      });
    });
  };

  const storeUrl = (url: string) => {
    const newUrl = convertYouTubeLink(url);
    storeResource({ id: v4(), title: url, url: newUrl });
  };

  const validateUrl = (url: string) => {
    const urlPattern = /^(https?:\/\/)/;
    return urlPattern.test(url);
  };

  const handleReEnter = () => {
    setIsModalOpen(false);
    setShowUrlInput(true);
    inputUrlRef.current?.focus();
  };

  const exitWithoutSaving = () => {
    setIsModalOpen(false);
    setShowUrlInput(false);
  };

  const storeResource = (resource: resourceType) => {
    const delay = Math.floor(Math.random() * (1000 - 300 + 1)) + 300;
    const isSuccess = Math.random() <= 0.8;

    setResources((prevResources) => [
      { ...resource, isFetching: true },
      ...prevResources,
    ]);

    setTimeout(() => {
      if (isSuccess) {
        setResources((prevResources) =>
          prevResources.map((prev) =>
            prev.id === resource.id ? { ...resource, isFetching: false } : prev
          )
        );

        toast.success(`${resource.title} 등록에 성공 했습니다.`);
      } else {
        toast.error(`${resource.title} 등록에 실패 했습니다.`);
        setResources((prevResources) =>
          prevResources.filter((prev) => prev.id !== resource.id)
        );
      }
    }, delay);
  };

  const editResource = (resource: resourceType) => {
    if (!resource.title.trim().length) {
      toast.error('빈값으로는 수정 할 수 없습니다.');
      return false;
    }

    const newResources = resources.map((prevResource) => {
      if (prevResource.id === resource.id) {
        return resource;
      }
      return prevResource;
    });
    setResources(newResources);
    toast.success('리소스를 수정 했습니다.');

    return true;
  };

  return (
    <>
      <div className="flex ">
        <div
          className={style.sideBar}
          style={{
            border: isDragging ? '2px dashed gray' : 'none',
          }}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div className={style.sideBar__nav}>
            <Button title="URL 추가" onClick={onClickUrlInput}></Button>
            <Button title="이미지 추가" onClick={onClickImgInput}></Button>
            <input
              type="file"
              ref={inputImgRef}
              onChange={onFileChange}
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
            return (
              <ResourceCard
                key={resource.id}
                resource={resource}
                editResource={editResource}
                onClickCard={onClickCard}
                onClickDelete={onClickCardDelete}
              />
            );
          })}
        </div>
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
              <Button title="저장 하지 않고 종료" onClick={exitWithoutSaving} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;
