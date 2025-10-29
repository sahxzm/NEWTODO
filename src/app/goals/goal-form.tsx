'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getAIGoal } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Loader } from 'lucide-react';

const initialState = {
  message: '',
  output: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      Generate SMART Goal
    </Button>
  );
}

export function GoalForm() {
  const [state, formAction] = useFormState(getAIGoal, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.message !== 'success') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="goalDescription">What do you want to achieve?</Label>
          <Textarea
            id="goalDescription"
            name="goalDescription"
            placeholder="e.g., Learn to play guitar, run a 5k..."
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mood">How are you feeling?</Label>
          <Select name="mood" defaultValue="neutral">
            <SelectTrigger id="mood">
              <SelectValue placeholder="Select mood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="energetic">Energetic</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="tired">Tired</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="availableTime">How much time can you commit?</Label>
          <Select name="availableTime" defaultValue="30-minutes">
            <SelectTrigger id="availableTime">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15-minutes">15 minutes / day</SelectItem>
              <SelectItem value="30-minutes">30 minutes / day</SelectItem>
              <SelectItem value="1-hour">1 hour / day</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="desiredChallenge">What's the desired challenge level?</Label>
          <Select name="desiredChallenge" defaultValue="medium">
            <SelectTrigger id="desiredChallenge">
              <SelectValue placeholder="Select challenge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="goalCategory">Category</Label>
          <Select name="goalCategory" defaultValue="personal">
            <SelectTrigger id="goalCategory">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fitness">Fitness</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="learning">Learning</SelectItem>
              <SelectItem value="personal">Personal Project</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <SubmitButton />
      </form>

      {state.output && (
        <Card className="mt-6 bg-secondary/50 border-primary/20">
          <CardHeader>
            <CardTitle className="font-headline">Your New SMART Goal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">Goal:</h4>
              <p>{state.output.smartGoal}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Motivation Tips:</h4>
              <p className="text-sm text-muted-foreground italic">"{state.output.motivationTips}"</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
