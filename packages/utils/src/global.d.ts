interface ReplaceTarget {
  pattern: string;
  target: string;
  replace: string;
  root?: string;
}

type ReplaceTargets = ReplaceTarget[];

interface StartReplaceOptions {
  targets: ReplaceTargets;
  excludes: string[];
  root?: string;
}

export { ReplaceTarget, ReplaceTargets, StartReplaceOptions };
