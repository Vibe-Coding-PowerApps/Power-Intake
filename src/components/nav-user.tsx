"use client"

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/ui/sidebar'

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  
  // Generate initials from user's name
  const getInitials = (name: string) => {
    if (!name) return "U"
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }
  
  const initials = getInitials(user.name)
  
  // Debug: log the avatar URL
  if (typeof window !== 'undefined') {
    console.log("User avatar URL:", user.avatar)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Direct test image for debug */}
              <img
                src="/icons/john-doe.jpg"
                alt="Test John Doe"
                style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', background: '#222', marginRight: 8 }}
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  // eslint-disable-next-line no-console
                  console.error('Sidebar test image failed to load:', e.currentTarget.src);
                }}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <span style={{position: 'relative', display: 'inline-block', width: 36, height: 36}}>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', background: '#222' }}
                    onError={e => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <span
                    style={{
                      display: 'none',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#444',
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      lineHeight: '36px',
                    }}
                  >
                    {initials}
                  </span>
                </span>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
