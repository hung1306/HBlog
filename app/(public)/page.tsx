import {
  Container,
  Title,
  Text,
  Group,
  Anchor,
  Divider,
  Image,
  SimpleGrid,
  Card,
} from "@mantine/core";
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBuilding,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <Container size="lg" py="xl" className={styles.totalHomepage}>
      {/* Phần giới thiệu */}
      <Group className={styles.intro}>
        <Title order={1} className={styles.introTitle}>
          Hello👋, I am Nguyen Phuoc Dac Hung
        </Title>
        <Text size="lg" mt="md" className={styles.introText}>
          A Fresher Software Engineer
        </Text>
        <Group mt="md" className={styles.socials}>
          <Anchor
            href="https://www.linkedin.com/in/hung-nguyen-phuoc-dac/"
            target="_blank"
          >
            <IconBrandLinkedin size={28} />
          </Anchor>
          <Anchor href="https://github.com/hung1306" target="_blank">
            <IconBrandGithub size={28} />
          </Anchor>
          <Anchor
            href="https://www.facebook.com/HungfromDakLak"
            target="_blank"
          >
            <IconBrandFacebook size={28} />
          </Anchor>
          <Anchor
            href="https://www.instagram.com/_nguyenphuochung/"
            target="_blank"
          >
            <IconBrandInstagram size={28} />
          </Anchor>
        </Group>
      </Group>

      <Container my="xl">
        <Divider
          my="lg"
          label="ABOUT ME"
          labelPosition="center"
          size="md"
          className={styles.titleBox}
        />

        <SimpleGrid
          cols={{ base: 1, md: 3 }}
          spacing="xl"
          className={styles.gridLayout}
        >
          {/* Cột 1: Avatar */}
          <Card className={styles.avatarBox}>
            <Image
              src="/avatar1.jpg"
              alt="My Avatar"
              radius="xl"
              fit="cover"
              className={styles.avatarImg}
            />
          </Card>

          {/* Cột 2: Summary */}
          <Card className={styles.summaryBox}>
            <Text size="sm" className={styles.summaryText}>
              As a recent graduate in Computer Science with a solid foundation
              in web and system development, I am eager to secure an opportunity
              as a Software Developer. With a strong drive to learn and quick
              adaptability, I aspire to apply my knowledge in building and
              maintaining software, while also enhancing my expertise under
              seasoned guidance and contributing to collective achievements.
            </Text>
          </Card>

          {/* Cột 3: Contact */}
          <Card className={styles.contactBox}>
            <Title order={4} className={styles.contactTitle}>
              Get in touch
            </Title>
            <Group className={styles.contactItem}>
              <IconMapPin size={18} />
              <Text>Buon Ma Thuot, Dak Lak</Text>
            </Group>
            <Group className={styles.contactItem}>
              <IconBuilding size={18} />
              <Text>Ho Chi Minh City</Text>
            </Group>
            <Group className={styles.contactItem}>
              <IconMail size={18} />
              <Anchor
                href="mailto:hungnguyenphuocdac@gmail.com"
                target="_blank"
              >
                hungnguyenphuocdac@gmail.com
              </Anchor>
            </Group>
            <Group className={styles.contactItem}>
              <IconPhone size={18} />
              <Text>0367972391</Text>
            </Group>
            <Group className={styles.contactItem}>
              <IconBrandLinkedin size={18} />
              <Anchor
                href="https://www.linkedin.com/in/hung-nguyen-phuoc-dac/"
                target="_blank"
              >
                linkedin.com/in/hungng
              </Anchor>
            </Group>
            <Group className={styles.contactItem}>
              <IconBrandGithub size={18} />
              <Anchor href="https://github.com/hung1306" target="_blank">
                github.com/hung1306
              </Anchor>
            </Group>
          </Card>
        </SimpleGrid>
      </Container>

      <Container my="xl">
        <Divider
          my="lg"
          label="TECHNICAL SKILLS"
          labelPosition="center"
          size="md"
          className={styles.titleBox}
        />
        <SimpleGrid
          cols={{ base: 1, md: 3 }}
          spacing="xl"
          className={styles.gridLayout}
        >
          {/* Cột 1 */}
          <Card className={styles.skillsColumn}>
            <div className={styles.skillGroup}>
              <h3 className={styles.skillTitle}>Programming Languages</h3>
              <ul className={styles.softSkillList}>
                <li>HTML, CSS</li>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>C#</li>
                <li>Python</li>
              </ul>
            </div>

            <div className={styles.skillGroup}>
              <h3 className={styles.skillTitle}>Frameworks</h3>
              <ul className={styles.softSkillList}>
                <li>ReactJS</li>
                <li>NextJS</li>
                <li>NodeJS</li>
                <li>ASP.NET</li>
              </ul>
            </div>
          </Card>

          {/* Cột 2 */}
          <Card className={styles.skillsColumn}>
            <div className={styles.skillGroup}>
              <h3 className={styles.skillTitle}>Database</h3>
              <ul className={styles.softSkillList}>
                <li>Design Database</li>
                <li>PostgreSQL</li>
                <li>MySQL</li>
                <li>SQL Server</li>
                <li>Entity Framework</li>
              </ul>
            </div>

            <div className={styles.skillGroup}>
              <h3 className={styles.skillTitle}>Others</h3>
              <ul className={styles.softSkillList}>
                <li>Git</li>
                <li>Figma</li>
                <li>Agile/Scum</li>
                <li>Object-Oriented Programming (OOP)</li>
                <li>RESTful API</li>
              </ul>
            </div>
          </Card>

          {/* Cột 3 */}
          <Card className={styles.skillsColumn}>
            <div className={styles.skillGroup}>
              <h3 className={styles.skillTitle}>Foreign Language</h3>
              <ul className={styles.softSkillList}>
                <li>TOEIC 625</li>
                <li>Good understanding of English documents</li>
                <li>Basic communication skills</li>
              </ul>
            </div>

            <div className={styles.skillGroup}>
              <h3 className={styles.skillTitle}>Soft Skills</h3>
              <ul className={styles.softSkillList}>
                <li>Share ideas clearly and listen actively</li>
                <li>Collaborate effectively with team members</li>
                <li>Plan and manage time to meet deadlines</li>
                <li>Ready to learn new things and handle changes</li>
              </ul>
            </div>
          </Card>
        </SimpleGrid>
      </Container>

      <Container my="xl">
        <Divider
          my="lg"
          label="PROJECTS"
          labelPosition="center"
          size="md"
          className={styles.titleBox}
        />
      </Container>

      <Container my="xl">
        <Divider
          my="lg"
          label="EDUCATION"
          labelPosition="center"
          size="md"
          className={styles.titleBox}
        />
      </Container>

      <Container my="xl">
        <Divider
          my="lg"
          label="EXPERIENCES"
          labelPosition="center"
          size="md"
          className={styles.titleBox}
        />
      </Container>
    </Container>
  );
}
