import type { Edit, Workspace } from './workspace';

const key = 'dashboard-react-vite.workspace';

export function readWorkspace(): Workspace {
  try {
    const data = JSON.parse(sessionStorage.getItem(key) ?? '{}');
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

export function saveEdit(edit: Edit) {
  sessionStorage.setItem(key, JSON.stringify({ ...readWorkspace(), [edit.key]: edit.value }));
}

export function clearWorkspace() {
  sessionStorage.removeItem(key);
}
