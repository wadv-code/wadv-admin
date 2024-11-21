declare interface ReplaceTarget {
  pattern: string;
  target: string;
  replace: string;
  root?: string;
}

declare type ReplaceTargets = ReplaceTarget[];

declare interface StartReplaceOptions {
  targets: ReplaceTargets;
  excludes: string[];
  root?: string;
}
