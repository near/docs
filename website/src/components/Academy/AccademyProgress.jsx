import useAcademyProgress from './store/useAcademyProgress';
import './LessonProgress.scss';
const AccademyProgress = () => {
  const {
    getTotalCompletedLessons,
    getOverallProgress,
    totalLessons,
    getAllSections
  } = useAcademyProgress();

  const completedLessons = getTotalCompletedLessons();
  const overallProgress = getOverallProgress();
  const allSections = getAllSections();

  return (
    <div className="lesson-progress academy-progress">
      <div className="progress-header">
        <h3 className="progress-title">ACADEMY PROGRESS</h3>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          <span className="lessons-completed">
            {completedLessons} of {totalLessons} lessons completed
          </span>
          <span className="progress-percentage">
            {overallProgress}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccademyProgress;
