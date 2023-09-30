import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Button
} from '@react-email/components';
import * as React from 'react';
import logoSite from "../../images/logoBlackPng.png";

interface verifyEmailProps {
  /**
   * Prénom du client
   */
  firstname: string;
}

export const verifyEmail = ({ firstname }: verifyEmailProps) => {
  console.log(firstname)
  return (
    <Html>
      <Head />
      <Preview>Confirmation de création de compte</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img width={150} src={logoSite.src} />
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Salut {firstname},</Text>
            <Text style={paragraph}>
              Merci de vous être inscrit, pour confirmer votre inscription, veuillez cliquer sur le lien ci-dessous
              afin de définir votre mot de passe.
            </Text>
            <Text style={paragraph}>
              Si vous n&apos;êtes pas à l&apos;origine de ce mail, veuillez contacter notre support.
            </Text>
            <Text style={paragraph}>
              N&apos;oubliez d&apos;utiliser un mot de passe complexe et unique.
            </Text>
            <Text style={paragraph}>
              Merci,
              <br />
              L&apos;équipe GoodFood !
            </Text>
            <Container style={{ display: "grid", placeItems: "center" }}>
              <Button style={{ cursor: "pointer", backgroundColor: "#E8B10D", textTransform: "uppercase", borderRadius: "25px" }} pX={10} pY={10} href='localhost:3000/verify'>
                Vérifier votre email
              </Button>
            </Container>
          </Section>
        </Container>

        <Section style={footer}>
          <Text style={{ textAlign: 'center', color: '#706a7b' }}>
            © 2023 GoodFood, Tout droits réservés <br />
            80 avenue Edmund Halley Rouen Madrillet Innovation, 76800 Saint-Étienne-du-Rouvray
          </Text>
        </Section>
      </Body>
    </Html>
  );
};

export default verifyEmail;

const fontFamily = 'HelveticaNeue,Helvetica,Arial,sans-serif';

const main = {
  backgroundColor: '#efeef1',
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  width: '580px',
  margin: '30px auto',
  backgroundColor: '#ffffff',
};

const footer = {
  width: '580px',
  margin: '0 auto',
};

const content = {
  padding: '5px 50px 10px 60px',
};

const logo = {
  display: 'flex',
  justifyContent: 'center',
  alingItems: 'center',
  padding: 30,
};

const sectionsBorders = {
  width: '100%',
  display: 'flex',
};

const sectionBorder = {
  borderBottom: '1px solid rgb(238,238,238)',
  width: '249px',
};

const sectionCenter = {
  borderBottom: '1px solid #E8B10D',
  width: '102px',
};

const link = {
  textDecoration: 'underline',
};