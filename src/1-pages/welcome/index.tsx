import { Text, Title } from "@mantine/core";
import PageTitle from "../../5-shared/lib/page-title";

export default function Welcome() {
  return (
    <>
      <PageTitle>Welcome</PageTitle>

      <Title>Welcome to deltools!</Title>
      <Text>
        Deltools is a simple web toolkit for developers, system administrators
        and other.
      </Text>
    </>
  );
}
