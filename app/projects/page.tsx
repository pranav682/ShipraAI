import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { ProjectsContent } from '@/components/projects/projects-content';

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <ProjectsContent />
    </DashboardLayout>
  );
}