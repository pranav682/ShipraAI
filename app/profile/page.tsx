import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { SettingsContent } from '@/components/settings/settings-content';

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <SettingsContent />
    </DashboardLayout>
  );
}