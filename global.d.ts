// Allow importing CSS files in TS/TSX (side-effect imports like `import './globals.css'`)
declare module '*.css';
declare module '*.scss';
declare module '*.module.css';
declare module '*.module.scss';

// Optional: common static asset types used in the app
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
