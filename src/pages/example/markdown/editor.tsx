import MarkdownEditor from '@/components/ui/markdown-editor.tsx';

export default function Editor() {
  const mkdStr = `
    # Markdown Editor
    
    ---
    
    **Hello world!!!**
    
    [![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)
    
    \`\`\`javascript
    import React from "react";
    import ReactDOM from "react-dom";
    import MEDitor from '@uiw/react-md-editor'; 
    
    \`\`\`
    `;
  return (
    <MarkdownEditor height={350} markdownMessage={mkdStr} />
  );
}
