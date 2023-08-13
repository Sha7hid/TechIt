"use client"
import { spartan } from "../fonts";
import styles from "./styles/home.module.css";
import { Row ,Col} from "react-bootstrap";
import Image from "next/image";
import title from '../../public/title.jpg'
export  default async function Home() {
  return (
    <>
     
      <main className={styles.container}>
        <Row>
          <Col lg={6}>
          <div className={spartan.className}>
        <h1 className={styles.title}>Buy a laptop of your choice</h1>
        <p className={styles.para}>You want it we have it</p>
        </div>
          </Col>
          <Col lg={6} className={styles.image}>
            <Image src={title} height={600} width={450}/>
          </Col>
        </Row>

      </main>
    </>
  );
}
