import ButterflyDataMapping from 'react-data-mapping';
import {
  columns, mappingData, sourceData, targetData,
} from '@/data/data-mapping/data';
import 'react-data-mapping/dist/index.css';

export default function DataMapping() {
  return (
    sourceData && (
    <ButterflyDataMapping
      width={500}
      height={500}
      type="single"
      columns={columns}
      sourceData={sourceData}
      targetData={targetData}
      mappingData={mappingData}
      className="butterfly-data-mappint"
      sourceClassName="source-column"
      targetClassName="target-column"
    />
    )
  );
}
