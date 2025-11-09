import DataProvider from '@/components/providers/DataProvider';
import DashboardClient from '@/components/DashboardClient';
import { generateInitialDataset } from '@/lib/dataGenerator';

export default async function DashboardPage() {
  const initialData = await generateInitialDataset(10000);
  return (
    <DataProvider initialData={initialData}>
      <DashboardClient />
    </DataProvider>
  );
}
