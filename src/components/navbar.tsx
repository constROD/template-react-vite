import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Link, useRouter } from '@tanstack/react-router';
import { ThemeToggle } from './ui/theme-toggle';

export function Navbar() {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  return (
    <div className="border-b">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex w-full items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), {
                      'font-bold': pathname === '/',
                    })}
                  >
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/sample">
                  <NavigationMenuLink
                    className={cn(navigationMenuTriggerStyle(), {
                      'font-bold': pathname === '/sample',
                    })}
                  >
                    Sample
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
