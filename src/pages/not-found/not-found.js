import styles from './not-found.module.css'

const NotFoundPage = () => {
  
  return (
    <p className={`text text_type_main-large ${styles.error_text}`}>Упс..кажется такой страницы не существует :(</p>
  )
}

export default NotFoundPage;