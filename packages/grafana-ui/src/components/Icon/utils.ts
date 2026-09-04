import { IconName, IconSize, IconType } from '../../types/icon';

const alwaysMonoIcons: IconName[] = [
  'grafana',
  'favorite',
  'heart-break',
  'heart',
  'panel-add',
  'library-panel',
  'circle-mono',
  // @PERCONA
  'pfw-database',
  'pfw-analytics',
  'pfw-cluster',
  'pfw-cluster-network',
  'pfw-cluster-computing',
  'pfw-dashboard',
  'pfw-kubernetes',
  'pfw-summary',
  'pfw-add',
  'pfw-alert',
  'pfw-disk',
  'pfw-memory',
  'pfw-temperature',
  'pfw-cpu',
  'pfw-surface',
  'pfw-network',
  'pfw-process',
  'pfw-setting',
  'pfw-database-checks',
  'pfw-system',
  'pfw-nav-overview',
  'pfw-nav-summary',
  'pfw-nav-logo',
  'pfw-database-mysql',
  'pfw-database-postgresql',
  'pfw-database-mongodb',
  'pfw-database-proxysql',
  'pfw-database-haproxy',
  'pfw-database-valkey',
  'pfw-asterisk',
  'pmm-logo',
  'pfw-bell',
  'pfw-bell-slash',
  'qan-logo',
];

export function getIconSubDir(name: IconName, type: IconType): string {
  if (name?.startsWith('gf-')) {
    return 'custom';
  } else if (alwaysMonoIcons.includes(name)) {
    return 'mono';
  } else if (type === 'default') {
    return 'unicons';
  } else if (type === 'solid') {
    return 'solid';
  } else {
    return 'mono';
  }
}

/* Transform string with px to number and add 2 pxs as path in svg is 2px smaller */
export function getSvgSize(size: IconSize) {
  switch (size) {
    case 'xs':
      return 12;
    case 'sm':
      return 14;
    case 'md':
      return 16;
    case 'lg':
      return 18;
    case 'xl':
      return 24;
    case 'xxl':
      return 36;
    case 'xxxl':
      return 48;
  }
}

let iconRoot: string | undefined;

export function getIconRoot(): string {
  if (iconRoot) {
    return iconRoot;
  }

  const grafanaPublicPath = typeof window !== 'undefined' && window.__grafana_public_path__;
  if (grafanaPublicPath) {
    iconRoot = grafanaPublicPath + 'build/img/icons/';
  } else {
    iconRoot = 'public/build/img/icons/';
  }

  return iconRoot;
}

export function getIconPath(name: IconName, type: IconType = 'default'): string {
  const iconRoot = getIconRoot();
  const subDir = getIconSubDir(name, type);
  return `${iconRoot}${subDir}/${name}.svg`;
}
