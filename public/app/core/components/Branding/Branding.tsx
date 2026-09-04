import { css, cx } from '@emotion/css';
import { FC, type JSX } from 'react';

import { colorManipulator, GrafanaTheme2, NavModelItem } from '@grafana/data';
import { selectors } from '@grafana/e2e-selectors';
import { reportInteraction } from '@grafana/runtime';
import { Icon, Tooltip, useStyles2, useTheme2 } from '@grafana/ui';

export interface BrandComponentProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

export const LoginLogo: FC<BrandComponentProps & { logo?: string }> = ({ className, logo }) => {
  // return <img className={className} src={`${logo ? logo : 'public/img/grafana_icon.svg'}`} alt="Grafana" />;
  // @PERCONA
  return <img className={className} src={`${logo ? logo : 'public/img/icons/mono/pfw-logo.svg'}`} alt="PGF WatchTower" />;
};

const LoginBackground: FC<BrandComponentProps> = ({ className, children }) => {
  const theme = useTheme2();

  const background = css({
    '&:before': {
      content: '""',
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      // @PERCONA
      // Grafana's stock g8_login artwork is replaced by a flat wash built from the
      // Postgres1st blue (#0E7ABE light / #5EAEE0 dark, the SPA's primary.main), so the
      // login page carries our identity rather than upstream's. No image asset, so
      // there is nothing to scale or to load before the page paints.
      background: theme.isDark
        ? 'radial-gradient(ellipse at 50% 0%, #0A5585 0%, #072F4A 45%, #04121C 100%)'
        : 'radial-gradient(ellipse at 50% 0%, #E6F2FA 0%, #BDDCF0 45%, #8FC3E4 100%)',

      opacity: 0,

      [theme.transitions.handleMotion('no-preference', 'reduce')]: {
        transition: 'opacity 3s ease-in-out',
      },

      [theme.breakpoints.up('md')]: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      },
    },
  });

  return <div className={cx(background, className)}>{children}</div>;
};

const MenuLogo: FC<BrandComponentProps> = ({ className }) => {
  // return <img className={className} src="public/img/grafana_icon.svg" alt="Grafana" />;
  // @PERCONA
  return <img className={className} src="public/img/pfw-logo.svg" alt="PGF WatchTower" />;
};

/**
 * inMegaMenuOverlay = true we just render the logo without link (used in mega menu)
 */
export function HomeLink({ homeNav, inMegaMenuOverlay }: { homeNav?: NavModelItem; inMegaMenuOverlay?: boolean }) {
  const styles = useStyles2(homeLinkStyles);

  const onHomeClicked = () => {
    reportInteraction('grafana_home_clicked');
  };

  if (inMegaMenuOverlay) {
    return (
      <div className={styles.homeLink}>
        <Branding.MenuLogo />
      </div>
    );
  }

  return (
    <Tooltip placement="bottom" content={homeNav?.text || 'Home'}>
      <a
        onClick={onHomeClicked}
        data-testid={selectors.components.Breadcrumbs.breadcrumb('Home')}
        className={styles.homeLink}
        title={homeNav?.text || 'Home'}
        href={homeNav?.url}
      >
        {/* @PERCONA  */}
        <Icon name="home-alt" size="xl" />
        {/* <Branding.MenuLogo /> */}
      </a>
    </Tooltip>
  );
}

function homeLinkStyles(theme: GrafanaTheme2) {
  return {
    homeLink: css({
      // @PERCONA: adjust icon position to match the breadcrumbs
      position: 'relative',
      bottom: '1px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.spacing(3),
      width: theme.spacing(3),
      margin: theme.spacing(0, 0.5),
      img: {
        maxHeight: '100%',
        maxWidth: '100%',
      },
    }),
  };
}

const LoginBoxBackground = () => {
  const theme = useTheme2();
  return css({
    background: colorManipulator.alpha(theme.colors.background.primary, 0.7),
    backgroundSize: 'cover',
  });
};

export class Branding {
  static LoginLogo = LoginLogo;
  static LoginBackground = LoginBackground;
  static MenuLogo = MenuLogo;
  static LoginBoxBackground = LoginBoxBackground;
  // static AppTitle = 'Grafana';
  // static LoginTitle = 'Welcome to Grafana';
  // static HideEdition = false;
  // static GetLoginSubTitle = (): null | string => {
  //   return null;
  // };
  // @PERCONA
  static AppTitle = 'PGF WatchTower';
  static LoginTitle = 'PGF WatchTower';
  static GetLoginSubTitle = () => {
    const slogans = [
      "Don't get in the way of the data",
      'Your single pane of glass',
      'Built better together',
      'Democratising data',
    ];
    const count = slogans.length;
    return slogans[Math.floor(Math.random() * count)];
  };
}
