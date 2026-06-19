import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';

export default function TabsDemo() {
  const { t } = useTranslation();
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">{t('example.tabs.account')}</TabsTrigger>
        <TabsTrigger value="password">{t('example.tabs.password')}</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>{t('example.tabs.account')}</CardTitle>
            <CardDescription>
              {t('example.tabs.accountDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">{t('example.tabs.name')}</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">{t('example.tabs.username')}</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>{t('example.tabs.saveChanges')}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>{t('example.tabs.password')}</CardTitle>
            <CardDescription>
              {t('example.tabs.passwordDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">{t('example.tabs.currentPassword')}</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">{t('example.tabs.newPassword')}</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>{t('example.tabs.savePassword')}</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
