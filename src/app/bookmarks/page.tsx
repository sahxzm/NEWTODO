import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { bookmarkGroups } from '@/lib/data';
import type { Bookmark } from '@/lib/types';
import * as LucideIcons from 'lucide-react';

const Icon = ({ name, className }: { name: Bookmark['icon']; className: string }) => {
  if (name === 'Triangle') {
    const TriangleIcon = () => <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M12 2L2 22H22L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>;
    return <TriangleIcon />;
  }
  if (name === 'Palette') {
    const PaletteIcon = LucideIcons['Palette'];
    return <PaletteIcon className={className} />;
  }

  const LucideIcon = LucideIcons[name as keyof typeof LucideIcons] as LucideIcons.LucideIcon;
  if (LucideIcon) {
    return <LucideIcon className={className} />;
  }
  return <LucideIcons.Link2 className={className} />;
};


export default function BookmarksPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-headline">Bookmarks</h2>
          <p className="text-muted-foreground">
            Your collection of useful links and resources.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <LucideIcons.PlusCircle className="mr-2 h-4 w-4" />
            Add Bookmark
          </Button>
        </div>
      </div>
      
      <Accordion type="multiple" defaultValue={bookmarkGroups.map(g => g.id)} className="w-full space-y-4">
        {bookmarkGroups.map(group => (
          <AccordionItem key={group.id} value={group.id} className="border-b-0 rounded-2xl bg-card overflow-hidden">
            <AccordionTrigger className="px-6 py-4 text-lg font-headline hover:no-underline">
              {group.name}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.bookmarks.map(bookmark => (
                  <a
                    key={bookmark.id}
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-secondary"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon name={bookmark.icon} className="h-5 w-5" />
                    </div>
                    <div className="truncate">
                      <p className="font-semibold">{bookmark.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{bookmark.url}</p>
                    </div>
                  </a>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
