import styles from './AppTodo.module.css';
import TodoBox from './components/TodoBox';
import { DarkModeProvider } from './context/DarkModeContext';

function AppTodo() {
  return (
    <DarkModeProvider>
      <div className={styles.background}>
        <TodoBox />
      </div>
    </DarkModeProvider>
  )
}

export default AppTodo;
