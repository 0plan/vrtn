import MDEditor from '@uiw/react-md-editor';
import { useState } from 'react';

interface IProps {
  height: number;
  markdownMessage: string;
}

export default function MarkdownEditor({ height, markdownMessage }: IProps) {
  const [value, setValue] = useState<string>(markdownMessage);
  const changeCode = (code: string | undefined) => {
    if (code !== undefined) setValue(code);
  };
  return (
    <div className="container">
      <MDEditor
        className="grayscale forced-colors:filter-none"
        value={value}
        height={height}
        onChange={(value) => changeCode(value)}
      />
    </div>
  );
}
