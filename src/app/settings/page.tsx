import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and application preferences.
        </p>
      </div>
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            This section is under construction. Settings for your profile, notifications, and theme will be available here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Thank you for your patience!</p>
        </CardContent>
      </Card>
    </div>
  );
}
