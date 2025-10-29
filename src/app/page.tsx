
import Image from 'next/image';
import {
  Activity,
  CheckCircle2,
  Clock,
  Plus,
  Book,
  Target,
  Timer,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { tasks } from '@/lib/data';


export default function DashboardPage() {
  const heroImage = getPlaceholderImage('zen-garden');

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
       <Card className="relative flex min-h-[12rem] w-full flex-col justify-end overflow-hidden rounded-2xl">
        <div className="p-6">
          <h1 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
            Welcome back, Dreamer!
          </h1>
          <p className="text-muted-foreground">
            "The secret of getting ahead is getting started." - Mark Twain
          </p>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasks Completed
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Focus Hours</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5h</div>
            <p className="text-xs text-muted-foreground">+20% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Points
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">Soaring high!</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 days</div>
            <p className="text-xs text-muted-foreground">Amazing consistency!</p>
          </CardContent>
        </Card>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/tasks">
                <Button variant="outline" className="w-full h-full p-4 flex flex-col items-center justify-center gap-2 rounded-2xl">
                    <CheckCircle2 className="w-6 h-6" />
                    <span>Add Task</span>
                </Button>
            </Link>
            <Link href="/focus">
                 <Button variant="outline" className="w-full h-full p-4 flex flex-col items-center justify-center gap-2 rounded-2xl">
                    <Timer className="w-6 h-6" />
                    <span>Start Focus</span>
                </Button>
            </Link>
            <Link href="/goals">
                 <Button variant="outline" className="w-full h-full p-4 flex flex-col items-center justify-center gap-2 rounded-2xl">
                    <Target className="w-6 h-6" />
                    <span>View Goals</span>
                </Button>
            </Link>
            <Link href="/journal">
                 <Button variant="outline" className="w-full h-full p-4 flex flex-col items-center justify-center gap-2 rounded-2xl">
                    <Book className="w-6 h-6" />
                    <span>Journal Entry</span>
                </Button>
            </Link>
       </div>

      <div className="grid gap-4 md:gap-8">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Today's Tasks</CardTitle>
            <CardDescription>
              A preview of what's on your plate for today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Progress</span>
                    <span className="text-sm font-bold">50%</span>
                </div>
                <Progress value={50} className="h-2" />
                <div className="space-y-2">
                    {tasks.slice(0,3).map(task => (
                        <div key={task.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary">
                            <div className={cn(
                                "flex h-5 w-5 items-center justify-center rounded-full",
                                task.status === 'done' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                                )}>
                                {task.status === 'done' && <CheckCircle2 className="h-4 w-4" />}
                            </div>
                            <span className={cn(task.status === 'done' && 'line-through text-muted-foreground')}>
                                {task.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
