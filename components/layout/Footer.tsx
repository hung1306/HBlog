import { Container, Text } from "@mantine/core";

export default function Footer() {
  return (
    <footer
      style={{
        padding: "20px 0",
        borderTop: "1px solid #eee",
        marginTop: "20px",
      }}
    >
      <Container>
        <Text style={{ textAlign: "center" }} size="sm">
          © {new Date().getFullYear()} Hùng Blog. All rights reserved.
        </Text>
      </Container>
    </footer>
  );
}
