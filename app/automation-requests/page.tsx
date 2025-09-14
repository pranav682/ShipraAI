import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AutomationRequestsContent } from '@/components/automation-requests/automation-requests-content';

export default function AutomationRequestsPage() {
  return (
    <DashboardLayout>
      <AutomationRequestsContent />
    </DashboardLayout>
  );
}