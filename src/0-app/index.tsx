import {
  ActionIcon,
  AppShell,
  Burger,
  createTheme,
  Group,
  MantineProvider,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  fontFamily: "Consolas, monospace",

  components: {
    ActionIcon: {
      defaultProps: {
        size: "lg",
      },
    },

    Group: {
      defaultProps: {
        p: "sm",
      },
    },

    Stack: {
      defaultProps: {
        p: "sm",
      },
    },
  },
});

const pages: Record<string, React.ComponentType> = {
  test: lazy(() => import("../1-pages/test")),
};

function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <AppShell
          padding="md"
          header={{ height: 60 }}
          navbar={{
            width: "30vw",
            breakpoint: "sm",
            collapsed: { mobile: !opened },
          }}
        >
          <AppShell.Header>
            <Group justify="space-between">
              <Burger
                opened={opened}
                onClick={toggle}
                hiddenFrom="sm"
                size="sm"
              />
              <Title style={{ userSelect: "none" }}>deltools-v8</Title>
              <ActionIcon
                component="a"
                href="https://github.com/alpha-delta-511/deltools-v8"
                variant="gradient"
              >
                <GithubLogoIcon></GithubLogoIcon>
              </ActionIcon>
            </Group>
          </AppShell.Header>

          <AppShell.Navbar>
            <Stack>
              <Text>*navbar*</Text>
            </Stack>
          </AppShell.Navbar>

          <AppShell.Main>
            <BrowserRouter>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {Object.entries(pages).map(([path, Component]) => (
                    <Route
                      key={path}
                      path={`/${path}`}
                      element={<Component />}
                    />
                  ))}
                </Routes>
              </Suspense>
            </BrowserRouter>
          </AppShell.Main>
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default App;
