'use server';

import { aiHelpDefineGoals } from '@/ai/flows/ai-help-define-goals';
import type { AiHelpDefineGoalsInput, AiHelpDefineGoalsOutput } from '@/ai/flows/ai-help-define-goals';

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  output?: AiHelpDefineGoalsOutput;
};

export async function getAIGoal(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  
  const input: AiHelpDefineGoalsInput = {
    mood: formData.mood as string,
    availableTime: formData.availableTime as string,
    desiredChallenge: formData.desiredChallenge as string,
    goalCategory: formData.goalCategory as string,
    goalDescription: formData.goalDescription as string,
  };
  
  if (!input.goalDescription) {
    return {
      message: 'Please provide a goal description.',
    };
  }
  
  try {
    const result = await aiHelpDefineGoals(input);
    return {
      message: 'success',
      output: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: 'An error occurred while generating your goal. Please try again.',
    };
  }
}
