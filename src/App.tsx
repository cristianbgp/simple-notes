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
import { useTheme } from "./components/theme-provider";
import { useEffect } from "react";

function App() {
  const [note, setNote] = useLocalStorage("simple-notes-values", "");
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      import("./styles/grayscale-dark.css");
    } else {
      import("./styles/grayscale-light.css");
    }
  }, [theme]);

  const md: MarkdownIt = new MarkdownIt("commonmark", {
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            `<pre class="p-2 hljs"><code>` +
            hljs.highlight(lang, str, true).value +
            "</code></pre>"
          );
        } catch (error) {
          console.error(error);
        }
      }

      return (
        '<pre class="hljs p-2"><code>' +
        md.utils.escapeHtml(str) +
        "</code></pre>"
      );
    },
  });

  // Style for inline code
  md.renderer.rules.code_inline = (tokens, idx: number) => {
    const content = tokens[idx].content;
    return `<code class="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-1.5 py-0.5 rounded text-sm font-mono">${md.utils.escapeHtml(
      content
    )}</code>`;
  };

  // Style for images
  md.renderer.rules.image = (tokens, idx) => {
    const token = tokens[idx];
    const alt = token.content;
    const src = token.attrs?.[0]?.[1] || "";
    const title = token.attrs?.[1]?.[1] || "";
    return `<img src="${src}" alt="${alt}" title="${title}" class="max-w-full h-auto rounded-lg my-4" loading="lazy">`;
  };

  // Style for strikethrough
  md.renderer.rules.s_open = () => {
    return '<del class="line-through text-gray-500">';
  };

  // Style for blockquotes
  md.renderer.rules.blockquote_open = () => {
    return '<blockquote class="pl-4 border-l-4 border-gray-200 text-gray-700 dark:text-gray-300 my-4 text-base">';
  };

  // Style for links
  md.renderer.rules.link_open = (tokens, idx: number) => {
    const token = tokens[idx];
    const href = token?.attrs?.[0]?.[1];
    return `<a href="${href}" target="${
      href?.startsWith("http") ? "_blank" : "_self"
    }" rel="${
      href?.startsWith("http") ? "noopener noreferrer" : ""
    }" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:underline transition-colors duration-200">`;
  };

  // Style for lists
  md.renderer.rules.bullet_list_open = () => {
    return '<ul class="list-disc pl-6 my-4 space-y-2">';
  };

  md.renderer.rules.ordered_list_open = () => {
    return '<ol class="list-decimal pl-6 my-4 space-y-2">';
  };

  // Style for task lists
  md.renderer.rules.checkbox = (tokens, idx) => {
    const token = tokens[idx];
    const isChecked = token.attrGet("checked") === "true";
    return `<input type="checkbox" ${
      isChecked ? "checked" : ""
    } disabled class="mr-2 rounded border-gray-300 text-gray-600 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:checked:bg-gray-600 dark:checked:border-gray-600 dark:checked:text-gray-200 focus:ring-gray-500">`;
  };

  md.renderer.rules.list_item_open = (tokens, idx) => {
    if (tokens[idx + 2]?.type === "checkbox") {
      return '<li class="flex items-start">';
    }
    return "<li>";
  };

  // Style for horizontal rules
  md.renderer.rules.hr = () => {
    return '<hr class="my-8 border-t border-gray-200">';
  };

  // Style for code blocks
  const originalFence = md.renderer.rules.fence!.bind(md.renderer.rules);
  md.renderer.rules.fence = (
    tokens: any[],
    idx: number,
    options: any,
    env: any,
    slf: any
  ) => {
    const content = originalFence(tokens, idx, options, env, slf);
    return `<div class="my-4 overflow-hidden dark:bg-gray-800 dark:text-gray-300 rounded-none">${content}</div>`;
  };

  // Style for strong (bold) text
  md.renderer.rules.strong_open = () => {
    return '<strong class="font-bold">';
  };

  // Style for emphasis (italic) text
  md.renderer.rules.em_open = () => {
    return '<em class="italic">';
  };

  // Style for tables
  md.renderer.rules.table_open = () => {
    return '<div class="my-4 overflow-x-auto"><table class="min-w-full border-collapse border border-gray-200 dark:border-gray-600">';
  };

  md.renderer.rules.thead_open = () => {
    return '<thead class="bg-gray-50 dark:bg-gray-800">';
  };

  md.renderer.rules.tbody_open = () => {
    return '<tbody class="divide-y divide-gray-200 dark:divide-gray-600">';
  };

  md.renderer.rules.th_open = () => {
    return '<th class="border border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 px-4 py-2 text-left font-semibold">';
  };

  md.renderer.rules.td_open = () => {
    return '<td class="border border-gray-200 dark:border-gray-600 px-4 py-2">';
  };

  // Style for headings
  md.renderer.rules.heading_open = (tokens, idx: number) => {
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
      <header className="border-b py-2 border-[#eaeaea] dark:border-[#222] flex justify-center items-center z-10">
        <h1 className="text-2xl font-semibold">Simple notes</h1>
      </header>
      <ResizablePanelGroup
        autoSaveId="simple-notes-resize"
        className="w-full"
        direction="horizontal"
      >
        <ResizablePanel defaultSize={50} minSize={20} className="h-full">
          <ScrollArea
            className="w-full h-full rounded-none [&>div>div]:h-full"
            orientation="both"
          >
            <Textarea
              className="border-none shadow-none rounded-none h-full whitespace-pre resize-none focus-visible:shadow-none focus-visible:ring-0 outline-0 border-transparent outline-offset-[-1em] focus:border-transparent focus:ring-0"
              placeholder="Your notes"
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50} minSize={20} className="h-full">
          <ScrollArea
            className="w-full h-full rounded-none [&>div>div]:h-full px-3 py-2"
            orientation="both"
          >
            <div
              className="[&_code]:bg-[rgba(0,0,0, 0.05)] dark:[&_code]:bg-[rgba(255,255,255, 0.05)] [&_pre]:overflow-x-auto [&_pre>code]:font-mono [&_pre>code]:bg-[initial]"
              dangerouslySetInnerHTML={{ __html: md.render(note) }}
            />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
