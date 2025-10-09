import LantstoolLogo from '@site/static/assets/docs/lantstool/lantstool-logo-circle.svg';
import cn from './LantstoolLabel.module.scss';

export const LantstoolLabel = () => (
  <div className={cn.container}>
    <LantstoolLogo className={cn.logo} />
    Lantstool
  </div>
);
