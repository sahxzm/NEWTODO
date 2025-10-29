
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Flame, CheckCircle, Calendar, Target } from "lucide-react";
import React from "react";

const today = new Date();

const generateActivityData = () => {
    const data = [];
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 8);
    let currentDate = startDate;

    while (currentDate <= today) {
        const count = Math.random() > 0.3 ? Math.floor(Math.random() * 5) + 1 : 0;
        data.push({ date: new Date(currentDate), count });
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
};

const activityData = generateActivityData();
const todayCompletions = 3;
const currentStreak = 12;

const DayCell = ({ date, count }: { date: Date, count: number }) => {
    const intensity = Math.min(count / 5, 1);
    const color = count > 0 ? `hsla(var(--primary-raw, 330), 80%, ${90 - intensity * 40}%, 1)` : 'hsl(var(--muted))';
    
    const dayOfMonth = date.getDate();
    const isFirstDay = dayOfMonth === 1;
    const monthName = date.toLocaleString('default', { month: 'short' });

    return (
        <div className="relative group">
            <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: color }}
            />
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-card text-card-foreground text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
                {count} tasks on {date.toLocaleDateString()}
            </div>
             {isFirstDay && (
                <div className="absolute -top-5 left-0 text-xs text-muted-foreground" style={{transform: "translateX(-50%)"}}>
                    {monthName}
                </div>
            )}
        </div>
    );
};


const Heatmap = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const firstDay = activityData[0].date.getDay();

    const emptyDays = Array(firstDay).fill(null);

    return (
        <Card className="rounded-2xl">
            <CardHeader>
                <CardTitle className="font-headline">Activity Heatmap</CardTitle>
                <CardDescription>Your task completion history for the last 8 months.</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2.5">
                <div className="flex flex-col gap-1.5 text-xs text-muted-foreground mt-[1.2rem]">
                    {days.map(day => <div key={day} className="h-4 flex items-center">{day}</div>)}
                </div>
                <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto pb-4">
                    {emptyDays.map((_, i) => <div key={`empty-${i}`} className="w-4 h-4" />)}
                    {activityData.map(({ date, count }) => (
                        <DayCell key={date.toISOString()} date={date} count={count} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};


export default function StreaksPage() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
             <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Streaks</h2>
                <p className="text-muted-foreground">
                    Consistency is key. See your progress and build momentum.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Today's Completions</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{todayCompletions}</div>
                        <p className="text-xs text-muted-foreground">tasks completed today</p>
                    </CardContent>
                </Card>
                 <Card className="rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                        <Flame className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{currentStreak} days</div>
                        <p className="text-xs text-muted-foreground">Don't break the chain!</p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Active Days</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activityData.filter(d=>d.count > 0).length}</div>
                        <p className="text-xs text-muted-foreground">in the last 8 months</p>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activityData.reduce((sum, d) => sum + d.count, 0)}</div>
                        <p className="text-xs text-muted-foreground">across all time</p>
                    </CardContent>
                </Card>
            </div>

            <Heatmap />

             <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle>Today's Tasks</CardTitle>
                     <CardDescription>Check off your tasks for today to keep the streak going.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                   <div className="flex items-center space-x-2">
                        <Checkbox id="task1" defaultChecked />
                        <label htmlFor="task1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 line-through text-muted-foreground">
                            Design new landing page
                        </label>
                   </div>
                   <div className="flex items-center space-x-2">
                        <Checkbox id="task2" defaultChecked />
                        <label htmlFor="task2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 line-through text-muted-foreground">
                            Morning run 5km
                        </label>
                   </div>
                   <div className="flex items-center space-x-2">
                        <Checkbox id="task3" />
                        <label htmlFor="task3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Develop component library
                        </label>
                   </div>
                </CardContent>
            </Card>

        </div>
    )
}
