import styles from './btn.module.css';
import Gleap from 'gleap';

export default function AskAI(props) {
  if (props.mobile){
    return <li className='menu__list-item'>
      <button className={`menu__link ${styles.aiBtn}`} onClick={() => {Gleap.askAI()}}>Ask AI 📖</button>
    </li>
  }else{
    return <button className={`navbar__item navbar__link ${styles.aiBtn}`} onClick={() => {Gleap.askAI()}}>Ask AI 📖</button>
  }
}