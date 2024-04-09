import VisualModeling from 'react-visual-modeling';
import { columns, data } from '@/data/visual-modeling/data';
import { edgeMenu, nodeMenu } from '@/data/visual-modeling/menu';

export default function VisualModel() {
  return (
    data && (
    <VisualModeling
      width={500}
      height={500}
      data={data}
      column={columns}
      nodeMenu={nodeMenu}
      edgeMenu={edgeMenu}
      onLoaded={() => {
        console.log('onLoaded: ', data);
      }}
    />
    )
  );
}
