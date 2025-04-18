import CRMObjectSelector from "@/components/Object-Selector";
import CRMObjectTable from "@/components/Object-Table";

export default function CRMData() {
  return (
    <div className="flex min-h-screen w-full">
      <CRMObjectSelector />
      <div className="flex-1 p-4">
        <CRMObjectTable />
      </div>
    </div>
  );
}