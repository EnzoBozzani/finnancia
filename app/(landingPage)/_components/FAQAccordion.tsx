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

export const FAQAccordionItem = ({ children, value }: FAQAccordionProps) => {
	return (
		<AccordionItem
			className='mt-4 bg-white rounded-lg'
			value={value || 'item-unknown'}
		>
			{children}
		</AccordionItem>
	);
};

export const FAQAccordionTrigger = ({ children }: FAQAccordionProps) => {
	return <AccordionTrigger className='px-4 text-lg font-semibold'>{children}</AccordionTrigger>;
};

export const FAQAccordionContent = ({ children }: FAQAccordionProps) => {
	return <AccordionContent className='text-justify px-4 text-lg'>{children}</AccordionContent>;
};
