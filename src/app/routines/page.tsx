
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Repeat, Sparkles, TrendingUp } from "lucide-react";

const routines = [
    { id: 1, name: "Morning Meditation", category: "Mindfulness", frequency: "Daily", streak: 14, total: 102, lastCompleted: "2024-08-11", isActive: true },
    { id: 2, name: "Drink 8 glasses of water", category: "Health", frequency: "Daily", streak: 32, total: 450, lastCompleted: "2024-08-11", isActive: true },
    { id: 3, name: "Read for 15 minutes", category: "Learning", frequency: "Daily", streak: 5, total: 50, lastCompleted: "2024-08-10", isActive: true },
    { id: 4, name: "Weekly project review", category: "Work", frequency: "Weekly", streak: 8, total: 25, lastCompleted: "2024-08-05", isActive: false },
];

export default function RoutinesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Routines</h2>
          <p className="text-muted-foreground">
            Track and build your daily and weekly habits.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Routine
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
            <Repeat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">532</div>
            <p className="text-xs text-muted-foreground">+25 this week</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Completions</CardTitle>
            <PlusCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Completions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">+10% from last week</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32 days</div>
            <p className="text-xs text-muted-foreground">Water habit is strong!</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        {routines.map(routine => (
          <Card key={routine.id} className="rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
            <div className="flex-1 mb-4 sm:mb-0">
                <CardTitle className="font-headline text-lg">{routine.name}</CardTitle>
                <CardDescription>{routine.category} - {routine.frequency}</CardDescription>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>Streak: {routine.streak} days</span>
                    <span>Total: {routine.total}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                 <Button variant="outline">Mark Complete</Button>
                 <Button variant="ghost" size="sm">Toggle Active</Button>
                 <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
