import { resourceType } from '../types/index';
interface Props {
  resource: resourceType;
}

function ResourceView({ resource }: Props) {
  return <div>{resource.title}</div>;
}

export default ResourceView;
