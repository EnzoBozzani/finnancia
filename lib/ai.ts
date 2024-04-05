import { BaseParams, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const generationConfig: BaseParams['generationConfig'] = {
	maxOutputTokens: 100,
};
const safetySettings: BaseParams['safetySettings'] = [
	{
		category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
		threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_HARASSMENT,
		threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
		threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
		threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
		threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
	},
];

export async function generateResponseFromPrompt(inputText: string) {
	const model = genAI.getGenerativeModel({ model: 'gemini-pro', safetySettings, generationConfig });

	const prompt = `Atenção! Se a pergunta que for feita a seguir não for sobre temas relacionados a controle financeiro, auxílio na organização da vida financeira, ou algo similar, você deve responder dizendo que apenas responderá questões relacionadas ao controle de finanças. Se a pergunta for sobre o controle de finanças, responda-a e se apresente como a FinnancIA, a inteligência artificial do Finnancia! Pergunta: ${inputText}`;

	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();

	return text;
}
