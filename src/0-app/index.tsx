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

interface Page {
  title: string;
  component: React.ComponentType;
}

const pages: Record<string, Page> = {
  welcome: {
    title: "Welcome page",
    component: lazy(() => import("../1-pages/welcome")),
  },

  test: { title: "Test", component: lazy(() => import("../1-pages/test")) },
};

const navbarData = [
  { value: "welcome", label: "Welcome page" },
  {
    label: "programming",
    value: "programming",
    children: [
      {
        label: "frontend",
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
  const [navbarOpened, { toggle: toggleNavbar, close: closeNavbar }] =
    useDisclosure();

  const navbarTree = useTree({});

  const Leaf = ({ node, hasChildren, elementProps }: RenderTreeNodePayload) => {
    return (
      <Text {...elementProps}>
        {hasChildren ? (
          <Text>{node.label + "/"}</Text>
        ) : (
          <Link onClick={closeNavbar} to={`/${node.value}`}>
            {node.label}
          </Link>
        )}
      </Text>
    );
  };

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
              collapsed: { mobile: !navbarOpened },
            }}
          >
            <AppShell.Header>
              <Group justify="space-between">
                <Burger
                  opened={navbarOpened}
                  onClick={toggleNavbar}
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
                  {Object.entries(pages).map(([path, page]) => (
                    <Route
                      key={path}
                      path={`/${path}`}
                      element={<page.component />}
                    />
                  ))}

                  <Route path="/" element={<pages.welcome.component />}></Route>
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
