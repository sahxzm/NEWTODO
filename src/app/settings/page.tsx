
'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const themes = [
  { value: 'light', label: 'Light', color: '#FFFFFF' },
  { value: 'dark', label: 'Dark', color: '#1E1E1E' },
  { value: 'purple', label: 'Purple', color: '#E9D5FF' },
  { value: 'blue', label: 'Blue', color: '#DBEAFE' },
  { value: 'green', label: 'Green', color: '#D1FAE5' },
]

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and application preferences.
        </p>
      </div>
      <Tabs defaultValue="appearance">
        <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <TabsContent value="appearance">
            <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of your workspace.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Theme</Label>
                        <RadioGroup defaultValue="purple" className="flex items-center gap-4">
                            {themes.map(theme => (
                                <div key={theme.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={theme.value} id={`theme-${theme.value}`} />
                                    <Label htmlFor={`theme-${theme.value}`} className="flex items-center gap-2 cursor-pointer">
                                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: theme.color }}></div>
                                        {theme.label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="bg-upload">Custom Background</Label>
                        <div className="flex items-center gap-4">
                           <Input id="bg-upload" type="file" className="max-w-sm" />
                           <Button variant="ghost">Remove</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Upload an image to use as your background.</p>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="account">
            <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Manage your account details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p><span className="font-semibold">Email:</span> user@example.com</p>
                    <p><span className="font-semibold">Member Since:</span> August 1, 2024</p>
                    <Button variant="destructive">Sign Out</Button>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="notifications">
            <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
                        <Label htmlFor="task-reminders">Task Reminders</Label>
                        <Switch id="task-reminders" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
                        <Label htmlFor="focus-complete">Focus Session Complete</Label>
                        <Switch id="focus-complete" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary">
                        <Label htmlFor="goal-milestones">Goal Milestones</Label>
                        <Switch id="goal-milestones" />
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="data">
             <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle>Data Management</CardTitle>
                    <CardDescription>Export or clear your application data.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button>Export Data as JSON</Button>
                    <Button variant="destructive">Clear All Local Data</Button>
                    <p className="text-xs text-muted-foreground">Warning: Clearing data is permanent and cannot be undone.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="about">
             <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle>About Dreamer</CardTitle>
                    <CardDescription>Version 1.0.0</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Your personal OS for productivity and peace.</p>
                    <p className="text-sm text-muted-foreground mt-4">Made with ♡</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
