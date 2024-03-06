import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQAccordionProps {
	children: React.ReactNode;
	value?: string;
}

export const FAQAccordion = ({ children }: FAQAccordionProps) => {
	return (
		<Accordion
			type='multiple'
			className='mx-auto w-[95%] sm:w-[80%] mt-8'
		>
			{children}
		</Accordion>
	);
};

FAQAccordion.Item = function ({ children, value }: FAQAccordionProps) {
	return (
		<AccordionItem
			className='mt-4 bg-white rounded-lg'
			value={value || 'item-unknown'}
		>
			{children}
		</AccordionItem>
	);
};

FAQAccordion.Trigger = function ({ children }: FAQAccordionProps) {
	return <AccordionTrigger className='px-4 text-lg font-semibold'>{children}</AccordionTrigger>;
};

FAQAccordion.Content = function ({ children }: FAQAccordionProps) {
	return <AccordionContent className='text-justify px-4 text-lg'>{children}</AccordionContent>;
};
