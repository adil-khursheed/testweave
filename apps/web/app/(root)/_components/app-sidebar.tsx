import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@workspace/ui/components/sidebar";
import SidebarNavItems from "./sidebar-nav-items";
import SidebarNavHeader from "./sidebar-nav-header";
import SidebarNavFooter from "./sidebar-nav-footer";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarNavHeader />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarNavItems />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarNavFooter />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
