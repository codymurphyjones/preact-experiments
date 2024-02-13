import { signal } from "@preact/signals";
import Page from "@Components/Page";

const count = signal(0);

export default function App() {
  return <Page />;
}
