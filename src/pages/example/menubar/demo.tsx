import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { useTranslation } from 'react-i18next';

export default function MenubarDemo() {
  const { t } = useTranslation();
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{t('example.menubar.file')}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            {t('example.menubar.newTab')} <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            {t('example.menubar.newWindow')} <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>{t('example.menubar.newIncognitoWindow')}</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>{t('example.menubar.share')}</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>{t('example.menubar.emailLink')}</MenubarItem>
              <MenubarItem>{t('example.menubar.messages')}</MenubarItem>
              <MenubarItem>{t('example.menubar.notes')}</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            {t('example.menubar.print')} <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>{t('example.menubar.edit')}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            {t('example.menubar.undo')} <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            {t('example.menubar.redo')} <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>{t('example.menubar.find')}</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>{t('example.menubar.searchTheWeb')}</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>{t('example.menubar.findEllipsis')}</MenubarItem>
              <MenubarItem>{t('example.menubar.findNext')}</MenubarItem>
              <MenubarItem>{t('example.menubar.findPrevious')}</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>{t('example.menubar.cut')}</MenubarItem>
          <MenubarItem>{t('example.menubar.copy')}</MenubarItem>
          <MenubarItem>{t('example.menubar.paste')}</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>{t('example.menubar.view')}</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>{t('example.menubar.alwaysShowBookmarksBar')}</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            {t('example.menubar.alwaysShowFullUrls')}
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            {t('example.menubar.reload')} <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            {t('example.menubar.forceReload')} <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>{t('example.menubar.toggleFullscreen')}</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>{t('example.menubar.hideSidebar')}</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>{t('example.menubar.profiles')}</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>{t('example.menubar.editEllipsis')}</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>{t('example.menubar.addProfile')}</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
