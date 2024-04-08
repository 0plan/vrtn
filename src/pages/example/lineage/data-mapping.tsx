import ButterflyDataMapping from 'react-data-mapping';
import {
  columns, mappingData, sourceData, targetData,
} from '@/data/data-mapping/data';

export default function DataMapping() {
  return (
    <ButterflyDataMapping
      width={500}
      height={1000}
      type="single"
      columns={columns}
      sourceData={sourceData}
      targetData={targetData}
      mappingData={mappingData}
      className="butterfly-data-mappint"
      sourceClassName="source-column"
      targetClassName="target-column"
    />
  );
}
