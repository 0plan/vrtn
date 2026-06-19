import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Search, Command, ChevronRight, Globe, Moon, Sun,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { GithubIcon } from '@/components/icons/github';
import { useDarkMode } from '@/lib/dark-mode';
import useLanguage from '@/stores/language';
import { IExample } from '@/data/example';

export function AppSidebar({ examples }: { examples: IExample[] }) {
  const location = useLocation();
  const { t } = useTranslation();
  const { toggle } = useDarkMode();
  const { toggleLang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.trim().toLowerCase();
  const filteredExamples = examples
    .map((group) => {
      const children = group.children ?? [];
      const groupMatches = group.title.toLowerCase().includes(query);
      return {
        ...group,
        children: groupMatches
          ? children
          : children.filter((child) => child.title.toLowerCase().includes(query)),
      };
    })
    .filter((group) => (group.children?.length ?? 0) > 0);

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">VRTN</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {t('sidebar.subtitle')}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-1 py-1 group-data-[collapsible=icon]:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-2.5 size-4 text-muted-foreground" />
            <SidebarInput
              placeholder={t('sidebar.searchPlaceholder')}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('menu.example')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredExamples.map((group) => {
                const children = group.children ?? [];

                // Single-demo groups render as a flat link.
                if (children.length === 1) {
                  const item = children[0];
                  return (
                    <SidebarMenuItem key={group.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.path}
                        tooltip={group.title}
                      >
                        <Link to={item.path}>
                          {item.icon ? <item.icon /> : null}
                          <span>{group.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }

                // Multi-demo groups render as a collapsible section.
                const groupActive = children.some(
                  (child) => child.path === location.pathname,
                );
                return (
                  <Collapsible
                    key={`${group.title}-${Boolean(query)}`}
                    asChild
                    defaultOpen={groupActive || Boolean(query)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={group.title} isActive={groupActive}>
                          <span>{group.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {children.map((item) => (
                            <SidebarMenuSubItem key={item.path}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={location.pathname === item.path}
                              >
                                <Link to={item.path}>
                                  <span>{item.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
              {filteredExamples.length === 0 && (
                <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                  {t('sidebar.noResults')}
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-center gap-1 group-data-[collapsible=icon]:flex-col">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
          >
            <Sun className="hidden dark:block" />
            <Moon className="dark:hidden" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLang}
            aria-label="Change language"
          >
            <Globe />
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="GitHub">
            <a
              href="https://github.com/0plan/vrtn"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon />
            </a>
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
