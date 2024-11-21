interface ReplaceTarget {
  pattern: string;
  target: string;
  replace: string;
}

type ReplaceTargets = ReplaceTarget[];

interface StartReplaceOptions {
  targets: ReplaceTargets;
  excludes: string[];
}

export { ReplaceTarget, ReplaceTargets, StartReplaceOptions };
