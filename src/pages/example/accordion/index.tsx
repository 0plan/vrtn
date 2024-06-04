import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next';

interface IAccordionItem {
  title: string;
  content: string;
}

export default function AccordionDemo() {
  const { t } = useTranslation();
  const accordions: IAccordionItem[] = t('example.accordion', { returnObjects: true });
  return (
    <Accordion type="single" collapsible className="w-full">
      {
        accordions.map((accordion, index) => (
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger>{accordion.title}</AccordionTrigger>
            <AccordionContent>{accordion.content}</AccordionContent>
          </AccordionItem>
        ))
      }
    </Accordion>
  );
}
