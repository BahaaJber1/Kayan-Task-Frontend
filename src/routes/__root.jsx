import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import Providers from "@ui/Providers.jsx";
import { useDispatch } from "react-redux";

export const Route = createRootRoute({
  component: () => <RootComponent />,
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
        <Outlet />
        <Scripts />
      </Providers>
    </>
  );
};

