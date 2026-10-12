import {
  ActionIcon,
  AppShell,
  Burger,
  createTheme,
  Group,
  Loader,
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

    Text: {
      defaultProps: {
        component: "span",
      },
    },
  },
});

interface Page {
  component: React.ComponentType;
}

const pages: Record<string, Page> = {
  welcome: {
    component: lazy(() => import("../1-pages/welcome")),
  },

  test: { component: lazy(() => import("../1-pages/test")) },

  "crypto/hasher": {
    component: lazy(() => import("../1-pages/crypto/hasher")),
  },
};

const navbarData = [
  { value: "welcome", label: "Welcome page" },

  {
    label: "crypto",
    value: "crypto",
    children: [{ label: "Hasher", value: "crypto/hasher" }],
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
          <Link
            className="nav_link"
            onClick={closeNavbar}
            to={`/${node.value}`}
          >
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
              <Stack justify="center" style={{ overflowY: "auto" }}>
                <Suspense fallback={<Loader type="bars" />}>
                  <Routes>
                    {Object.entries(pages).map(([path, page]) => (
                      <Route
                        key={path}
                        path={`/${path}`}
                        element={<page.component />}
                      />
                    ))}

                    <Route
                      path="/"
                      element={<pages.welcome.component />}
                    ></Route>
                  </Routes>
                </Suspense>
              </Stack>
            </AppShell.Main>
          </AppShell>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
