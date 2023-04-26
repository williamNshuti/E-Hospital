import { Container } from '@mantine/core';

export function MainContent({ children }) {
  return (
    <div className="w-full min-h-screen pt-10 bg-blue-5yar0">
      <Container>{children}</Container>
    </div>
  );
}
export default MainContent;
