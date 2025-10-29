
'use client'

import React from 'react';
import { useTheme } from "next-themes"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const themes = [
  { value: 'light', label: 'Light', color: '#FFF' },
  { value: 'dark', label: 'Dark', color: '#18181b' },
  { value: 'theme-batman', label: 'Batman', color: '#0A0A0B' },
  { value: 'theme-hello-kitty', label: 'Hello Kitty', color: '#FFF0F5' },
  { value: 'theme-spiderman', label: 'Spiderman', color: '#E62E04' },
]

export default function SettingsPage() {
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: 'File too large',
          description: 'Please select an image smaller than 2MB.',
          variant: 'destructive',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        try {
          localStorage.setItem('custom-background', result);
          document.documentElement.style.setProperty('--custom-background-image', `url(${result})`);
          document.documentElement.style.setProperty('--background-opacity', '0.15');
          toast({
            title: 'Success!',
            description: 'Your custom background has been applied.',
          });
        } catch (error) {
          toast({
            title: 'Storage Error',
            description: 'Could not save the background. The image might be too large for local storage.',
            variant: 'destructive',
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearCustomBackground = () => {
    localStorage.removeItem('custom-background');
    document.documentElement.style.setProperty('--custom-background-image', 'none');
    // We need to re-apply the current theme's background if it has one
    const currentTheme = themes.find(t => t.value === theme);
    if (currentTheme?.value.startsWith('theme-')) {
        // This is a crude way, ideally the theme provider handles this
        // For now, we manually re-set theme to re-trigger styles
        setTheme('light');
        setTimeout(() => setTheme(currentTheme.value), 50);
    }
    toast({
      title: 'Background Cleared',
      description: 'Your custom background has been removed.',
    });
  };

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
                        <RadioGroup
                          defaultValue={theme}
                          onValueChange={(value) => {
                            localStorage.removeItem('custom-background'); // clear custom bg on theme change
                            setTheme(value);
                          }}
                          className="flex flex-wrap items-center gap-4"
                        >
                            {themes.map(themeOption => (
                                <div key={themeOption.value} className="flex items-center space-x-2">
                                    <RadioGroupItem value={themeOption.value} id={`theme-${themeOption.value}`} />
                                    <Label htmlFor={`theme-${themeOption.value}`} className="flex items-center gap-2 cursor-pointer">
                                        <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: themeOption.color }}
                                          data-ai-hint={`${themeOption.label.toLowerCase()} color swatch`}></div>
                                        {themeOption.label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label>Custom Background</Label>
                      <div className="flex items-center gap-2">
                        <Button onClick={() => fileInputRef.current?.click()}>Upload Image</Button>
                        <Button variant="ghost" onClick={clearCustomBackground}>Clear</Button>
                        <Input 
                          type="file" 
                          ref={fileInputRef} 
                          className="hidden" 
                          accept="image/png, image/jpeg, image/gif, image/webp"
                          onChange={handleFileChange} 
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Upload a custom wallpaper. Overrides theme backgrounds. (Max 2MB)
                      </p>
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
                </Header>
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
                </Header>
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
