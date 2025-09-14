import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { TeamManagementContent } from '@/components/team/team-management-content';

export default function TeamPage() {
  return (
    <DashboardLayout>
      <TeamManagementContent />
    </DashboardLayout>
  );
}