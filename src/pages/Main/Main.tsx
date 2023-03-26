import ResourceView from '../../components/ResourceView/ResourceView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { resourceType } from '../../types';
import SideBar from '../../components/SideBar/SideBar';

function Main() {
  const [resources, setResources] = useState<resourceType[]>([]);
  const [selectedResourceId, setSelectedResourceId] = useState('');

  const onClickCloseViewer = () => {
    setSelectedResourceId('');
  };

  return (
    <>
      <div className="flex ">
        <SideBar
          resources={resources}
          setResources={setResources}
          selectedResourceId={selectedResourceId}
          setSelectedResourceId={setSelectedResourceId}
        />
        {selectedResourceId && (
          <ResourceView
            resource={
              resources.filter(
                (resource) => resource.id === selectedResourceId
              )[0]
            }
            onClickClose={onClickCloseViewer}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default Main;
