"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  DownloadIcon,
  Frame,
  GalleryVerticalEnd,
  BarChart3,
  Map,
  Layout,
  Briefcase, // Added for internships
  Compass,
  Award,
  Video, // Changed for mock interview
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { StatusBanner } from "@/context/OfflineStatusContext"
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible"
import { useVoiceAssistant } from "@/hooks/useVoiceAssistant"
import { cn } from "@/lib/utils"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Career Center",
      type: "category",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: Layout,
          type: "link"
        },
        {
          title: "Career Consult",
          url: "/consult",
          icon: Bot,
          type: "link"
        },
        {
          title: "Mock Interview",
          url: "/mock-interview",
          icon: Video,
          type: "link"
        }
      ],
    },
    {
      title: "Career Planning",
      type: "category",
      items: [
        {
          title: "Skill Gap Analysis",
          url: "/skillgap",
          icon: Award,
          type: "link"
        },
        {
          title: "Career Roadmap",
          url: "/roadmap",
          icon: Compass,
          type: "link"
        },
        {
          title: "Market Trends",
          url: "/markettrends",
          icon: BarChart3,
          type: "link"
        },
        {
          title: "Internships",
          url: "/internships",
          icon: Briefcase,
          type: "link"
        }
      ],
    }
  ]
}

export function AppSidebar({
  ...props
}) {
  const { progress, isModelCached, downloadModel } = useVoiceAssistant();

const [isModelDownloaded, setIsModelDownloaded] = React.useState(false);

  React.useEffect(() => {
    const checkModel = async () => {
      const cached = await isModelCached();
      setIsModelDownloaded(cached);
    };
    checkModel();
  }, [isModelCached]);

  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <SidebarGroup>
          <SidebarGroupLabel>Offline Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible
                key="status"
                asChild
                className="group/collapsible">
                <SidebarMenuItem >
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton asChild onClick={downloadModel}>
                      <div className={`border`}>
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        {(progress.text && progress.percent !== 100)
                          ? `'Downloading... (${progress.percent}%)`
                          : "Download/Setup Offline Mode"}
                      </div>
                    </SidebarMenuButton>

                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>

        {(progress.text && progress.percent !== 100) && (
          <div className="text-xs animate-fade-in truncate overflow-ellipsis">
            {progress.text || "Loading..."}
          </div>
        )}
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar >
  );
}