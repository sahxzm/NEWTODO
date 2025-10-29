import { Check, Dot } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { goals } from '@/lib/data';
import { cn } from '@/lib/utils';
import { GoalForm } from './goal-form';

export default function GoalsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Goals & Aspirations</h2>
        <p className="text-muted-foreground">
          Define your ambitions and track your journey to success.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
           <h3 className="text-xl font-semibold font-headline">Current Goals</h3>
          {goals.map((goal) => {
            const completedMilestones = goal.milestones.filter(m => m.completed).length;
            const progress = (completedMilestones / goal.milestones.length) * 100;

            return (
              <Card key={goal.id} className="rounded-2xl">
                <CardHeader>
                  <CardTitle>{goal.smartGoal}</CardTitle>
                  <CardDescription className="italic">
                    "{goal.motivationTips}"
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Progress</span>
                      <span className="text-sm font-bold">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  <div className="space-y-2">
                     <h4 className="font-semibold">Milestones:</h4>
                    {goal.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center gap-2">
                         <div className={cn(
                          "flex h-5 w-5 items-center justify-center rounded-full",
                          milestone.completed ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                        )}>
                          {milestone.completed ? <Check className="h-4 w-4" /> : <Dot className="h-4 w-4" />}
                        </div>
                        <span className={cn(milestone.completed && 'line-through text-muted-foreground')}>
                          {milestone.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="lg:col-span-1">
          <Card className="rounded-2xl sticky top-20">
            <CardHeader>
              <CardTitle className="font-headline">Define a New Goal</CardTitle>
              <CardDescription>
                Need help? Let our AI assistant craft a SMART goal for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GoalForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
