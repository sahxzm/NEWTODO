import Image from 'next/image';
import {
  Activity,
  CheckCircle2,
  Clock,
  Plus,
  TrendingUp,
} from 'lucide-react';

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { getPlaceholderImage } from '@/lib/placeholder-images';
import { tasks } from '@/lib/data';
import { TaskCompletionChart } from './task-completion-chart';


export default function DashboardPage() {
  const heroImage = getPlaceholderImage('zen-garden');

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card className="relative flex h-48 w-full flex-col justify-end overflow-hidden rounded-2xl">
        <Image
          src={heroImage?.imageUrl || ''}
          alt={heroImage?.description || ''}
          data-ai-hint={heroImage?.imageHint}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative p-6">
          <h1 className="font-headline text-3xl font-bold text-white md:text-4xl">
            Welcome to your Zenith Zone
          </h1>
          <p className="text-white/80">
            Let's make today productive and peaceful.
          </p>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Focus Hours Today
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.5h</div>
            <p className="text-xs text-muted-foreground">+20% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasks Completed
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Current Goal Streak
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Mood</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Energized</div>
            <p className="text-xs text-muted-foreground">Set this morning</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="rounded-2xl xl:col-span-2">
          <CardHeader>
            <CardTitle>Task Completion Overview</CardTitle>
            <CardDescription>
              A look at your completed tasks over the past 6 months.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <TaskCompletionChart />
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Today's Tasks</CardTitle>
              <CardDescription>
                Here's what's on your plate for today.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1 rounded-full">
              <a href="/tasks">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add</span>
              </a>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.slice(0, 4).map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>
                      <div className="font-medium">{task.title}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {task.category}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          task.status === 'done'
                            ? 'bg-green-100 text-green-800'
                            : task.status === 'in-progress'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        )}
                        variant="outline"
                      >
                        {task.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
