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
  Tree,
  useTree,
  type RenderTreeNodePayload,
} from "@mantine/core";

import "@mantine/core/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { lazy, Suspense } from "react";
import { Link, Route } from "react-router-dom";
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
  welcome: lazy(() => import("../1-pages/welcome")),

  test: lazy(() => import("../1-pages/test")),
};

function Leaf({ node, hasChildren, elementProps }: RenderTreeNodePayload) {
  return (
    <Group gap={6} {...elementProps}>
      {hasChildren ? (
        <Text>{node.label}</Text>
      ) : (
        <Link to={`/${node.value}`}>{node.label}</Link>
      )}
    </Group>
  );
}

const navbarData = [
  { value: "welcome", label: "Welcome page" },
  {
    label: "Programming",
    value: "programming",
    children: [
      {
        label: "Frontend",
        value: "frontend",
        children: [
          {
            label: "CSS gradient generator",
            value: "programming/frontend/css-gradient-generator",
          },
        ],
      },
    ],
  },
];

function App() {
  const [opened, { toggle }] = useDisclosure();

  const navbarTree = useTree({});

  return (
    <>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <BrowserRouter>
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
                <Tree
                  tree={navbarTree}
                  data={navbarData}

                  renderNode={(payload) => <Leaf {...payload} />}
                ></Tree>
              </Stack>
            </AppShell.Navbar>

            <AppShell.Main>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {Object.entries(pages).map(([path, Component]) => (
                    <Route
                      key={path}
                      path={`/${path}`}
                      element={<Component />}
                    />
                  ))}

                  <Route path="/" element={<pages.welcome />}></Route>
                </Routes>
              </Suspense>
            </AppShell.Main>
          </AppShell>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
