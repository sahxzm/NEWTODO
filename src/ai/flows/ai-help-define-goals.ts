'use server';

/**
 * @fileOverview An AI tool to help users define SMART goals.
 *
 * - aiHelpDefineGoals - A function that helps define SMART goals based on user input.
 * - AiHelpDefineGoalsInput - The input type for the aiHelpDefineGoals function.
 * - AiHelpDefineGoalsOutput - The return type for the aiHelpDefineGoals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiHelpDefineGoalsInputSchema = z.object({
  mood: z
    .string()
    .describe('The users current mood (e.g., happy, sad, energetic, tired).'),
  availableTime: z
    .string()
    .describe('The amount of time the user has available (e.g., 30 minutes, 1 hour, all day).'),
  desiredChallenge: z
    .string()
    .describe(
      'The users desired level of challenge (e.g., easy, medium, hard).  Consider what is achievable with the time they have available.'
    ),
  goalCategory: z
    .string()
    .describe('The category of the goal (e.g., fitness, work, personal project).'),
  goalDescription: z
    .string()
    .describe('A brief description of the goal the user wants to achieve.'),
});
export type AiHelpDefineGoalsInput = z.infer<typeof AiHelpDefineGoalsInputSchema>;

const AiHelpDefineGoalsOutputSchema = z.object({
  smartGoal: z.string().describe('A SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goal defined based on the user input.'),
  motivationTips: z
    .string()
    .describe('Motivational tips to help the user achieve their goal.'),
});
export type AiHelpDefineGoalsOutput = z.infer<typeof AiHelpDefineGoalsOutputSchema>;

export async function aiHelpDefineGoals(
  input: AiHelpDefineGoalsInput
): Promise<AiHelpDefineGoalsOutput> {
  return aiHelpDefineGoalsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHelpDefineGoalsPrompt',
  input: {schema: AiHelpDefineGoalsInputSchema},
  output: {schema: AiHelpDefineGoalsOutputSchema},
  prompt: `You are an AI assistant designed to help users define SMART goals.

  Based on the users current mood, available time, desired level of challenge, the goal category, and goal description, define a SMART (Specific, Measurable, Achievable, Relevant, Time-bound) goal and provide motivational tips to help them achieve it.

  Current Mood: {{{mood}}}
  Available Time: {{{availableTime}}}
  Desired Challenge: {{{desiredChallenge}}}
  Goal Category: {{{goalCategory}}}
  Goal Description: {{{goalDescription}}}

  SMART Goal: 
  Motivation Tips: `,
});

const aiHelpDefineGoalsFlow = ai.defineFlow(
  {
    name: 'aiHelpDefineGoalsFlow',
    inputSchema: AiHelpDefineGoalsInputSchema,
    outputSchema: AiHelpDefineGoalsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
