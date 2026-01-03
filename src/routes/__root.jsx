import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import Layout from "@ui/Layout.jsx";
import Providers from "@ui/Providers.jsx";

export const Route = createRootRoute({
  component: () => <RootComponent />,
  // defaultErrorComponent: () => <div>There was an error!</div>,
  // defaultNotFoundComponent: () => <div>404: Page Not Found</div>,
  head: () => ({
    meta: [
      {
        title: "Kayan Healthcare",
        description:
          "Kayan Healthcare, a place for all your healthcare needs don't hesitate to contact us",
      },
    ],
    links: {
      rel: "icon",
      type: "image/png",
      href: "/kayan.png",
    },
  }),
});

const RootComponent = () => {
  return (
    <>
      <Providers>
        <HeadContent />
        <Layout />
        <Scripts />
      </Providers>
    </>
  );
};
