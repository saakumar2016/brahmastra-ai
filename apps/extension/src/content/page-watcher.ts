type PageChangeCallback = () => void;

function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  delay: number,
): (...args: A) => void {
  let timeoutId: number | undefined;
  return (...args: A) => {
    if (timeoutId !== undefined) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => fn(...args), delay);
  };
}

function patchHistoryNavigation(onNavigate: () => void): void {
  const pushState = history.pushState.bind(history);
  const replaceState = history.replaceState.bind(history);

  history.pushState = (data: unknown, unused: string, url?: string | URL | null) => {
    pushState(data, unused, url);
    onNavigate();
  };

  history.replaceState = (data: unknown, unused: string, url?: string | URL | null) => {
    replaceState(data, unused, url);
    onNavigate();
  };
}

function observeTitleChanges(onChange: () => void): MutationObserver {
  const observer = new MutationObserver(onChange);
  const titleNode = document.querySelector("title");
  if (titleNode) {
    observer.observe(titleNode, {
      subtree: true,
      childList: true,
      characterData: true,
    });
  }
  return observer;
}

export function watchPageChanges(onChange: PageChangeCallback): () => void {
  const scheduleDetection = debounce(onChange, 250);
  let lastHref = window.location.href;
  let lastTitle = document.title;

  patchHistoryNavigation(scheduleDetection);
  window.addEventListener("popstate", scheduleDetection);
  window.addEventListener("hashchange", scheduleDetection);

  const titleObserver = observeTitleChanges(scheduleDetection);

  const polling = window.setInterval(() => {
    if (window.location.href !== lastHref || document.title !== lastTitle) {
      lastHref = window.location.href;
      lastTitle = document.title;
      scheduleDetection();
    }
  }, 2000);

  return () => {
    window.clearInterval(polling);
    titleObserver.disconnect();
  };
}
