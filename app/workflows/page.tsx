import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { WorkflowsContent } from '@/components/workflows/workflows-content';

export default function WorkflowsPage() {
  return (
    <DashboardLayout>
      <WorkflowsContent />
    </DashboardLayout>
  );
}