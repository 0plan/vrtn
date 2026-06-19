import * as React from 'react';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export default function NavigationMenuDemo() {
  const { t } = useTranslation();
  const components: { title: string; href: string; description: string }[] = [
    {
      title: t('example.navigationMenu.alertDialogTitle'),
      href: '/docs/primitives/alert-dialog',
      description: t('example.navigationMenu.alertDialogDescription'),
    },
    {
      title: t('example.navigationMenu.hoverCardTitle'),
      href: '/docs/primitives/hover-card',
      description: t('example.navigationMenu.hoverCardDescription'),
    },
    {
      title: t('example.navigationMenu.progressTitle'),
      href: '/docs/primitives/progress',
      description: t('example.navigationMenu.progressDescription'),
    },
    {
      title: t('example.navigationMenu.scrollAreaTitle'),
      href: '/docs/primitives/scroll-area',
      description: t('example.navigationMenu.scrollAreaDescription'),
    },
    {
      title: t('example.navigationMenu.tabsTitle'),
      href: '/docs/primitives/tabs',
      description: t('example.navigationMenu.tabsDescription'),
    },
    {
      title: t('example.navigationMenu.tooltipTitle'),
      href: '/docs/primitives/tooltip',
      description: t('example.navigationMenu.tooltipDescription'),
    },
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('example.navigationMenu.gettingStarted')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      {t('example.navigationMenu.heroDescription')}
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title={t('example.navigationMenu.introductionTitle')}>
                {t('example.navigationMenu.introductionDescription')}
              </ListItem>
              <ListItem href="/docs/installation" title={t('example.navigationMenu.installationTitle')}>
                {t('example.navigationMenu.installationDescription')}
              </ListItem>
              <ListItem href="/docs/primitives/typography" title={t('example.navigationMenu.typographyTitle')}>
                {t('example.navigationMenu.typographyDescription')}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{t('example.navigationMenu.components')}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/docs">{t('example.navigationMenu.documentation')}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({
  className, title, children, ...props
}, ref) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className,
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
));
ListItem.displayName = 'ListItem';
