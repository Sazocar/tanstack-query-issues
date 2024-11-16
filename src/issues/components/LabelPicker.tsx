import { LoadingSpinner } from '../../shared';
import { useLabels } from '../hooks';

export const LabelPicker = () => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {labelsQuery?.data?.map(({ id, color, name }) => (
        <span
          key={id}
          className="animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer"
          style={{ border: `1px solid #${color}` }}
        >
          {name}
        </span>
      ))}
    </div>
  );
};
