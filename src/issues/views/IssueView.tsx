import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { FiSkipBack } from 'react-icons/fi';
import { useIssue } from '../hooks';
import { LoadingSpinner } from '../../shared';

export const IssueView = () => {
  const navigate = useNavigate();
  const params = useParams();
  const issueNumber = Number(params?.issueNumber ?? 0);

  const { issueQuery, commentsQuery } = useIssue(issueNumber);

  const { data: issueData, isLoading: isLoadingIssue } = issueQuery ?? {};
  const { data: commentsData, isLoading: isLoadingComments } =
    commentsQuery ?? {};

  if (isLoadingIssue) return <div>Cargando issue</div>;

  if (!issueData) return <Navigate to="/404" />;

  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:underline text-blue-400 flex items-center"
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      {/* Primer comentario */}
      <IssueComment issue={issueData} />

      {/* Comentario de otros */}
      {isLoadingComments ? (
        <LoadingSpinner />
      ) : (
        commentsData?.map((comment) => (
          <IssueComment key={comment.id} issue={comment} />
        ))
      )}
    </div>
  );
};
