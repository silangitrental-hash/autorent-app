import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI({projectId: 'autorent-manager-crdd3'})],
  model: 'googleai/gemini-2.5-flash',
});
