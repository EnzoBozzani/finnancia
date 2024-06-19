'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useIsDarkTheme } from '@/hooks/useDarkTheme';
import { cn } from '@/lib/utils';

interface FAQAccordionProps {
	children: React.ReactNode;
	value?: string;
}

export const FAQAccordion = ({ children }: FAQAccordionProps) => {
	return (
		<Accordion
			type='multiple'
			className='mx-auto w-[90%] lg:w-[75%]'
		>
			{children}
		</Accordion>
	);
};

export const FAQAccordionItem = ({ children, value }: FAQAccordionProps) => {
	const isDark = useIsDarkTheme();

	return (
		<AccordionItem
			className={cn(
				'mt-4 bg-neutral-100 rounded-lg text-sm md:text-lg',
				isDark && 'bg-neutral-900 text-white border border-neutral-700'
			)}
			value={value || 'item-unknown'}
		>
			{children}
		</AccordionItem>
	);
};

export const FAQAccordionTrigger = ({ children }: FAQAccordionProps) => {
	return <AccordionTrigger className='px-4 font-semibold'>{children}</AccordionTrigger>;
};

export const FAQAccordionContent = ({ children }: FAQAccordionProps) => {
	return <AccordionContent className='text-justify px-4'>{children}</AccordionContent>;
};
