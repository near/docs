import { useAcademyProgress } from './AcademyProgressContext';
import './Progress.scss';

const Progress = ({ course, total }) => {
  if (!course) {
    return <div>Error: No course provided.</div>;
  }

  const { completedLessons } = useAcademyProgress(course);
  const percentage = Math.round((completedLessons / total) * 100);
  return (
    <div className="lesson-progress academy-progress">
      <div className="progress-header">
        <h3 className="progress-title">
          {course ? `Lesson's Progress` : 'General Progress'}
          <span className="lessons-completed badge">
            {completedLessons} / {total}
          </span>
        </h3>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          <span className="progress-percentage badge">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Progress;
