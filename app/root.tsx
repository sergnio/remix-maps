import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import adminStyles from "~/styles/admin.css";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
      <footer>
        <ul>
          <li>
            Back <Link to="/">home</Link>
          </li>
          <li>
            Secret <Link to="/admin">admin</Link> page
          </li>
          <li>
            <Link to="/map">Maps</Link> page
          </li>
        </ul>
      </footer>
    </body>
  </html>
);
