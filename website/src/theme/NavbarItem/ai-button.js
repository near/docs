import styles from './btn.module.css';
import Gleap from 'gleap';

export default function AskAI(props) {
  const label = 'Ask AI 📖';
  const action = () => { Gleap.askAI() };

  if (props.mobile){
    return <li className='menu__list-item'>
      <button className={`menu__link ${styles.aiBtn}`} onClick={action}>{label}</button>
    </li>
  }else{
    return <button className={`navbar__item navbar__link ${styles.aiBtn}`} onClick={action}>{label}</button>
  }
}