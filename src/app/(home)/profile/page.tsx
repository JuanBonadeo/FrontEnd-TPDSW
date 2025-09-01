import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileTabs } from "../../../components/Profile/ProfileTabs";
import { ProfileClient } from "./ProfileClient";
import { ProfileStatsClient } from "./ProfileStatsClient";

export default function ProfilePage() {
  return (
    <div className="container px-4 py-4 mx-auto space-y-6">
      <ProfileClient />
      <ProfileStatsClient />
    </div>
  );
}
