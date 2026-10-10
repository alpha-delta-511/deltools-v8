import {
  Button,
  createTheme,
  Group,
  MantineProvider,
  Text,
  Title,
} from "@mantine/core";

import "./App.css";
import "@mantine/core/styles.css";

const theme = createTheme({
  fontFamily: "Consolas, monospace",
});

function App() {
  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Group justify="center">
          <Group justify="space-between">
            <Title>Hello, world!</Title>
          </Group>
        </Group>
      </MantineProvider>
    </>
  );
}

export default App;
