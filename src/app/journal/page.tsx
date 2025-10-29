import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { journalEntries } from "@/lib/data";
import { PlusCircle, Search } from "lucide-react";

export default function JournalPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Personal Journal</h2>
          <p className="text-muted-foreground">
            A quiet space for your thoughts, ideas, and reflections.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search entries..." className="pl-9 rounded-full" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {journalEntries.map(entry => (
          <Card key={entry.id} className="rounded-2xl flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">{entry.title}</CardTitle>
              <CardDescription>{new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-4">
                {entry.content}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="p-0 h-auto">Read more</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
