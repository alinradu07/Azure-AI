import styles from "./ChooseTest.module.css";
export default function ChooseTest() {


  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Header</h1>
        </header>
        <section>
          <div><p>Content</p></div>
        </section>
        <section className={styles.bottom}>
          <button>Button</button>
        </section>
      </main>
    </>
  );
}
