import layout from "./GithubFlavours.module.css";

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
      className={`${layout.githubBadge} 
      ${
        statusTheme === "grey"
          ? layout.statusThemeGrey
          : statusTheme === "blue"
            ? layout.statusThemeBlue
            : statusTheme === "green"
              ? layout.statusThemeGreen
              : statusTheme === "yellow"
                ? layout.statusThemeYellow
                : statusTheme === "orange"
                  ? layout.statusThemeOrange
                  : statusTheme === "red"
                    ? layout.statusThemeRed
                    : statusTheme === "pink"
                      ? layout.statusThemePink
                      : statusTheme === "purple"
                        ? layout.statusThemePurple
                        : ""
      }`}
    >
      {children}
    </span>
  );
};
