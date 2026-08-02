export class DomReader {
  constructor(private readonly root: ParentNode = document) {}

  query(selector: string): Element | null {
    try {
      return this.root.querySelector(selector);
    } catch {
      return null;
    }
  }

  queryAll(selector: string): Element[] {
    try {
      return Array.from(this.root.querySelectorAll(selector));
    } catch {
      return [];
    }
  }

  text(selector: string): string | null {
    const element = this.query(selector);
    return element?.textContent?.trim() ?? null;
  }

  exists(selector: string): boolean {
    return this.query(selector) !== null;
  }

  queryIn(root: ParentNode, selector: string): Element | null {
    try {
      return root.querySelector(selector);
    } catch {
      return null;
    }
  }

  queryAllIn(root: ParentNode, selector: string): Element[] {
    try {
      return Array.from(root.querySelectorAll(selector));
    } catch {
      return [];
    }
  }

  textIn(root: ParentNode, selector: string): string | null {
    const element = this.queryIn(root, selector);
    return element?.textContent?.trim() ?? null;
  }
}
