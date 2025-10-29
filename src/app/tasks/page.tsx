
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { tasks } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle } from 'lucide-react';

export default function TasksPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Task Management</h2>
          <p className="text-muted-foreground">
            Here's a list of your tasks. Stay organized and focused.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="todo">To-Do</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="done">Done</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>
                Everything on your plate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskTable tasks={tasks} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="todo">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>To-Do</CardTitle>
              <CardDescription>
                Tasks waiting to be started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskTable tasks={tasks.filter(t => t.status === 'todo')} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="in-progress">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>In Progress</CardTitle>
              <CardDescription>
                Tasks you are currently working on.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskTable tasks={tasks.filter(t => t.status === 'in-progress')} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="done">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Done</CardTitle>
              <CardDescription>
                Completed tasks. Well done!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskTable tasks={tasks.filter(t => t.status === 'done')} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function TaskTable({ tasks }: { tasks: typeof import('@/lib/data').tasks }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Status</span>
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="hidden md:table-cell">Deadline</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="hidden sm:table-cell">
              <Checkbox checked={task.status === 'done'} aria-label="Mark task as complete" />
            </TableCell>
            <TableCell className="font-medium">{task.title}</TableCell>
            <TableCell>
              <Badge variant="secondary">{task.category}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {new Date(task.deadline).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
