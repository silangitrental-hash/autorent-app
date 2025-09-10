
'use server';

/**
 * @fileOverview An AI agent for generating a professional invoice image from order details.
 *
 * - generateInvoiceImage - A function that generates an invoice image.
 * - GenerateInvoiceImageInput - The input type for the generateInvoiceImage function.
 * - GenerateInvoiceImageOutput - The return type for the generateInvoiceImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInvoiceImageInputSchema = z.object({
  orderId: z.string().describe('The unique identifier for the order.'),
  customerName: z.string().describe('The name of the customer.'),
  date: z.string().describe('The date of the invoice.'),
  items: z.array(z.object({
    description: z.string(),
    amount: z.string(),
  })).describe('An array of line items for the invoice.'),
  total: z.string().describe('The total amount of the invoice.'),
  status: z.string().describe('The payment status of the invoice (e.g., Lunas, Pending).'),
  companyName: z.string().describe('The name of the company issuing the invoice.'),
  logoUrl: z.string().optional().describe('URL to the company logo.'),
});
export type GenerateInvoiceImageInput = z.infer<typeof GenerateInvoiceImageInputSchema>;

const GenerateInvoiceImageOutputSchema = z.object({
  invoiceImageDataUri: z
    .string()
    .describe(
      "The generated invoice image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:image/png;base64,<encoded_data>'."
    ),
});
export type GenerateInvoiceImageOutput = z.infer<typeof GenerateInvoiceImageOutputSchema>;

export async function generateInvoiceImage(
  input: GenerateInvoiceImageInput
): Promise<GenerateInvoiceImageOutput> {
  return generateInvoiceImageFlow(input);
}


const prompt = ai.definePrompt({
  name: 'generateInvoiceImagePrompt',
  input: {schema: GenerateInvoiceImageInputSchema},
  output: {schema: z.object({})}, // Output is an image, not structured data
  prompt: `
  You are an expert graphic designer tasked with creating a professional and clean invoice image.
  Generate an image that represents the following invoice details.

  **Instructions for the image design:**
  - Layout: Standard invoice format.
  - Header: Include the company name "{{companyName}}" and title "INVOICE".
  - Details Section: Show "Order ID: {{orderId}}", "Customer: {{customerName}}", and "Date: {{date}}".
  - Body: A table with two columns: "Description" and "Amount".
  - Line Items:
  {{#each items}}
    - {{this.description}}: {{this.amount}}
  {{/each}}
  - Footer: Clearly display "TOTAL: {{total}}" in a bold, prominent font.
  - Status Badge: Include a badge that says "Status: {{status}}". The badge color should be green for "Lunas" (Paid) and yellow for "Pending".
  - Style: Modern, minimalist, and clean. Use a color palette of blues, grays, and black. Ensure high readability.
  - The final output must be a single, high-quality image. Do not generate text or code.
  `,
  config: {
    // Use an image generation model
    model: 'googleai/gemini-2.5-flash-image-preview',
    responseModalities: ['IMAGE'],
    // Lower safety settings for creative content if needed, but be cautious
    safetySettings: [
        {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
        }
    ]
  }
});


const generateInvoiceImageFlow = ai.defineFlow(
  {
    name: 'generateInvoiceImageFlow',
    inputSchema: GenerateInvoiceImageInputSchema,
    outputSchema: GenerateInvoiceImageOutputSchema,
  },
  async (input) => {
    const {media} = await prompt(input);

    if (!media.url) {
      throw new Error('Image generation failed: No image data URI returned.');
    }

    return {
      invoiceImageDataUri: media.url,
    };
  }
);
