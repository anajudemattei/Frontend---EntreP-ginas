'use client';

import Layout from '../../components/Layout';
import { Card } from '../../components/ui';
import Image from 'next/image';
import styles from './sobre.module.css';

export default function SobreMimPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>
              Sobre Mim
            </h1>
            <p className={styles.subtitle}>
              Conheça um pouco mais sobre quem está por trás deste diário
            </p>
          </div>
        </div>

        <div className={styles.content}>
          <Card className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  <Image 
                    src="/anajulia.jfif" 
                    alt="Ana Julia Pinheiro Demattei"
                    width={120}
                    height={120}
                    className={styles.avatarImage}
                  />
                </div>
              </div>
              <div className={styles.profileInfo}>
                <h2 className={styles.name}>Ana Julia Pinheiro Demattei</h2>
                <p className={styles.role}>Estudante de Desenvolvimento de Sistemas</p>
              </div>
            </div>

            <div className={styles.bio}>
              <p>
                Olá! Eu sou Ana Julia, tenho 17 anos e estou cursando Desenvolvimento de Sistemas no Senai Valinhos. 
                Criar este projeto de um diário digital foi uma ideia de ajudar as pessoas a colocarem sucessos seus pensamentos 
                no papel de uma maneira prática e acessível e que de alguma forma se necessário pode ser monitorado.
              </p>
              <p>
                Eu acredito que escrever é uma forma de autoconhecimento e reflexão. Por isso, 
                quis desenvolver uma plataforma onde eu pudesse registrar meus pensamentos, 
                experiências e memórias de uma maneira organizada e bonita.
              </p>
            </div>
          </Card>

          <Card className={styles.projectCard}>
            <h3 className={styles.sectionTitle}>
              Sobre Este Projeto
            </h3>
            <div className={styles.projectContent}>
              <p>
                O <strong>Entre Páginas</strong> nasceu como meu projeto final do curso de 
                Desenvolvimento Full Stack. A ideia era criar algo que fosse útil não só para mim, mas 
                para os outros também.
              </p>
              <p>
                Escolhi fazer um diário digital porque sempre acreditei que 
                seria legal ter um lugar só meu pra guardar memórias. Além disso, 
                queria que fosse algo visualmente bonito, confortável e acolhedor para todos.
              </p>
              <p>
                O projeto foi desenvolvido com Next.js no front-end e Node.js no back-end.
                Foi desafiador, mas aprendi muito durante o processo.
              </p>
            </div>
          </Card>

          <div className={styles.grid}>
            <Card className={styles.skillsCard}>
              <h3 className={styles.sectionTitle}>
                Habilidades
              </h3>
              <div className={styles.skillsList}>
                <div className={styles.skillItem}>
                  <span className={styles.skillIcon}>Front-end</span>
                  <div>
                    <h4>Front-end</h4>
                    <p>React, Next.js, HTML, CSS, JavaScript</p>
                  </div>
                </div>
                <div className={styles.skillItem}>
                  <span className={styles.skillIcon}>Back-end</span>
                  <div>
                    <h4>Back-end</h4>
                    <p>Node.js, Express, APIs REST</p>
                  </div>
                </div>
                <div className={styles.skillItem}>
                  <span className={styles.skillIcon}>Banco de Dados</span>
                  <div>
                    <h4>Banco de Dados</h4>
                    <p>Postgresql</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className={styles.interestsCard}>
              <h3 className={styles.sectionTitle}>
                Interesses
              </h3>
              <div className={styles.interestsList}>
                <div className={styles.interestTag}>Aéreos</div>
                <div className={styles.interestTag}>Leitura</div>
                <div className={styles.interestTag}>Dança</div>
                <div className={styles.interestTag}>Teatro</div>
                <div className={styles.interestTag}>Música</div>
                <div className={styles.interestTag}>Flores</div>
              </div>
              
              <div className={styles.photoGallery}>
                <div className={styles.photoItem}>
                  <Image 
                    src="/livro.jfif" 
                    alt="Interesse 1"
                    width={300}
                    height={300}
                    className={styles.photo}
                  />
                </div>
                <div className={styles.photoItem}>
                  <Image 
                    src="/dança.jfif" 
                    alt="Interesse 2"
                    width={300}
                    height={300}
                    className={styles.photo}
                  />
                </div>
                <div className={styles.photoItem}>
                  <Image 
                    src="/flor.jfif" 
                    alt="Interesse 3"
                    width={300}
                    height={300}
                    className={styles.photo}
                  />
                </div>
                <div className={styles.photoItem}>
                  <Image 
                    src="/teatro.jfif" 
                    alt="Interesse 4"
                    width={300}
                    height={300}
                    className={styles.photo}
                  />
                </div>
              </div>

              <div className={styles.photoGallery}>
                <div className={styles.photoItem}>
                  <Image 
                    src="/trapezio.jfif" 
                    alt="Interesse 5"
                    width={300}
                    height={300}
                    className={styles.photo}
                  />
                </div>
                <div className={styles.photoItem}>
                  <Image 
                    src="/eu.jfif" 
                    alt="Interesse 6"
                    width={300}
                    height={300}
                    className={styles.photo}
                  />
                </div>
                <div className={styles.photoItem}>
                  <Image 
                    src="/aereo.jfif" 
                    alt="Interesse 7"
                    width={300}
                    height={300}
                    className={styles.photo}
                  />
                </div>
                <div className={styles.photoItem}>
                  <Image 
                    src="/roteiro.jfif" 
                    alt="Interesse 8"
                    width={300}
                    height={300}
                    className={styles.photo}
                  />
                </div>
              </div>
            </Card>
          </div>

          <Card className={styles.goalsCard}>
            <h3 className={styles.sectionTitle}>
              Meus Objetivos
            </h3>
            <div className={styles.goalsList}>
              <div className={styles.goalItem}>
                <span className={styles.goalNumber}>1</span>
                <div>
                  <h4>Finalizar meu curso com sucesso</h4>
                </div>
              </div>
              <div className={styles.goalItem}>
                <span className={styles.goalNumber}>2</span>
                <div>
                  <h4>Seguir uma carreira na área que eu gosto</h4>
                </div>
              </div>
            </div>
          </Card>

          <Card className={styles.contactCard}>
            <h3 className={styles.sectionTitle}>
              Entre em Contato
            </h3>
            <p className={styles.contactText}>
              Gostou do projeto ou quer me ajudar a melhorar? 
              Fico feliz em conversar!
            </p>
            <div className={styles.contactLinks}>
              <a href="mailto:ana.demattei@aluno.senai.br" className={styles.contactLink}>
                <span>Email</span>
                ana.demattei@aluno.senai.br
              </a>
              <a href="https://github.com/anajudemattei" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <span>GitHub</span>
                GitHub
              </a>
              <a href="https://linkedin.com/in/anajudemattei" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <span>LinkedIn</span>
                LinkedIn
              </a>
            </div>
          </Card>

          <div className={styles.quote}>
            <blockquote>
              <p>"A escrita é a pintura da voz."</p>
              <cite>- Voltaire</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </Layout>
  );
}
