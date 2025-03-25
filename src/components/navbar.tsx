import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useAuthContext } from '@/contexts/auth';
import { useLayoutsContext } from '@/contexts/layouts';
import { cn } from '@/lib/utils';
import { useSessionStore } from '@/stores/use-session-store';
import { Link, useRouterState } from '@tanstack/react-router';
import { LogOut, User } from 'lucide-react';
import { ThemeToggle } from './ui/theme-toggle';

export function Navbar() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex w-full items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/"
                    className={cn(navigationMenuTriggerStyle(), {
                      'font-bold': pathname === '/',
                    })}
                  >
                    Home
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/sample"
                    className={cn(navigationMenuTriggerStyle(), {
                      'font-bold': pathname === '/sample',
                    })}
                  >
                    Sample
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <AuthenticationButton />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthenticationButton() {
  const layoutsContext = useLayoutsContext();
  const authContext = useAuthContext();

  const user = useSessionStore(s => s.user);

  if (layoutsContext.hideNavbar) return null;

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="h-8 w-8 cursor-pointer transition-opacity hover:opacity-80">
            <AvatarImage src="" alt="User avatar" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getUserInitials(user.name || user.email)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2"
            onClick={authContext.logout}
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <button
      onClick={() => authContext.login('test@test.com', 'password')}
      className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
    >
      <User className="h-4 w-4" />
      Login
    </button>
  );
}

// Helper function to get user initials from name or email
function getUserInitials(input?: string): string {
  if (!input) return 'U';

  // If it's a name with spaces, get first letter of each word
  if (input.includes(' ')) {
    return input
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

  // Otherwise just return first letter
  return input.charAt(0).toUpperCase();
}
