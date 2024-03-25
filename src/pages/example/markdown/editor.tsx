import MarkdownEditor from '@/components/ui/markdown-editor';
import { markdown } from './example.md';

export default function Editor() {
  const mkdStr = markdown;
  return (
    <MarkdownEditor height={350} markdownMessage={mkdStr} />
  );
}
