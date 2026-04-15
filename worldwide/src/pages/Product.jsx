import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            He/she considers and speaks about things carefully, bringing light
            to truth and responsibility. But there can also be mistakes,
            confusion, and difficulties in understanding, leading to challenges
            in work and life.
          </p>
          <p>
            The body is free and flexible. It is driven by reason and
            understanding, and it follows discipline, responsibility, and
            guidance in actions and duties.
          </p>
        </div>
      </section>
    </main>
  );
}
