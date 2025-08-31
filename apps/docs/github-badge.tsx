export const GitHubBadge = ({
  title,
  background,
  color,
  borderColor = "transparent",
}) => {
  return (
    <span
      className={
        "inline-flex whitespace-nowrap rounded-full border border-solid px-2 font-semibold text-sm leading-0"
      }
      style={{
        backgroundColor: background,
        color,
        borderColor,
      }}
    >
      {title}
    </span>
  );
};
