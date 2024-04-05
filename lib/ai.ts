import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function generateResponseFromPrompt(inputText: string) {
	const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

	const prompt = `Atenção! Se a pergunta que for feita a seguir não for sobre temas relacionados a controle financeiro, auxílio na organização da vida financeira, ou algo similar, você deve responder dizendo que apenas responderá questões relacionadas ao controle de finanças. Se a pergunta for sobre o controle de finanças, responda-a e se apresente como a FinnancIA, a inteligência artificial do Finnancia! Pergunta: ${inputText}`;

	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();

	return text;
}
