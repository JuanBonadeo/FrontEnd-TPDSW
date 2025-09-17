import { AdminTabs } from "@/components/admin/AdminTabs";
import { Title } from "@/components/ui/title/Title";
import { AdminUserClient } from "./users/AdminUserClient";

export default function  AdminLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
     <div className="container mx-auto px-4 py-8 gap-3">
          <Title title={"Admin Page"} size="3xl"/>
          
          <AdminTabs />
            {children}
        </div>
  );
}