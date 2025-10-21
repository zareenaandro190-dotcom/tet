
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { notifications } from '@/lib/notifications';
import { Bell, Newspaper, AlertTriangle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function NotificationsPage() {

    const getIconForType = (type: string) => {
        switch (type) {
            case 'Announcement':
                return <Newspaper className="h-5 w-5" />;
            case 'Alert':
                return <AlertTriangle className="h-5 w-5" />;
            case 'Info':
                return <Info className="h-5 w-5" />;
            default:
                return <Bell className="h-5 w-5" />;
        }
    }
    
    const getBadgeVariant = (type: string) => {
        switch (type) {
            case 'Announcement':
                return 'default';
            case 'Alert':
                return 'destructive';
            case 'Info':
                return 'secondary';
            default:
                return 'outline';
        }
    }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary flex items-center gap-3">
            <Bell className="h-8 w-8" />
            Notifications
        </h1>
        <p className="text-muted-foreground mt-2">Latest updates, news, and announcements regarding TET, DSC, and other exams.</p>
      </header>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {notifications.map((notification) => (
            <Card key={notification.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                        <Badge variant={getBadgeVariant(notification.type)}>{notification.type}</Badge>
                    </div>
                    <CardDescription>{new Date(notification.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{notification.description}</p>
                    {notification.link && (
                        <a href={notification.link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm font-semibold mt-4 inline-block">
                            Read More
                        </a>
                    )}
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
