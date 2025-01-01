import layout from './GithubFlavours.module.css';

const getStatusThemeClass = (theme) => {
  switch (theme) {
    case 'grey':
      return layout.statusThemeGrey;
    case 'blue':
      return layout.statusThemeBlue;
    case 'green':
      return layout.statusThemeGreen;
    case 'yellow':
      return layout.statusThemeYellow;
    case 'orange':
      return layout.statusThemeOrange;
    case 'red':
      return layout.statusThemeRed;
    case 'pink':
      return layout.statusThemePink;
    case 'purple':
      return layout.statusThemePurple;
    default:
      return '';
  }
};

export const GithubBadge = ({
  background,
  color,
  borderColor,
  statusTheme,
  children,
}) => {
  return (
    <span
      style={{
        background: background,
        color: color,
        borderColor: borderColor,
      }}
      className={`${layout.githubBadge} ${getStatusThemeClass(statusTheme)}`}
    >
      {children}
    </span>
  );
};
