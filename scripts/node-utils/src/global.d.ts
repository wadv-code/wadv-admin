declare interface ReplaceTarget {
  pattern: string;
  target: string;
  replace: string;
  name?: string;
  root?: string;
  flags?: string;
}

declare type ReplaceTargets = ReplaceTarget[];

declare interface StartReplaceOptions {
  targets: ReplaceTargets;
  excludes: string[];
  root?: string;
}
