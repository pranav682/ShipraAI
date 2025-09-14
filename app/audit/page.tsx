import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AuditLogsContent } from '@/components/audit/audit-logs-content';

export default function AuditPage() {
  return (
    <DashboardLayout>
      <AuditLogsContent />
    </DashboardLayout>
  );
}