<<<<<<< HEAD
import LantstoolLogo from '@site/static/assets/docs/tools/lantstool-logo-circle.svg';
=======
import LantstoolLogo from '@site/static/assets/docs/lantstool/lantstool-logo-circle.svg';
>>>>>>> c796b38eda128bb7d175d40f5431647fb1e80d78
import cn from './LantstoolLabel.module.scss';

export const LantstoolLabel = () => (
  <div className={cn.container}>
    <LantstoolLogo className={cn.logo} />
    Lantstool
  </div>
);
