import {
  ActionIcon,
  createTheme,
  Group,
  MantineProvider,
  Stack,
  Title,
} from "@mantine/core";

import "@mantine/core/styles.css";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  fontFamily: "Consolas, monospace",
});

const pages: Record<string, React.ComponentType> = {
  test: lazy(() => import("../1-pages/test")),
};

function App() {
  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <Stack>
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

          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {Object.entries(pages).map(([path, Component]) => (
                  <Route key={path} path={`/${path}`} element={<Component />} />
                ))}
              </Routes>
            </Suspense>
          </BrowserRouter>
        </Stack>
      </MantineProvider>
    </>
  );
}

export default App;
