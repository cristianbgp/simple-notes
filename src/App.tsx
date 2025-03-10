import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { Textarea } from "./components/ui/textarea";
import { ScrollArea } from "./components/ui/scroll-area";
import { useLocalStorage } from "./hooks/use-local-storage";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/grayscale.css";

function App() {
  const [note, setNote] = useLocalStorage("simple-notes-values", "");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const md = new MarkdownIt("commonmark", {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(lang, str, true).value +
            "</code></pre>"
          );
        } catch (error) {
          console.error(error);
        }
      }

      return (
        '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
      );
    },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  md.renderer.rules.heading_open = function (tokens, idx: string) {
    const token = tokens[idx];
    const level = token.tag as string;
    const classes = {
      h1: "text-3xl font-bold mt-6 mb-4",
      h2: "text-2xl font-bold mt-5 mb-3",
      h3: "text-xl font-bold mt-4 mb-2",
      h4: "text-lg font-semibold mt-3 mb-2",
      h5: "text-base font-semibold mt-2 mb-1",
      h6: "text-sm font-semibold mt-2 mb-1",
    };

    return `<${level} class="${classes[level as keyof typeof classes]}">`;
  };

  return (
    <div className="grid grid-rows-[min-content_1fr] h-screen">
      <header className="border-b py-2 border-[#eaeaea] flex justify-center items-center z-10">
        <h1 className="text-2xl font-semibold">Simple notes</h1>
      </header>
      <ResizablePanelGroup
        autoSaveId="simple-notes-resize"
        className="w-full"
        direction="horizontal"
      >
        <ResizablePanel defaultSize={50} minSize={20} className="h-full">
          <ScrollArea className="w-full h-full rounded-none [&>div>div]:h-full">
            <Textarea
              className="border-none shadow-none rounded-none h-full resize-none focus-visible:shadow-none focus-visible:ring-0 outline-0 border-transparent outline-offset-[-1em] focus:border-transparent focus:ring-0"
              placeholder="Your notes"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={20} className="h-full">
          <ScrollArea className="w-full h-full rounded-none [&>div>div]:h-full px-3 py-2">
            <div
              className="[&_code]:bg-[rgba(0,0,0, 0.05)] [&_pre]:overflow-x-auto [&_pre>code]:font-mono [&_pre>code]:bg-[initial]"
              dangerouslySetInnerHTML={{ __html: md.render(note) }}
            />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
