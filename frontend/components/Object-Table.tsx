import { useCRMStore } from '@/utils/useCRMstore';
import { useLoadingStore } from '@/utils/useLoadingStore';
import ClipLoader from "react-spinners/ClipLoader";

export default function CRMObjectTable() {
  const { records } = useCRMStore();
  const { loading } = useLoadingStore();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader size={40} color="#3b82f6" />
      </div>
    );
  }

  if (records.length === 0) {
    return <p className="">No data available</p>;
  }

  const keys = Object.keys(records[0].properties || {});

  return (
    <div className="overflow-y-auto max-h-screen border mt-4 rounded-md">
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-white z-10">
          <tr>
            {keys.slice(0, 6).map((key) => (
              <th key={key} className="border px-3 py-2">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              {keys.slice(0, 6).map((key) => (
                <td key={key} className="border px-3 py-1">{record.properties[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
