import { LoadingSpinner } from '../../shared';
import { useLabels } from '../hooks';

interface Props {
  selectedLabels: string[];
  onLabelSelected: (label: string) => void;
}

export const LabelPicker = ({ selectedLabels, onLabelSelected }: Props) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {labelsQuery?.data?.map(({ id, color, name }) => (
        <span
          key={id}
          onClick={() => onLabelSelected(name)}
          className={`animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer ${
            selectedLabels.includes(name) ? 'selected-label' : ''
          }`}
          style={{ border: `1px solid #${color}` }}
        >
          {name}
        </span>
      ))}
    </div>
  );
};
