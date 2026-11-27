import { Link } from 'react-router-dom';
import { siteSettings, workQueue, type Text, type Workspace } from './workspace';

export function AdminOverview({ title, text, state }: { title: string; text: Text; state: Workspace }) {
  return (
    <section className="console-overview" aria-labelledby="console-title">
      <h1 id="console-title">{title}</h1>
      <p className="console-site">{siteSettings(state).name}</p>
      <div className="console-queue">
        {workQueue(state).map(task => <Link key={task.key} to={task.path}>
          <span>{text(task.key)}</span><strong>{task.count}</strong><i aria-hidden="true">›</i>
        </Link>)}
      </div>
    </section>
  );
}
