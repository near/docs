
import './Progress.scss';
import useLessonStore from './stores/lessonStore';

const Progress = ({ course, total }) => {
  // course="basics"
  const { getCompletedLessons, getAllSavedContracts} = useLessonStore();

  const allCompletedLessons = getCompletedLessons();
  
  // const courseCompletedLessons = course 
  //   ? allCompletedLessons.filter(lessonId => lessonId.startsWith(`${course}-`))
  //   : allCompletedLessons;

  const completedCount = allCompletedLessons.length + getAllSavedContracts().size;
  const totalLessons = total || 0;
  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  return (
    <div className="lesson-progress academy-progress">
      <div className="progress-header">
        <h3 className="progress-title">
          {course ? `${course.toUpperCase()} PROGRESS` : 'ACADEMY PROGRESS'}
        </h3>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-stats">
          <span className="lessons-completed">
            {completedCount} of {totalLessons} lessons completed
          </span>
          <span className="progress-percentage">
            {progressPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Progress;
