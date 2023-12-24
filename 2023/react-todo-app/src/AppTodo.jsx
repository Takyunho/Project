import styles from './AppTodo.module.css';
import TodoBox from './components/TodoBox';

function AppTodo() {
  return (
    <div className={styles.background}>
      <TodoBox />
    </div>
  )
}

export default AppTodo;
