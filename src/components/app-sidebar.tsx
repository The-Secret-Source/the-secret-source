
'use client';

import { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarTrigger, SidebarRail, SidebarSeparator, SidebarGroup, SidebarGroupLabel, SidebarFooter } from "@/components/ui/sidebar";
import { Music, Users, Link, Filter, HelpCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { StackedProgress } from "./ui/stacked-progress";
import { ThemeToggle } from "./theme-toggle";

export interface AppSidebarStats {
  artistCount: number;
  trackCount: number;
  artistsWithDirectSupport: number;
  artistsWithDefinitelyMonetized: number;
  artistsWithPotentiallyMonetized: number;
  artistsWithOther: number;
  artistsWithDirectSupportPercentage: number;
  artistsWithDefinitelyMonetizedPercentage: number;
  artistsWithPotentiallyMonetizedPercentage: number;
  artistsWithOtherPercentage: number;
  tracksWithDirectSupport: number;
  tracksWithDefinitelyMonetized: number;
  tracksWithPotentiallyMonetized: number;
  tracksWithOther: number;
  tracksWithDirectSupportPercentage: number;
  tracksWithDefinitelyMonetizedPercentage: number;
  tracksWithPotentiallyMonetizedPercentage: number;
  tracksWithOtherPercentage: number;
  datasetCounts: Record<string, { artists: number; tracks: number }>;
}

interface AppSidebarProps {
  stats: AppSidebarStats;
  allDatasetNames: string[];
  selectedDatasets: string[];
  onDatasetToggle: (datasetName: string) => void;
  selectedLinkTypes: string[];
  onLinkTypeToggle: (linkType: string) => void;
}

const linkTypeFilters = [
  { id: 'bandcampUrl', label: 'Bandcamp' },
  { id: 'discogsUrl', label: 'Discogs' },
  { id: 'spotifyUrl', label: 'Spotify' },
  { id: 'appleMusicUrl', label: 'Apple Music' },
  { id: 'youtubeUrl', label: 'YouTube' },
  { id: 'soundcloudUrl', label: 'SoundCloud' },
  { id: 'other', label: 'Other' },
];

const linkTypeColors: Record<string, string> = {
  bandcampUrl: 'bg-accent',
  discogsUrl: 'bg-accent',
  spotifyUrl: 'bg-chart-2',
  appleMusicUrl: 'bg-chart-2',
  youtubeUrl: 'bg-chart-3',
  soundcloudUrl: 'bg-chart-3',
  other: 'bg-chart-4',
};

export function AppSidebar({ stats, allDatasetNames, selectedDatasets, onDatasetToggle, selectedLinkTypes, onLinkTypeToggle }: AppSidebarProps) {
  const { artistCount, trackCount } = stats;

  const artistProgressData = [
    { value: stats.artistsWithDirectSupportPercentage, color: 'bg-accent', tooltip: `${stats.artistsWithDirectSupport} artists with direct support links` },
    { value: stats.artistsWithDefinitelyMonetizedPercentage, color: 'bg-chart-2', tooltip: `${stats.artistsWithDefinitelyMonetized} artists with monetized streaming links` },
    { value: stats.artistsWithPotentiallyMonetizedPercentage, color: 'bg-chart-3', tooltip: `${stats.artistsWithPotentiallyMonetized} artists with potentially monetized links` },
    { value: stats.artistsWithOtherPercentage, color: 'bg-chart-4', tooltip: `${stats.artistsWithOther} artists with other links` },
  ];

  const trackProgressData = [
    { value: stats.tracksWithDirectSupportPercentage, color: 'bg-accent', tooltip: `${stats.tracksWithDirectSupport} tracks with direct support links` },
    { value: stats.tracksWithDefinitelyMonetizedPercentage, color: 'bg-chart-2', tooltip: `${stats.tracksWithDefinitelyMonetized} tracks with monetized streaming links` },
    { value: stats.tracksWithPotentiallyMonetizedPercentage, color: 'bg-chart-3', tooltip: `${stats.tracksWithPotentiallyMonetized} tracks with potentially monetized links` },
    { value: stats.tracksWithOtherPercentage, color: 'bg-chart-4', tooltip: `${stats.tracksWithOther} tracks with other links` },
  ];

  return (
    <Sidebar>
      <SidebarRail />
      <SidebarHeader className="flex items-center justify-between p-2">
        <h2 className="pl-2 text-xl font-semibold text-sidebar-foreground/80 group-data-[collapsible=icon]:hidden">
          Stats
        </h2>
        <div className="hidden md:block">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem className="pointer-events-none">
            <div className="flex items-center justify-between w-full p-2 group-data-[collapsible=icon]:justify-center">
                <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-sidebar-foreground/70" />
                    <span className="text-sidebar-foreground/90 group-data-[collapsible=icon]:hidden">Total Artists</span>
                </div>
                <span className="font-mono font-semibold text-lg group-data-[collapsible=icon]:hidden">{artistCount}</span>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem className="pointer-events-none">
            <div className="flex items-center justify-between w-full p-2 group-data-[collapsible=icon]:justify-center">
                <div className="flex items-center gap-3">
                    <Music className="h-5 w-5 text-sidebar-foreground/70" />
                    <span className="text-sidebar-foreground/90 group-data-[collapsible=icon]:hidden">Total Tracks</span>
                </div>
                <span className="font-mono font-semibold text-lg group-data-[collapsible=icon]:hidden">{trackCount}</span>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem className="pointer-events-none">
            <div className="flex flex-col w-full p-2 space-y-2 group-data-[collapsible=icon]:items-center">
              <div className="flex items-center justify-between w-full group-data-[collapsible=icon]:justify-center">
                  <div className="flex items-center gap-3">
                      <Link className="h-5 w-5 text-sidebar-foreground/70" />
                      <span className="text-sidebar-foreground/90 text-sm group-data-[collapsible=icon]:hidden">Artists with Links</span>
                  </div>
              </div>
              <StackedProgress data={artistProgressData} className="h-2 group-data-[collapsible=icon]:hidden" />
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem className="pointer-events-none">
            <div className="flex flex-col w-full p-2 space-y-2 group-data-[collapsible=icon]:items-center">
              <div className="flex items-center justify-between w-full group-data-[collapsible=icon]:justify-center">
                  <div className="flex items-center gap-3">
                      <Link className="h-5 w-5 text-sidebar-foreground/70" />
                      <span className="text-sidebar-foreground/90 text-sm group-data-[collapsible=icon]:hidden">Tracks with Links</span>
                  </div>
              </div>
              <StackedProgress data={trackProgressData} className="h-2 group-data-[collapsible=icon]:hidden" />
            </div>
          </SidebarMenuItem>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </SidebarGroupLabel>
            <div className="flex flex-col gap-3 pt-2 group-data-[collapsible=icon]:hidden">
              <div className="flex flex-col gap-2">
                <Label className="px-2 text-xs text-sidebar-foreground/70">
                  Link Type
                </Label>
                {linkTypeFilters.map(filter => (
                  <div key={filter.id} className="flex items-center justify-between px-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={filter.id}
                        value={filter.id}
                        checked={selectedLinkTypes.includes(filter.id)}
                        onCheckedChange={() => onLinkTypeToggle(filter.id)}
                      />
                      <Label htmlFor={filter.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sidebar-foreground/90">
                        {filter.label}
                      </Label>
                    </div>
                    <div className={`h-2 w-2 rounded-full ${linkTypeColors[filter.id]}`} aria-hidden="true" />
                  </div>
                ))}
              </div>

              <SidebarSeparator />

              <div className="flex flex-col gap-2">
                <Label className="px-2 text-xs text-sidebar-foreground/70">
                  Dataset
                </Label>
                {allDatasetNames.map(name => (
                  <div key={name} className="flex items-center justify-between px-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={name} 
                        checked={selectedDatasets.includes(name)}
                        onCheckedChange={() => onDatasetToggle(name)}
                      />
                      <Label htmlFor={name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sidebar-foreground/90">
                        {name}
                      </Label>
                    </div>
                    <span className="font-mono text-xs text-sidebar-foreground/70">{stats.datasetCounts[name]?.artists ?? 0}A / {stats.datasetCounts[name]?.tracks ?? 0}T</span>
                  </div>
                ))}
              </div>
            </div>
          </SidebarGroup>
          <SidebarSeparator className="group-data-[collapsible=icon]:hidden"/>
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
              <HelpCircle className="h-4 w-4" />
              Legend
            </SidebarGroupLabel>
            <div className="flex flex-col gap-2 pt-2 text-xs text-sidebar-foreground/90 pl-2 group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                  <span>Direct Support (Purchase)</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-chart-2" aria-hidden="true" />
                  <span>Monetized (Spotify/Apple)</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-chart-3" aria-hidden="true" />
                  <span>Potentially Monetized</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-chart-4" aria-hidden="true" />
                  <span>Other</span>
              </div>
            </div>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 mt-auto border-t border-sidebar-border">
          <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
              <p className="text-xs text-sidebar-foreground/70 group-data-[collapsible=icon]:hidden">Theme</p>
              <ThemeToggle />
          </div>
      </SidebarFooter>
    </Sidebar>
  );
}
