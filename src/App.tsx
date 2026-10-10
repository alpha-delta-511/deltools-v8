import {
  ActionIcon,
  createTheme,
  Group,
  MantineProvider,
  Title,
} from "@mantine/core";

import "./App.css";
import "@mantine/core/styles.css";
import { GithubLogoIcon } from "@phosphor-icons/react";

const theme = createTheme({
  fontFamily: "Consolas, monospace",
});

function App() {
  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Group justify="center">
          <Group justify="space-between">
            <Title style={{ userSelect: "none" }}>deltools-v8</Title>
            <ActionIcon
              component="a"
              href="https://github.com/alpha-delta-511/deltools-v8"
              variant="outline"
            >
              <GithubLogoIcon></GithubLogoIcon>
            </ActionIcon>
          </Group>
        </Group>
      </MantineProvider>
    </>
  );
}

export default App;
