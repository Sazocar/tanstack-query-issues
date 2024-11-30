import React from 'react';
import { LoadingSpinner } from '../../shared';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssuesInfinite } from '../hooks';
import { State } from '../interfaces';

export const ListViewInfinite = () => {
  const [state, setState] = React.useState(State.All);
  const [selectedLabels, setSelectedLabels] = React.useState<string[]>([]);

  const { issuesQuery } = useIssuesInfinite({
    state,
    selectedLabels,
  });

  const issues = issuesQuery.data ?? [];

  const onLabelSelected = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(
        selectedLabels.filter((selectedLabels) => selectedLabels !== label)
      );
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col justify-center">
            <IssueList issues={issues} onStateChange={setState} state={state} />

            <button className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all">
              Cargar más...
            </button>
          </div>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          selectedLabels={selectedLabels}
          onLabelSelected={onLabelSelected}
        />
      </div>
    </div>
  );
};
