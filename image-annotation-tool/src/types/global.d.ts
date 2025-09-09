// Make this file a module so TS includes it
export {};
declare global {
  interface IAnnotation {
    id: number | string;
    type: string;
    label: string;
    color?: string;
    categories: string[];
    phi: number;
    getCenterWithOffset: () => { X: number; Y: number };
  }
  interface IImage {
    id: string;
    src: string;
    name: string;
    annotations?: IAnnotation[];
  }

  interface IAnnotateObject {
    id: number;
    name: string;
  }
}
