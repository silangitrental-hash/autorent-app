
'use server';

/**
 * @fileOverview An AI agent for generating promotional text based on vehicle details and a discount percentage.
 *
 * - generatePromoText - A function that generates promotional text.
 * - GeneratePromoTextInput - The input type for the generatePromoText function.
 * - GeneratePromoTextOutput - The return type for the generatePromoText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePromoTextInputSchema = z.object({
  vehicleName: z.string().describe('The name of the vehicle being promoted.'),
  vehicleType: z.string().describe('The type of vehicle (e.g., sedan, SUV, truck).'),
  rentalPrice: z.number().describe('The daily rental price of the vehicle.'),
  discountPercentage: z
    .number()
    .describe(
      'The discount percentage to be highlighted in the promotion.'
    ),
});
export type GeneratePromoTextInput = z.infer<typeof GeneratePromoTextInputSchema>;

const GeneratePromoTextOutputSchema = z.object({
  promoText:
    z.string().describe(
      'The generated promotional text that can be used in slider promotions.'
    ),
});
export type GeneratePromoTextOutput = z.infer<typeof GeneratePromoTextOutputSchema>;

export async function generatePromoText(
  input: GeneratePromoTextInput
): Promise<GeneratePromoTextOutput> {
  return generatePromoTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePromoTextPrompt',
  input: {schema: GeneratePromoTextInputSchema},
  output: {schema: GeneratePromoTextOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in promotional text for car rentals.

  Generate engaging promotional text for the following vehicle, highlighting the special discount:

  Vehicle Name: {{{vehicleName}}}
  Vehicle Type: {{{vehicleType}}}
  Rental Price: {{{rentalPrice}}}
  Discount: {{{discountPercentage}}}%

  Write several options of promotional text that are short, exciting, and emphasize the discount. Return it as a single string.
  For example: "Liburan makin hemat! Nikmati diskon {{{discountPercentage}}}% untuk sewa {{{vehicleName}}}. Pesan sekarang!"
  `,
});

const generatePromoTextFlow = ai.defineFlow(
  {
    name: 'generatePromoTextFlow',
    inputSchema: GeneratePromoTextInputSchema,
    outputSchema: GeneratePromoTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
