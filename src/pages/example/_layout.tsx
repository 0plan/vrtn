import { Link, Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '@/components/layouts/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { examples } from '@/data/example';

export default function Example() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentPath = '';

    for (let i = 0; i < pathnames.length; i++) {
      const name = pathnames[i];
      currentPath += `/${name}`;

      // Try to find a matching title from examples data
      let title = name.charAt(0).toUpperCase() + name.slice(1);
      
      // Look for a match in groups
      const group = examples.find(g => g.title.toLowerCase() === name.toLowerCase());
      if (group) {
        title = group.title;
      } else {
        // Look for a match in children
        for (const g of examples) {
          const child = g.children?.find(c => c.path === currentPath);
          if (child) {
            title = child.title;
            break;
          }
        }
      }

      breadcrumbs.push({
        name: title,
        path: currentPath,
        isLast: i === pathnames.length - 1
      });
    }
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <SidebarProvider>
      <AppSidebar examples={examples} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 bg-background/95 backdrop-blur z-10">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}
              {breadcrumbs.map((bc, index) => (
                <div key={bc.path} className="flex items-center gap-1.5">
                  <BreadcrumbItem>
                    {bc.isLast ? (
                      <BreadcrumbPage>{bc.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={bc.path}>{bc.name}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-6 bg-muted/20">
          <div className="mx-auto w-full max-w-4xl space-y-6">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
